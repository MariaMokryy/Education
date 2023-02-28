import React, {useEffect} from 'react';
import {selectSupervisorUnitsShowing} from '../../features/uiStates/uiStatesSlice'
import {useDispatch, useSelector} from "react-redux";
import SupervisorModulesTable from "../../components/UI/table/SupervisorModulesTable";
import { set_courses_completions, set_modules_completions} from "../../features/completions/completionsSlice";
import {useFetch} from "../../hooks/useFetch";
import UnitsService from "../../features/educationUnits/units.service";
import { set_categories, set_courses, set_modules} from "../../features/educationUnits/unitsSlice";
import UsersService from "../../features/users/users.service";
import { set_branches, set_users} from "../../features/users/usersSlice";
import CompletionsService from "../../features/completions/completions.service";


const SupervisorUnitsProgress = () => {

    // поменять этот колхоз на useContext!!!!!
    const showing = useSelector(selectSupervisorUnitsShowing)


    const dispatch = useDispatch()

    const [fetchData, isLoading] = useFetch(async () => {
        let data = await UnitsService.getAllCategories()
        dispatch(set_categories(data))

        data = await UnitsService.getAllCourses()
        dispatch(set_courses(data))

        data = await UnitsService.getAllModules()
        dispatch(set_modules(data))

        data = await UsersService.getAllUsers()
        dispatch(set_users(data))

        data = await UsersService.getBranches()
        dispatch(set_branches(data))

        data = await CompletionsService.getAllCourseCompletions()
        dispatch(set_courses_completions(data))

        data = await CompletionsService.getAllModuleCompletions()
        dispatch(set_modules_completions(data))
    })

    useEffect(() => {
        fetchData()
    }, [])



    return (
        <div className={"text-light d-flex flex-column justify-content-center align-items-center"}>
            {
                showing === "courses" ? <p>Курсы</p> :
                    showing === "modules" ?
                        <div className={"w-100 h-100 overflow-auto"}>
                            <SupervisorModulesTable/>
                        </div> :
                        <p>Что-то ещё</p>}
        </div>

    );
};

export default SupervisorUnitsProgress;