import React, {useState} from 'react';
import classes from "./Buttons.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretUp, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {changeSupervisorUnitsShowing} from './../../../features/uiStates/uiStatesSlice'
import {options} from "axios";

const DropdownButton = ({...props}) => {
    const dispatch = useDispatch()

    const [selectedOption, setSelectedOption] = useState(props.options[1])
    const [isOptionsShowing, setIsOptionsShowing] = useState(false)

    const caretUp = <FontAwesomeIcon icon={faCaretUp}/>
    const caretDown = <FontAwesomeIcon icon={faCaretDown}/>

    return (
        <div className={classes.dropdownButton}>
            <div>
                {/*Отображение выбранного варианта*/}
                <button
                    onClick={() => {
                        setIsOptionsShowing(false)
                        let curIndex = 0;
                        props.options.forEach((option, index) => {
                            if (option === selectedOption) curIndex = index;
                        })
                        curIndex === props.options.length - 1 ? curIndex = 0 : curIndex++
                        setSelectedOption(props.options[curIndex])
                        dispatch(changeSupervisorUnitsShowing(props.options[curIndex].showing))
                    }}
                    style={{
                        borderRadius: isOptionsShowing ? "20px 0 0 0" : "20px 0 0 20px"
                    }}
                    className={[classes.dropdownButtonTitle, "h5"].join(" ")}>
                    <FontAwesomeIcon icon={selectedOption.icon} className={"me-2"}/>
                    {selectedOption.title}
                </button>

                {/*Кнопка переключения видимости вариантов выбора*/}
                <button
                    style={{
                        borderRadius: isOptionsShowing ? "0 20px 0 0" : "0 20px 20px 0"
                    }}
                    className={[classes.dropdownButtonArrow, "h5"].join(" ")}
                    onClick={() => {
                        setIsOptionsShowing(!isOptionsShowing)
                    }}>{isOptionsShowing ? caretUp : caretDown}</button>
            </div>


            {/*Список опций*/}
            <div className={classes.optionsList} style={{opacity: isOptionsShowing ? "1" : "0"}}>
                {props.options.map(option =>
                    option != selectedOption &&
                    <button
                        key={option.title}
                        className={[classes.optionButton, "h5"].join(" ")}
                        onClick={() => {
                            setSelectedOption(option)
                            dispatch(changeSupervisorUnitsShowing(option.showing))
                            setIsOptionsShowing(false)
                        }}>
                        <FontAwesomeIcon icon={option.icon} className={"me-2"}/>
                        {option.title}
                    </button>
                )}
            </div>

        </div>
    );
};

export default DropdownButton;