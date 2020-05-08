import $ from "jquery"
import { db } from "../js/firebase"
import { ref } from "../js/firebase"

let activityDocs = [];

function getActivities() {   
    db.collection("activities").get()
    .then(function (snap) {      
        snap.forEach(function (doc) {
            console.log(doc);
            activityDocs.push(doc);
        });
    }).then(function () {  
        showFeaturedActivities();      
    })
}

function showFeaturedActivities() {
    for (let i = 0; i < 5; i++) {
        let id = "#featured" + (i + 1);
        let data = activityDocs[i].data();
        let path = data.image;

        ref.child(path).getDownloadURL().then(function(url) {
            console.log("image found at path: " + path);
            $(id + " img").attr("src", url);
            $(id + " .activityInfo .title").text(data.title);
            $(id + " .activityInfo .description").text(data.description);
        }).catch(function(error) {
            console.log(error);
        });
    }
}

getActivities();

export default getActivities()