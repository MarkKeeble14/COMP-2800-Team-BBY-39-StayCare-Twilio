import React from 'react'
import "./css/temp.css"
import ChooseRole from "./choose-role"
import Login from "./login-form"
import ParentSignup from "./sign-up-parent"
import WorkerSignup from "./sign-up-worker"
import $ from "jquery"
import { firebase } from "./js/firebase"

// This is the component that houses all of the elements that make up the form, that is to say:
// Login form
// The buttos that let you choose whether you will sign up as a worker or a parent
// Signup as a worker form 
// Signup as a parent form
const FormArea = () => {
    function ShowLoginArea() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user != null) {
                $('#form-area').addClass('inactive');
            }
        })
    }

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