import React from "react"
// import "./js/post.js"

const PostForm = () => {
    return (
        <div id="post-form">
            <input type="file" id="filetoRead"/>
            <div id="image-container"><label htmlFor="filetoRead"></label></div>
            <form>
                <div className="form-group">
                    <label htmlFor="activityName">Name of Activity</label>
                    <input type="text" className="form-control" id="activityName"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description"></textarea>
                </div>
                <input id="datetimepicker" placeholder="Schedule a time htmlFor your activity"/>
            
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
                <input type="button" id="post" value="Post Activity!" className="btn btn-outline-success my-2 my-sm-0"/>
            </form>        
        </div>
    )
}

export default PostForm