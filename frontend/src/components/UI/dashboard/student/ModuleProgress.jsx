import React from 'react';
import CircularProgressbar from "../../progressbars/CircularProgressbar";
import './../../../../App.css'

const ModuleProgress = ({module, cardOpened}) => {
    return (
        <div className={"col-4 p-3"}>
            <div className={"module-progress__container d-flex justify-content-center align-items-center flex-column"}>
                <CircularProgressbar value={module.grade} circleWidth={150} cardOpened={cardOpened}/>
                <span className="h6 text-light px-2 text-center">
            {module.module_name}
                </span>
            </div>
        </div>
    );
};

export default ModuleProgress;