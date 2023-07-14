import {useEffect, useState} from 'react';

export function useTabNotification(
    showFaviconDot = true,
    faviconDotColor = '#f00000',
    flashDelayInSeconds = 2
) {
    const [originalTitle] = useState(document.title)
    let defaultFavicon = document.querySelector("link[rel$=icon]").getAttribute('href')
    const [favicon] = useState(defaultFavicon)
    const [notificationFavicon, setNotificationFavicon] = useState(defaultFavicon)
    const [titlePrefix, setTitlePrefix] = useState('')
    const [customTitle, setCustomTitle] = useState('')
    const [modifiedTitle, setModifiedTitle] = useState('')
    const [flashMessage, setFlashMessage] = useState('')
    const [isShown, setIsShown] = useState(false)
    const [flashIsStarted, setFlashIsStarted] = useState(false)

    useEffect(() => {
        if (showFaviconDot) {
            const img = document.createElement('img')
            img.src = favicon
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
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
        }
    }, [showFaviconDot, favicon, faviconDotColor])

    useEffect(() => {
        let title = customTitle ? customTitle : originalTitle
        if (titlePrefix) {
            title += ' ' + titlePrefix
        }

        setModifiedTitle(title)
    }, [titlePrefix, originalTitle, customTitle])

    useEffect(() => {
        if (isShown) {
            document.querySelector("link[rel$=icon]").setAttribute('href', notificationFavicon)
            setFlashIsStarted(true)
        } else {
            document.querySelector("link[rel$=icon]").setAttribute('href', favicon)
            setModifiedTitle(originalTitle)
            setFlashIsStarted(false)
        }
    }, [isShown, favicon, notificationFavicon, originalTitle])

    useEffect(() => {
        document.title = modifiedTitle
    }, [modifiedTitle])

    useEffect(() => {
        let interval = null
        if (flashMessage && isShown) {
            interval = setInterval(() => {
                document.title = (document.title === flashMessage ? modifiedTitle : flashMessage)
            }, flashDelayInSeconds * 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [flashIsStarted, flashMessage, modifiedTitle, isShown, flashDelayInSeconds])

    return {setTitlePrefix, setFlashMessage, isShown, setIsShown, setCustomTitle};
}
