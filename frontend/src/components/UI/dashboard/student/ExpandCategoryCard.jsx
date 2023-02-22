import React, {useEffect, useState} from 'react';
import BackButton from "../../button/BackButton";
import './../../../../App.css'
import {
    selectCoursesCompletions,
    selectModulesCompletions,
    set_courses_completions, set_modules_completions
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
    const dispatch = useDispatch()


    const [fetchData, isLoading] = useFetch(async () => {
        let data = await CompletionsService.getSelfCourseCompletions()
        dispatch(set_courses_completions(data['courses_completions']))


        data = await CompletionsService.getSelfModuleCompletions()
        dispatch(set_modules_completions(data['modules_completions']))
    })

    useEffect(() => {
        fetchData()
    }, [])


    useEffect(() => {
        setCurrentModules(modulesCompletions.filter(module => module.course === selectedCourse.course))
    }, [selectedCourse])


    function getTotalAward() {
        let total = 0
        {coursesCompletions.map(course => {
            if (course.completed)
                total += course.award
        })
        }
        return total
    }


    return (
        <div ref={divRef} className='expandedCard px-2'>
            {isLoading &&
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            <div className="d-flex flex-column w-100">
                <div className="row justify-content-between align-items-center pe-4">
                    <div className="col-auto d-flex align-items-center px-3">
                        <BackButton onClick={() => collapseCard()}/>
                        <span className="col-auto h1" style={{color: "white"}}>{category.name}</span>
                    </div>
                    <div className="col-auto h3 bold px-1 py-0 d-flex align-items-center totalReward"
                         style={{color: '#8cc06d'}}>+ {getTotalAward()} ₽
                    </div>
                </div>
                <div className="row ">
                    <div className='col-6 expandedCard__courses px-4'>
                        {coursesCompletions.map(course =>
                            <CourseProgress onClick={() => setSelectedCourse(course)} key={course.id}
                                            course={course}/>
                        )}
                    </div>
                    <div className='col-6 px-4'>
                        <div className="expandedCard__activities row">
                            <h3 className={"text-light text-center mt-2 mb-0"}>{selectedCourse.course_name}</h3>
                            {currentModules.map(module =>
                                <ModuleProgress key={module.id} module={module}/>
                            )}
                        </div>

                    </div>
                </div>
            </div>


        </div>
    );
};

export default ExpandCategoryCard;