import {useState, useEffect} from 'react'

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
