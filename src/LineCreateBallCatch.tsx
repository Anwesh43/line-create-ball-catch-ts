import React from "react";
import {useStyle} from './hooks'
import withContext from "./withContext";

interface LCBCProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : () => void 
}
const LineCreateBallCatch : React.FC<LCBCProps> = (props : LCBCProps) => {
    const {lineStyle, circleStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <div>
            <div style = {lineStyle()}></div>
            <div style = {circleStyle()}></div>
        </div>
    )
}

export default withContext(LineCreateBallCatch)