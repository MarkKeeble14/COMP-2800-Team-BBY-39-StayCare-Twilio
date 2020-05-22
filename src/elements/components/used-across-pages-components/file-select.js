import * as React from "react";
import $ from "jquery"
import { ref } from "../../js/firebase"
import { postId } from "../../js/post"
import "../../css/post.css"

let file;
let fullPath;
let fileRef;

export class FileSelector extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectorFiles) {
        // console.log(selectorFiles);
        file = selectorFiles[0];
        //if a file was chosen   
        if (file) {
            //if the file chosen is an image
            if ((file.type === 'image/png') || (file.type === 'image/jpg') || (file.type === 'image/jpeg')) {       
                fullPath = "Images/activities/" + postId + file.name;
                fileRef = ref.child(fullPath);
    
                let reader = new FileReader();
                // show the image in the form
                reader.onload = function (e) {
                    console.log("working");
                    // console.log(e.target.result);
                    $("#image-container").css("background-image", "url('" + e.target.result + "')");
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
    }

    render ()
    {
        return ( 
            <>
            <input type="file" id="filetoRead" onChange={ (e) => this.handleChange(e.target.files) } />
            <div id="image-container"><label htmlFor="filetoRead"></label></div>
            </>
        )  
    }
}

export {file}
export {fullPath}
export {fileRef} 