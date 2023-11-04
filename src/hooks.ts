import {useState, useEffect, CSSProperties} from 'react'

export const useAnimatedScale = (scGap : number, delay : number) => {
    const [scale, setScale] = useState<number>(0)
    const [animated, setAnimated] = useState<boolean>(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(false)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}


export const useDimension = () => {
    const [w, setW] = useState<number>(window.innerWidth)
    const [h, setH] = useState<number>(window.innerHeight)
    useEffect(() => {
        const windowResizeListener = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        window.addEventListener('resize', windowResizeListener, false)
        return () => {
            window.removeEventListener('resize', windowResizeListener)
        }
    })
    return {
        w, 
        h
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)

const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 

const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const position = 'absolute'
    const background = 'indigo'
    const sf : number = sinify(scale)
    const dsc : (a : number) => number = (i : number) : number => divideScale(sf, i, 2)
    const circleSize : number = Math.min(w, h) / 10
    const lineHeight : number = Math.min(w, h)/ 90
    return {
        circleStyle() : CSSProperties {
            return {
                position, 
                background, 
                left: `${w / 2}px`,
                top : `${(h / 2 - circleSize) * dsc(1)}px`,
                width: `${circleSize}px`,
                height: `${circleSize}px`
            }
        },
        lineStyle() : CSSProperties {
            return {
                position, 
                background, 
                height: `${lineHeight}px`,
                left: `${w / 2 - circleSize * 0.5 * dsc(0)}px`,
                top: `${h / 2 - lineHeight / 2}px`,
                width: `${circleSize * dsc(0)}px` 
            }
        }
    }
}