// @ts-check

import { useCallback, useState } from "react"
import { useEventListener } from "./useEventListener"

/**
 * @template T
 * @typedef {[T, import('react').Dispatch<import('react').SetStateAction<T>>]} UseState
 */

/**
 * @typedef UseNotificationOptions
 *
 * @property {string} title
 * Title for the notification, which is shown at the top of the notification window.
 *
 * @property {string} tag
 * An identifying tag for the notification. The idea of notification tags is
 * that more than one notification can share the same tag, linking them together.
 *
 * @property {string} [description]
 * Body text of the notification, which is displayed below the title.
 *
 * @property {boolean} [closeWhenViewed]
 * Automatically remove the notification when the relevant content
 * has been read on the webpage. Defaults to `false`.
 *
 * @property {string} [badge]
 * URL of the image used to represent the notification when
 * there isn't enough space to display the notification itself.
 *
 * @property {string} [icon]
 * URL of an icon to be displayed in the notification.
 *
 * @property {string} [image]
 * URL of an image to be displayed in the notification.
 *
 * @property {unknown} [data]
 * Arbitrary data that you want associated with the notification.
 *
 * @property {boolean} [renotify]
 * Specify whether the user should be notified after a new notification replaces
 * an old one. If set to `true`, then `tag` also must be set. Defaults to `false`.
 *
 * @property {boolean} [requireInteraction]
 * Specify whether a notification should remain active until the user clicks
 * or dismisses it, rather than closing automatically. Defaults to `false`.
 *
 * @property {boolean} [silent]
 * Specify whether the notification is silent (no sounds or vibrations issued),
 * regardless of the device settings. If set to `true`, then `vibrate` must
 * not be present. Defaults to `false`.
 *
 * @property {number} [timestamp]
 * An arbitrary timestamp that you want associated with the notification.
 *
 * For example, a timestamp for an upcoming meeting could be set in the future,
 * whereas a timestamp for a missed message could be set in the past. Defaults to `now`
 *
 * @property {number[]} [vibrate]
 * A vibration pattern for the device's vibration hardware to emit with
 * the notification. If specified, `silent` must not be true.
 */

/**
 * @typedef UseNotificationReturnType
 *
 * @property {"denied" | "granted" | "default" | "unsupported"} status
 * Status of access to the user's notification system.
 *
 * @property {() => void} show
 * Shows notification on the user's device.
 *
 * @property {()=>void}   close
 * Removes displayed notification.
 *
 * @property {(cb: (event: Event) => void) => void} onClick
 * Executes callback when the user clicks on displayed notification.
 *
 * @property {(cb: (event: Event) => void) => void} onClose
 * Executes callback when a notification is closed.
 *
 * @property {(cb: (event: Event) => void) => void} onError
 * Executes callback when something goes wrong with a notification.
 *
 * @property {(cb: (event: Event) => void) => void} onShow
 * Executes callback when a notification is displayed.
 *
 * @property {(cb: (event: Event) => void) => void} onClick
 * Executes callback when the user clicks on displayed notification.
 */

/**
 * The useNotification hook allows usage of the browser's built-in notification system.
 *
 * @param {UseNotificationOptions} options
 * @returns {UseNotificationReturnType}
 */
export function useNotification(options) {
    const { title, description, closeWhenViewed, ...rest } = options

    /** @type {UseState<Notification | undefined>} */
    const [notification, setNotification] = useState()

    /** @type {UseState<UseNotificationReturnType["status"]>} */
    // @ts-ignore - compiler quirk
    const [status, setStatus] = useState("default")

    const notificationOptions = {
        ...rest,
        body: description,
    }

    useCallback(() => {
        if ("Notification" in window) {
            Notification.requestPermission().then((permission) => setStatus(permission))
        } else {
            setStatus("unsupported")
        }
    }, [])

    const show = () => {
        try {
            const notif = new Notification(title, notificationOptions)
            setNotification((prevState) => ({ ...prevState, ...notif }))
        } catch (error) {
            // Support Chrome on Android
            // https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#chrome_notes
            if (error instanceof TypeError && error.message.toLowerCase().includes("illegal constructor")) {
                const workerRegistration = new ServiceWorkerRegistration()
                workerRegistration.showNotification(title, notificationOptions)
                workerRegistration.getNotifications({ tag: options.tag }).then((notifArray) => {
                    if (notifArray.length > 0) {
                        // @ts-ignore - Array.at might have better optimizations
                        const notif = notifArray.at ? notifArray.at(-1) : notifArray[notifArray.length - 1]
                        setNotification((prevState) => ({ ...prevState, ...notif }))
                    }
                })
            } else {
                throw error
            }
        }
        if (closeWhenViewed) {
            const closeNotificationWhenViewed = useCallback(() => {
                document.visibilityState === "visible" && notification?.close()
            }, [notification])
            useEventListener("visibilitychange", closeNotificationWhenViewed, document)
        }
    }

    return {
        status,
        show,
        close: () => notification?.close(),
        onClick: (cb) => {
            notification?.addEventListener("click", cb)
        },
        onShow: (cb) => {
            notification?.addEventListener("show", cb)
        },
        onError: (cb) => {
            notification?.addEventListener("error", cb)
        },
        onClose: (cb) => {
            notification?.addEventListener("close", cb)
        },
    }
}
