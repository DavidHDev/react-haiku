import { useCallback, useRef, useState } from "react";
import { useEventListener } from "./useEventListener";

/**
 * The useNotification hook allows usage of the browser's built-in notification system.
 */
export function useNotification(options: {
  /** Title for the notification, which is shown at the top of the notification window. */
  title: string;
  /**
   * An identifying tag for the notification. The idea of notification tags is
   * that more than one notification can share the same tag, linking them together.
   */
  tag: string;
  /** Body text of the notification, which is displayed below the title. */
  description?: string;
  /**
   * Automatically remove the notification when the relevant content
   * has been read on the webpage.
   * @default false
   */
  closeWhenViewed?: boolean;
  /**
   * URL of the image used to represent the notification when
   * there isn't enough space to display the notification itself.
   */
  badge?: string;
  /** URL of an icon to be displayed in the notification. */
  icon?: string;
  /** URL of an image to be displayed in the notification. */
  image?: string;
  /** Arbitrary data that you want associated with the notification. */
  data?: unknown;
  /**
   * Specify whether the user should be notified after a new notification replaces
   * an old one. If set to `true`, then `tag` also must be set.
   * @default false
   */
  renotify?: boolean;
  /**
   * Specify whether a notification should remain active until the user clicks
   * or dismisses it, rather than closing automatically.
   * @default false
   */
  requireInteraction?: boolean;
  /**
   * Specify whether the notification is silent (no sounds or vibrations issued),
   * regardless of the device settings. If set to `true`, then `vibrate` must
   * not be present.
   * @default false
   */
  silent?: boolean;
  /**
   * An arbitrary timestamp that you want associated with the notification.
   *
   * For example, a timestamp for an upcoming meeting could be set in the future,
   * whereas a timestamp for a missed message could be set in the past. Defaults to `now`
   */
  timestamp?: number;
  /**
   * A vibration pattern for the device's vibration hardware to emit
   * with the notification. If specified, `silent` must not be true.
   */
  vibrate?: number[];
}): {
  /** Status of access to the user's notification system. */
  status: "denied" | "granted" | "default" | "unsupported";
  /** Shows notification on the user's device. */
  show: () => void;
  /** Removes displayed notification. */
  close: () => void;
  /** Executes callback when the user clicks on displayed notification. */
  onClick: (cb: (event: Event) => void) => void;
  /** Executes callback when a notification is closed. */
  onClose: (cb: (event: Event) => void) => void;
  /** Executes callback when something goes wrong with a notification. */
  onError: (cb: (event: Event) => void) => void;
  /** Executes callback when a notification is displayed. */
  onShow: (cb: (event: Event) => void) => void;
} {
  const { title, description, closeWhenViewed, ...rest } = options;
  const [notification, setNotification] = useState<Notification>();
  const [status, setStatus] = useState<"denied" | "granted" | "default" | "unsupported">("default");
  const documentRef = useRef(document);
  const notificationOptions = {
    ...rest,
    body: description,
  };

  useCallback(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => setStatus(permission));
    } else {
      setStatus("unsupported");
    }
  }, []);

  const show = () => {
    try {
      const notif = new Notification(title, notificationOptions);
      setNotification((prevState) => ({ ...prevState, ...notif }));
    } catch (error) {
      // Support Chrome on Android
      // https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#chrome_notes
      if (error instanceof TypeError && error.message.toLowerCase().includes("illegal constructor")) {
        const workerRegistration = new ServiceWorkerRegistration();
        workerRegistration.showNotification(title, notificationOptions);
        workerRegistration.getNotifications({ tag: options.tag }).then((notifArray) => {
          if (notifArray.length > 0) {
            const notif = notifArray.at ? notifArray.at(-1) : notifArray[notifArray.length - 1];
            if (notif) setNotification((prevState) => ({ ...prevState, ...notif }));
          }
        });
      } else {
        throw error;
      }
    }
    if (closeWhenViewed) {
      const closeNotificationWhenViewed = useCallback(() => {
        if (document.visibilityState === "visible") notification?.close();
      }, [notification]);
      useEventListener("visibilitychange", closeNotificationWhenViewed, documentRef);
    }
  };

  return {
    status,
    show,
    close: () => notification?.close(),
    onClick: (cb) => {
      notification?.addEventListener("click", cb);
    },
    onShow: (cb) => {
      notification?.addEventListener("show", cb);
    },
    onError: (cb) => {
      notification?.addEventListener("error", cb);
    },
    onClose: (cb) => {
      notification?.addEventListener("close", cb);
    },
  };
}
