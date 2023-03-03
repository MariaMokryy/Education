import React, {useEffect} from 'react';
import {useFetch} from "../../hooks/useFetch";

import {
    selectCategories,
    set_categories
} from '../../features/educationUnits/unitsSlice'

import {
    set_courses_completions,
    set_modules_completions
} from '../../features/completions/completionsSlice'

import {useDispatch, useSelector} from "react-redux";
import UnitsService from "../../features/educationUnits/units.service";
import Loader from "../../components/UI/loader/Loader";
import CompletionsService from "../../features/completions/completions.service";
import CategoryList from "../../components/CategoryList";


const EmployeeUnitsProgress = () => {
    const categories = useSelector(selectCategories)
    const dispatch = useDispatch()

    const [fetchData, isLoading] = useFetch(async () => {
        let data = await UnitsService.getAllCategories()
        dispatch(set_categories(data))

        data = await CompletionsService.getSelfCourseCompletions()
        dispatch(set_courses_completions(data['courses_completions']))

        data = await CompletionsService.getSelfModuleCompletions()
        dispatch(set_modules_completions(data['modules_completions']))

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
        </div>
    );
};

export default EmployeeUnitsProgress;