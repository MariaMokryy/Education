import React, {useEffect, useState} from 'react';
import BackButton from "../../button/BackButton";
import './../../../../App.css'
import {
    selectCoursesCompletions, selectModulesCompletions, set_courses_completions, set_modules_completions
} from '../../../../features/completions/completionsSlice'
import CourseProgress from "./CourseProgress";
import ModuleProgress from "./ModuleProgress";
import {useDispatch, useSelector} from "react-redux";
import {useFetch} from "../../../../hooks/useFetch";
import CompletionsService from "../../../../features/completions/completions.service";
import Loader from "../../loader/Loader";


const ExpandCategoryCard = ({divRef, collapseCard, category}) => {

    const coursesCompletions = useSelector(selectCoursesCompletions).filter(course => course.category === category.id)
    const modulesCompletions = useSelector(selectModulesCompletions)
    const [selectedCourse, setSelectedCourse] = useState({})
    const [currentModules, setCurrentModules] = useState([])
    const [cardOpened, setCardOpened] = useState(false)


    useEffect(() => {
        setCurrentModules(modulesCompletions.filter(module => module.course === selectedCourse.course))
    }, [selectedCourse])

    useEffect(() => {
        setSelectedCourse(coursesCompletions[0])
        setCardOpened(true)
    }, [])


    function getTotalAward() {
        let total = 0
        {
            coursesCompletions.map(course => {
                if (course.completed) total += course.award
            })
        }
        return total
    }

    return (
        <div ref={divRef} className='expandedCard px-3 mt-4'>
            <div className="d-flex flex-column w-100">
                {/*Заголовок, кнопка выйти*/}
                <div className="row justify-content-between align-items-center sticky-top px-0 pt-3 pe-3">
                    <div className="col-auto d-flex align-items-center">
                        <BackButton onClick={() => collapseCard()}/>
                        <span className="col-auto h2 ms-2" style={{color: "white"}}>{category.name}</span>
                    </div>
                    <div className="col-auto h3 bold px-1 py-0 d-flex align-items-center justify-content-center totalReward"
                         style={{color: '#8cc06d'}}>+ {getTotalAward()} ₽
                    </div>
                </div>
                {/*Тело карточки*/}
                {<div className="row">
                    <div className='col-6 expandedCard__courses px-4 d-flex flex-column'>
                        {coursesCompletions.map(course => <CourseProgress onClick={() => setSelectedCourse(course)} key={course.id}
                                                                          course={course} isSelected={course === selectedCourse}/>)}
                    </div>
                    <div className='col-6 px-4 h-100'>
                        <div className="expandedCard__activities row">
                            <div className={"d-flex justify-content-between bg-header-linear pt-2 sticky-top px-4"}>
                                <div className="col-10">
                                    <h4 className={"text-light text-center mb-0 align-items-start"} style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}} title={selectedCourse.course_name}>{selectedCourse.course_name}</h4>
                                </div>
                                <div className="col-2 d-flex justify-content-end align-items-baseline">
                                        <span className={"h4 bold align-items-center mb-0"} style={{color: selectedCourse.completed ? "#8CC06D" : "#DD5757"}}>
                                            {Math.round(selectedCourse.grade)}%
                                        </span>
                                </div>
                            </div>
                            <div className={"d-flex align-items-start flex-wrap"}>
                                {currentModules.map(module => <ModuleProgress key={module.id} module={module} cardOpened={cardOpened}/>)}
                            </div>
                        </div>

                    </div>

                </div>}

            </div>


        </div>);
};

export default ExpandCategoryCard;