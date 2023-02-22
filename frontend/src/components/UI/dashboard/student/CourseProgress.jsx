import React, {useEffect, useState} from 'react';
import './../../../../App.css'

const CourseProgress = ({course, ...props}) => {

    const [value, setValue] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setValue(course.grade)
        }, 3000)
    }, [window])

    return (
        <button {...props}>
            <div className="row mt-2 align-items-center course-progress" style={{height: "70px"}}>
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
                            className="h5 course-progress-value d-flex justify-content-center align-items-center">{course.course_name}</div>

                    </div>
                </div>

            </div>
        </button>
    );
};

export default CourseProgress;