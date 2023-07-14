import { useRef, useState } from "react"

export default function Tooltip({
    children,
    text,
    delay,
    className,
    onHideClassName,
}) {
    const [isShown, setIsShown] = useState(false)
    const [styles, setStyles] = useState({})
    const triggerRef = useRef(null)
    const tooltipRef = useRef(null)
    const timerRef = useRef(0)

    const show = () => {
        const triggerRect = triggerRef.current.getBoundingClientRect()
        const dimensions = { width: window.innerWidth, height: window.innerHeight }
        const elemIsOnTopHalf = triggerRect.y < dimensions.height / 2
        const elemIsOnLeftHalf = triggerRect.x <= dimensions.width / 2
        setStyles(
            {
                ...elemIsOnLeftHalf ? { left: 0 } : { 'right': 0, direction: 'rtl' },
                ...elemIsOnTopHalf ? { top: triggerRect.height } : { bottom: triggerRect.height * 3 }
            }
        )
        setIsShown(true)
    }
    const hide = () => {
        setIsShown(false)
    }


    const handleShowingTooltip = () => {
        timerRef.current = setTimeout(() => show(), delay ?? 0)
    }
    const handleHidingTooltip = () => {
        if (onHideClassName || tooltipRef.current == null) {
            tooltipRef.current.className = onHideClassName
        } else {
            hide()
        }
        clearTimeout(timerRef.current)
    }
    const handleAnimationFinishing = (ev) => {
        if (ev.target != tooltipRef.current) return
        hide()
        if (!tooltipRef.current || tooltipRef.current == null) return
        tooltipRef.current.className = ''
    }

    return <div style={{ position: "relative", display: 'block', width: 'fit-content', height: 'fit-content' }}>
        <div ref={triggerRef}
            onMouseEnter={handleShowingTooltip}
            onMouseLeave={handleHidingTooltip}
        >
            {children}
        </div>
        <div
            style={{ ...styles, position: 'absolute' }}
            ref={tooltipRef}
            onAnimationEnd={handleAnimationFinishing}
        >
            {isShown
                &&
                <div
                    style={{ position: 'fixed', zIndex: 9999 }}
                    className={className}
                >
                    {text}

                </div>
            }
        </div>
    </div >
}