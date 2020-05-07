let photo = document.getElementById("image-container");
var storage = firebase.storage();
let storageRef = storage.ref();
let fileRef;
let file;

document.getElementById("filetoRead").addEventListener("change",function(){
    file = this.files[0];
    console.log(file.name);   
    if (file) {
        if ((file.type == 'image/png') || (file.type == 'image/jpg') || (file.type == 'image/jpeg')) {       
            fileRef = storageRef.child("Images/" + file.name);

            let reader = new FileReader();
            reader.onload = function (e) {
                photo.style.backgroundImage = "url('" + e.target.result + "')";
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
}, false);


function uploadImage(file) {
    fileRef.put(file).then(function() {
        console.log("uploaded file");
    })
}

document.getElementById("post").onclick = function () {
    if (file) {
        uploadImage(file);
    }
    let activityName = document.getElementById("activityName");
    let desc = document.getElementById("description");
    db.collection("activities").doc().set({
        "title": activityName.value,
        "description": desc.value,
        "image": "Images/" + file.name
    }).then(function () {
        refreshSearchResults();
        hideElement("post-form");
    });
}

function refreshSearchResults() {
    clearSearchResults();
    getSearchResults(["activities"]);
    autocomplete(document.getElementById("myInput"), search);
    
}

document.getElementById("post-link").onclick = function () {
    clearForm();
    hideElement("featuredActivities");
    showElement("post-form");
}

function clearForm() {
    photo.style.backgroundImage = "url('images/img_placeholder.png')";
    document.getElementById("activityName").value = "";
    document.getElementById("description").value = "";
}