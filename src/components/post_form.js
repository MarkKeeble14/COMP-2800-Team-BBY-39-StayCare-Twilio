import React from "react"
import $ from "jquery"
import "./css/post.css"
import {ref} from "./js/firebase"
import "./file-select"
import {photo} from "./js/post"
import {fileRef} from "./js/post"
import {file} from "./js/post"
import {fullPath} from "./js/post"
import {newPostId} from "./js/post"
import {postId} from "./js/post"
import {uploadImage} from "./js/post"
import {postActivity} from "./js/post"
import {refreshSearchResults} from "./js/post"
import {clearForm} from "./js/post"
import { FileSelector } from "./file-select"
//import "https://unpkg.com/gijgo@1.9.13/js/gijgo.min.js"
//import "https://unpkg.com/gijgo@1.9.13/css/gijgo.min.css"

//$('#datetimepicker').datetimepicker({ footer: true, modal: true });



const PostForm = () => {
/*
    $("#filetoRead").on("change", function () {
        console.log("marker");
        file = this.files[0];
        //if a file was chosen   
        if (file) {
            //if the file chosen is an image
            if ((file.type == 'image/png') || (file.type == 'image/jpg') || (file.type == 'image/jpeg')) {       
                fullPath = "Images/activities/" + postId + file.name;
                fileRef = ref.child(fullPath);
    
                let reader = new FileReader();
                // show the image in the form
                reader.onload = function (e) {
                    photo.css("background-image", "url('" + e.target.result + "')");
                };
                reader.onerror = function (e) {
                    console.error("An error ocurred reading the file", e);
                };        
                reader.readAsDataURL(file);            
            } else {
                alert("Please provide a png or jpg image.");
                return false;
            }
        }
    }, false);*/
//<input type="file" id="filetoRead"/>
//<div id="image-container"><label htmlFor="filetoRead"></label></div>

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