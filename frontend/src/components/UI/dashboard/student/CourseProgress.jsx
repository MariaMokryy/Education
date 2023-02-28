import React, {useEffect, useState} from 'react';
import './../../../../App.css'

const CourseProgress = ({course, ...props}) => {

    const [value, setValue] = useState(0)

    useEffect(() => {
        setValue(0)
        setTimeout(() => {
            setValue(course.grade)
        }, 300)
    }, [window])

    return (
            <div {...props} className={props.isSelected ? "row mt-2 align-items-center course-progress bg-hover" : "row mt-2 align-items-center course-progress bg-transparent"} style={{height: "70px"}}>
                <div className="col-auto">
                <span className="col-auto h3 bold" style={{color: course.completed ? '#8CC06D' : '#505760'}}>
                    + {course.award} ₽
                </span>
                </div>
                <div className="col" style={{}}>
                    <div style={{
                        position: "relative",
                        minHeight: "40px",
                        borderRadius: '20px',
                        background: '#505760',
                        width: '100%',
                        color: 'white'
                    }}>
                        <div
                            className="d-flex"
                            style={{
                                transition: "1s",
                                minHeight: "40px",
                                borderRadius: '20px',
                                background: course.completed ? '#8CC06D' : '#7A8490',
                                width: value + '%'
                            }}>
                        </div>
                        <div
                            className="h6 course-progress-value d-flex justify-content-center align-items-center">{course.course_name}</div>
                    </div>
                </div>

            </div>
    );
};

export default CourseProgress;