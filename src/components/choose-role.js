import React from "react";
import "./css/temp.css"
import $ from "jquery"


const ChooseRole = () => {
    function ChoseParent() {
        $('#parent-form').removeClass('inactive');
        $('#worker-form').addClass('inactive');
        $('#login-form').addClass('inactive');
        $('#already-have-acc').removeClass('inactive');
    }

    function ChoseWorker() {
        $('#worker-form').removeClass('inactive');
        $('#parent-form').addClass('inactive');
        $('#login-form').addClass('inactive');
        $('#already-have-acc').removeClass('inactive');
    }

    function OpenLogin() {
        $('#login-form').removeClass('inactive');
        $('#parent-form').addClass('inactive');
        $('#worker-form').addClass('inactive');
        $('#already-have-acc').addClass('inactive');
    }

    return (
        <div id="sign-up">
            <h3>Sign-Up Today</h3>
            <form id="decision-form" className="signup-form">
                <h3>Are You A Parent or a Worker?</h3>
                <div id="decision">
                    <div className="box">
                        <input type="button" className="btn btn-white btn-animation-1" value="I am a Parent" onClick={ChoseParent}/>
                    </div>
                    <div className="box">
                        <input type="button" className="btn btn-white btn-animation-1" value="I am a Worker" onClick={ChoseWorker}/>
                    </div>
                    <br/>
                </div>
                <div className="box" id="already-have-acc" className="inactive">
                    <input type="button" className="btn btn-white btn-animation-1" value="I already have an account" onClick={OpenLogin}/>
                </div>
            </form>
        </div>
    )    
}

export default ChooseRole