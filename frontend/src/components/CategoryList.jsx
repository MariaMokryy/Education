import React from 'react';
import CategoryItem from "./CategoryItem";
import {selectCoursesCompletions} from "../features/completions/completionsSlice";
import {useSelector} from "react-redux";


const CategoryList = ({categories}) => {
    const coursesCompletions = useSelector(selectCoursesCompletions)


    const isCardDisplay = (category) => {
        let course_count = 0
        coursesCompletions.forEach(value => {
            if (value.category === category.id)
                course_count++
        })
        return course_count !== 0
    }

    return (
            <div className='row d-flex'>
                {categories.map(category =>
                    isCardDisplay(category) &&
                    <CategoryItem category={category} key={category.id}/>
                )}
            </div>
    );
};

export default CategoryList;