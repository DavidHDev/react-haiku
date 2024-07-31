import {useEffect, useState} from 'react';

export function useTabNotification(
    flashDelayInSeconds = 2
) {
    const [originalTitle] = useState(document.title)
    let defaultFavicon = document.querySelector("link[rel$=icon]")?.getAttribute('href')
    const [favicon] = useState(defaultFavicon)
    const [notificationFavicon, setNotificationFavicon] = useState(defaultFavicon)
    const [titlePrefix, setTitlePrefix] = useState<string|null>(null)
    const [customTitle, setCustomTitle] = useState<string|null>(null)
    const [modifiedTitle, setModifiedTitle] = useState<string>('')
    const [flashMessage, setFlashMessage] = useState<string|null>(null)
    const [isShown, setIsShown] = useState(false)
    const [showFaviconDot, setShowFaviconDot] = useState(true)
    const [faviconDotColor, setFaviconDotColor] = useState('#f00000')

    useEffect(() => {
        if (showFaviconDot && isShown && favicon) {
            const img = document.createElement('img')
            img.src = favicon
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')!
                canvas.width = img.width
                canvas.height = img.height
                context.drawImage(img, 0, 0, img.width, img.height)
                context.beginPath()
                context.arc(img.width - img.width / 5 , img.height / 5,
                    img.width / 5, 0, 2 * Math.PI)
                context.fillStyle = faviconDotColor
                context.fill()
                setNotificationFavicon(canvas.toDataURL('image/png'))
            }
        } else {
            setNotificationFavicon(favicon)
        }
    }, [showFaviconDot, favicon, faviconDotColor, isShown])

    useEffect(() => {
        if (notificationFavicon)
            document.querySelector("link[rel$=icon]")?.setAttribute('href', notificationFavicon)
    }, [notificationFavicon])

    useEffect(() => {
        if (!isShown) {
            setModifiedTitle(originalTitle)
        } else {
            let title = customTitle ? customTitle : originalTitle
            if (titlePrefix) {
                title = titlePrefix + ' ' + title
            }

            setModifiedTitle(title)
        }
    }, [titlePrefix, originalTitle, customTitle, isShown])

    useEffect(() => {
        document.title = modifiedTitle
    }, [modifiedTitle])

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>|null = null;
        if (flashMessage && isShown) {
            interval = setInterval(() => {
                document.title = (document.title === flashMessage ? modifiedTitle : flashMessage)
            }, flashDelayInSeconds * 1000)
        }

        return () => {
            if (interval)
                clearInterval(interval)
        }
    }, [flashMessage, modifiedTitle, isShown, flashDelayInSeconds])

    return {setTitlePrefix, setFlashMessage, isShown, setIsShown, setCustomTitle, setShowFaviconDot, setFaviconDotColor};
}
