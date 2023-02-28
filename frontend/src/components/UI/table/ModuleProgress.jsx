import React, {useEffect, useState} from 'react';
import classes from "./Tables.module.css";

const ModuleProgress = ({grade, color}) => {

    const [width, setWidth] = useState("0%")

    useEffect(()=> {
        setTimeout(()=>{
            setWidth(grade + "%")
        }, 5000)

    },[])

    return (
        !isNaN(grade) ?
        <div className={classes.moduleProgressbar}>
            <div className={classes.moduleProgressbarValue} style={{backgroundColor: color, width: width}}>
            </div>
            <span className={classes.moduleProgressbarTitle}>
                {Math.round(grade)}%
            </span>
        </div> : <div/>
    );
};

export default ModuleProgress;