import React, {useEffect} from 'react';
import classes from "./Tables.module.css"
import ModuleProgress from "./ModuleProgress";
import {useSelector} from "react-redux";
import {selectCategories, selectModules} from "../../../features/educationUnits/unitsSlice";
import {selectCoursesCompletions, selectModulesCompletions} from "../../../features/completions/completionsSlice";
import {selectBranches, selectUsers} from "../../../features/users/usersSlice";
import login from "../../../pages/Login";
import {useFetch} from "../../../hooks/useFetch";

const SupervisorModulesTable = () => {
    const categories = useSelector(selectCategories)
    const modules = useSelector(selectModules)
    const users = useSelector(selectUsers)
    const branches = useSelector((selectBranches))

    const coursesCompletions = useSelector(selectCoursesCompletions)
    const modulesCompletions = useSelector(selectModulesCompletions)

    const getBranchName = (branchId) => {
        let branch = branches.find(branch => branch.id === branchId)
        if (branch !== undefined) return branch.name
        else return "undefind";
    }

    const getCompletion = (user, module) => {
        let completion = modulesCompletions.filter(completion => completion.employee === user.id && completion.module === module.id)
        if (completion !== undefined && completion.length !== 0) return completion[0];
        return 0;
    }

    const getColspan = (category) => {
        return (modules.filter(module => module.category === category.id)).length
    }

    const getLeft = (category) => {
        let left = 0;
        if (categories.indexOf(category) === 0) left = 400; else left = (getLeft(categories[categories.indexOf(category) - 1]) + getColspan(category) * 200 + 400)
        return left;
    }

    const getColor = (completed) => {
        if (completed === true) return "#8CC06D";
        else if (completed === false) return "#DD5757";
        else return "rgba(0, 0, 0, 0)";
    }

    const highlightCells = (user, module, color) => {
        document.querySelectorAll(`[employeeId]`).forEach(element => element.style.backgroundColor = "#2A2F35");
        document.querySelectorAll(`[moduleId]`).forEach(element => element.style.backgroundColor = "#2A2F35");
        document.querySelector(`[moduleId="${module.id}"]`).style.backgroundColor = color;
        document.querySelector(`[employeeId="${user.id}"]`).style.backgroundColor = color;
    }

    const resetBackground = (user, module) => {
        document.querySelectorAll(`[employeeId]`).forEach(element => element.style.backgroundColor = "#2A2F35");
        document.querySelectorAll(`[moduleId]`).forEach(element => element.style.backgroundColor = "#2A2F35");
    }

    const sortByBranch = (query) => {
        document.querySelectorAll(`[branchName]`).forEach(element => {
            if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
                element.parentElement.style.opacity = 1;
                setTimeout(()=>{
                    element.parentElement.style.display = "table-row";
                }, 300)
            }
            else {
                element.parentElement.style.opacity = 0;
                setTimeout(()=>{
                    element.parentElement.style.display = "none";
                }, 300)
            }
        });
    }

    const sortByEmployee = (query) => {
        document.querySelectorAll(`[employeeId]`).forEach(element => {
            if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
                element.parentElement.style.opacity = 1;
                setTimeout(()=>{
                    element.parentElement.style.visibility = "visible";
                }, 300)
            }
            else {
                element.parentElement.style.opacity = 0;
                setTimeout(()=>{
                    element.parentElement.style.visibility = "hidden";
                }, 300)
            }
        });
    }

    useEffect(()=> {
        console.log(users);
        users.sort((a, b) => (a.branch > b.branch) ? 1 : -1)
    }, [])

    return (
        <div className={classes.tableFixHead}>
            <table className={"h-100 w-100"}>
                <thead className={"bg-dark"}>
                {/*Категории в колспане*/}
                <tr>
                    <td className={""}
                        style={{
                            backgroundColor: "rgb(42, 47, 53)",
                            position: "sticky", left: "0", width: "200px"
                        }}
                    ></td>
                    {categories.map(category => <td
                        className={["text-center bold m-0 p-2"].join(" ")}
                        colSpan={getColspan(category)}
                        style={{
                            backgroundColor: "rgb(42, 47, 53)",
                            left: getLeft(category) + "px", width: getColspan(category) * 200 + "px"
                        }}
                    >
                        <p className={[classes.categoryValue, "text-center bold m-0 w-100 p-1 text-ellipsis"].join(" ")}>
                            {category.name}
                        </p>
                    </td>)}
                </tr>
                {/*Поиск по филиалу, сотруднику, названия модулей*/}
                <tr>
                    <th className={classes.branchValue}>
                        <input onChange={(e) => {
                            sortByBranch(e.target.value)
                        }} className={classes.tableInput} type="text" placeholder="Поиск по филиалу"/>
                    </th>
                    <th className={classes.nameValue}>
                        <input onChange={(e) => {
                            sortByEmployee(e.target.value)
                        }} className={classes.tableInput} type="text" placeholder="Поиск по ФИО"/>
                    </th>
                    {modules.map(module => <th moduleId={module.id}>{module.name}</th>)}
                </tr>
                </thead>
                <tbody>
                {users.map(user =>
                    <tr
                        style={{transition: ".3s"}}
                        key={user.id}>
                        {/*Филиал сотрудника*/}
                        <td className={classes.branchValue} branchName={user.branch}>{getBranchName(user.branch)}</td>
                        {/*Фио сотрудника*/}
                        <td className={classes.nameValue} employeeId={user.id}>{user.lastname + ' ' + user.firstname}</td>
                        {modules.map((module) =>
                            <td
                                onMouseLeave={() => resetBackground(user, module)}
                                onMouseOver={() => highlightCells(user, module, getColor(getCompletion(user, module).completed))}
                                key={module.id}
                                className={"p-1"}>
                                <ModuleProgress grade={parseInt(getCompletion(user, module).grade)} color={getColor(getCompletion(user, module).completed)}/>
                            </td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>);
};

export default SupervisorModulesTable;