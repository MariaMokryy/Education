import React, {useEffect} from 'react';
import {useFetch} from "../../hooks/useFetch";

import {
    selectCategories,
    selectCourses,
    selectModules,
    set_courses,
    set_modules,
    set_categories
} from '../../features/educationUnits/unitsSlice'

import {
    selectCoursesCompletions,
    selectModulesCompletions,
    set_courses_completions,
    set_modules_completions
} from '../../features/completions/completionsSlice'

import {useDispatch, useSelector} from "react-redux";
import UnitsService from "../../features/educationUnits/units.service";
import Loader from "../../components/UI/loader/Loader";
import CompletionsService from "../../features/completions/completions.service";
import CategoryList from "../../components/CategoryList";
import UsersService from "../../features/users/users.service";
import {set_users} from "../../features/users/usersSlice";


const EmployeeUnitsProgress = () => {
    const categories = useSelector(selectCategories)
    // const courses = useSelector(selectCourses)
    // const modules = useSelector(selectModules)
    // const courses_completions = useSelector(selectCoursesCompletions)
    // const modules_completions = useSelector(selectModulesCompletions)
    const dispatch = useDispatch()

    const [fetchData, isLoading] = useFetch(async () => {
        let data = await UnitsService.getAllCategories()
        dispatch(set_categories(data))

        data = await UnitsService.getAllCourses()
        dispatch(set_courses(data))

        data = await UnitsService.getAllModules()
        dispatch(set_modules(data))

        data = await UsersService.getBranchUsers()
        dispatch(set_users(data))

        // data = await CompletionsService.getSelfCourseCompletions()
        // dispatch(set_courses_completions(data['courses_completions']))
        //
        // data = await CompletionsService.getSelfModuleCompletions()
        // dispatch(set_modules_completions(data['modules_completions']))
    })

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            {isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            <CategoryList categories={categories}/>
            {/*{categories.map((category) =>*/}
            {/*    <img key={category.id} src={category.image}/>*/}
            {/*)}*/}
            {/*Здесь инфа о категориях, курсах, модулях*/}
        </div>
    );
};

export default EmployeeUnitsProgress;