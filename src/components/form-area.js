import React from 'react'
import "./css/temp.css"
import ChooseRole from "./choose-role"
import Login from "./login-form"
import ParentSignup from "./sign-up-parent"
import WorkerSignup from "./sign-up-worker"

const FormArea = () => {
    return (
        <div id="form-area">
            <Login></Login>
            <ChooseRole></ChooseRole>
            <ParentSignup></ParentSignup>
            <WorkerSignup></WorkerSignup>
        </div>
    )
}

export default FormArea