import {useEffect, useState} from 'react';

export function useTabNotification(showFaviconDot = true, faviconDotColor = '#f00000') {
    const [title] = useState(document.title)
    let defaultFavicon = document.querySelector("link[rel$=icon]").getAttribute('href')
    const [favicon] = useState(defaultFavicon)
    const [notificationFavicon, setNotificationFavicon] = useState(defaultFavicon)
    const [notification, setNotification] = useState('')

    useEffect(() => {
        if (showFaviconDot) {
            createFaviconWithDot()
        }
    }, [])

    const createFaviconWithDot = () => {
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
    const show = () => {
        document.querySelector("link[rel$=icon]").setAttribute('href', notificationFavicon)
        document.title = notification + ' ' + title
    }

    const hide = () => {
        document.querySelector("link[rel$=icon]").setAttribute('href', favicon)
        document.title = title
    }

    return {show, hide, setNotification};
}
