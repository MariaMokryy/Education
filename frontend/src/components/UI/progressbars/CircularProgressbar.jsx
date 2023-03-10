import React, {useEffect, useState} from 'react';
import classes from './CircularProgressbar.module.css';

const CircularProgressbar = ({value, circleWidth, cardOpened}) => {
    const radius = circleWidth/3;
    const [dashArray, setDashArray] = useState(360);
    const [dashOffset, setDashOffset] = useState(360);
    const [opacity, setOpacity] = useState(0)

    const getColor = (value) => {
        if (value < 30) return "#DD5757"
        else if (value < 80) return "#FDAE47"
        else return "#8CC06D"
    }


    useEffect(() => {
        setDashArray(360)
        setDashOffset(360)
        setOpacity(0)
        setTimeout(() => {
            if (value > 0) {
                setDashArray(radius * Math.PI * 2)
                setDashOffset(dashArray - (dashArray * value) / 100)
                setOpacity(100)
            }
        }, 1)
    }, [window])

    return <div>
        <svg width={circleWidth} height={circleWidth} viewBox={`0, 0 ${circleWidth} ${circleWidth}`}>
            <circle
                cx={circleWidth / 2}
                cy={circleWidth / 2}
                strokeWidth={`${circleWidth/20}px`}
                r={radius}
                className={classes.circleBackground}
            />
            <circle
                cx={circleWidth / 2}
                cy={circleWidth / 2}
                strokeWidth={`${circleWidth/10}px`}
                r={radius}
                className={classes.circleProgress}
                style={{
                    stroke: getColor(value),
                    strokeDasharray: dashArray,
                    strokeDashoffset: dashOffset,
                    opacity: opacity
                }}
                transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
            />
            <text x="50%" y="50%" textAnchor="middle" dy="0.3em" fill={getColor(value)} className={[classes.circleText, "h3 bold"].join(" ")}>{Math.round(value)}%</text>
        </svg>
    </div>;
};

export default CircularProgressbar;