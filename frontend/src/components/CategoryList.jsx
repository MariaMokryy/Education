import React, {useEffect} from 'react';
import CategoryItem from "./CategoryItem";
import {useFetch} from "../hooks/useFetch";
import CompletionsService from "../features/completions/completions.service";
import {selectCoursesCompletions, set_courses_completions, set_modules_completions} from "../features/completions/completionsSlice";
import {useDispatch, useSelector} from "react-redux";
import Loader from "./UI/loader/Loader";

const CategoryList = ({categories}) => {
    const coursesCompletions = useSelector(selectCoursesCompletions)
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

    const isCardDisplay = (category) => {
        let course_count = 0
        coursesCompletions.forEach(value => {
            if (value.category === category.id)
                course_count++
        })
        return course_count !== 0
    }


    return (
        isLoading ? <Loader></Loader> :
            <div className='row d-flex'>
                {categories.map(category =>
                    isCardDisplay(category) &&
                    <CategoryItem category={category} key={category.id}/>
                )}
            </div>
    );
};

export default CategoryList;