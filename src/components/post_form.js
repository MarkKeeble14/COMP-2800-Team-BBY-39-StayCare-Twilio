import React from "react"
import $ from "jquery"

import "./css/post.css"
import "./file-select"
import {postActivity} from "./js/post"
import {FileSelector} from "./file-select"

const PostForm = () => {

    //console.log(datetimepicker);
    //$('#datetimepicker').datetimepicker({ footer: true, modal: true });

    return (
        <div id="post-form">
            <FileSelector />            
            <form>
                <div className="form-group">
                    <label htmlFor="activityName">Name of Activity</label>
                    <input type="text" className="form-control" id="activityName"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description"></textarea>
                </div>
                <div className="form-group">
                    <input id="datetimepicker" placeholder="Schedule a time for your activity!"/>
                </div>
                
                <div className="form-group">
                    <select className="custom-select" id="maxOccupants" defaultValue="0">
                        <option value="0">Choose Max Number of Occupants</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>                    
                </div>
                <div className="form-group">
                    <input type="button" id="post" value="Post Activity!" 
                            className="btn btn-outline-success my-2 my-sm-0" onClick={postActivity}/>                    
                </div>


            </form>        
        </div>
    )
}

export default PostForm