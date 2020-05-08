import $ from "jquery"

import firebase from "firebase/app"
import { db } from "../js/firebase"
import { ref } from "../js/firebase"

console.log(db);
console.log(ref);

if (typeof window !== 'undefined') {
let photo = document.getElementById("image-container");
let fileRef;
let file;
let fullPath;

//random id for activity
let newPostId = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9) + "/";
};
let postId = newPostId();

function uploadImage(file) {
    fileRef.put(file).then(function() {
        console.log("uploaded file");
    })
}

/**
 * For adding image to activity in post form, input type of filetoRead is file.
 */
var fileToRead = document.getElementById("filetoRead");
if (fileToRead !== null) {
  fileToRead.addEventListener("change",function(){
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
}

/**
 * For clicking post button at bottom of form.
 */
var post = document.getElementById("post");
if (post !== null) {
  post.onclick = function () {
    let activityName = document.getElementById("activityName").value;
    let desc = document.getElementById("description").value;
    let time = document.getElementById("datetimepicker").value;
    let sel = document.getElementById("maxOccupants");
    let opt = sel.options[sel.selectedIndex]; 
    let maxOccupants = parseInt(opt.text);

    const MESSAGE = {
        IMAGE: "Please add an image.", 
        TITLE: "Title for activity required.",
        DESC: "Please add description for activity.",
        SIZE: "Please select an option.",
        TIME: "Please schedule a time for this activity."
    }

    let shouldipost = true;

    if (!file) {
        $("#imageError").remove();
        $("<p id='imageError'>" +   MESSAGE.IMAGE + "</p>").insertAfter("#image-container");
        $("#imageError").css("text-align", "center");
        $("#imageError").css("color", "red");
        $("#imageError").css("font-size", "80%");

        shouldipost = false;
    } else {
        $("#imageError").remove();
    }

    if (!activityName || activityName === "") {
        $("#titleError").remove();
        $("<p id='titleError'>" + MESSAGE.TITLE + "</p>").insertAfter("#activityName");
        $("#titleError").css("color", "red");
        $("#titleError").css("font-size", "80%");

        shouldipost = false;
    } else {
        $("#titleError").remove();
    }

    if (!desc || desc === "") {
        $("#descError").remove();
        $("<p id='descError'>" + MESSAGE.DESC + "</p>").insertAfter("#description");
        $("#descError").css("color", "red");
        $("#descError").css("font-size", "80%");

        shouldipost = false;
    } else {
        $("#descError").remove();
    }

    if (!time || time === "") {
        $("#timeError").remove();
        $("<p id='timeError'>" + MESSAGE.TIME + "</p>").insertBefore("#maxOccupants");
        $("#timeError").css("color", "red");
        $("#timeError").css("font-size", "80%");

        shouldipost = false;
    } else {
        $("#timeError").remove();
    }

    if (parseInt(sel.selectedIndex) < 1) {
        $("#sizeError").remove();
        $("<p id='sizeError'>" + MESSAGE.SIZE + "</p>").insertAfter("#maxOccupants");
        $("#sizeError").css("color", "red");
        $("#sizeError").css("font-size", "80%");
        
        shouldipost = false;
    } else {
        $("#sizeError").remove();
    }

    if (shouldipost) {
        db.collection("activities").doc(postId).set({
            "title": activityName,
            "description": desc,
            "image": fullPath,
            "time": time,
            "size": maxOccupants
        }).then(function () {
            if (file) {
                uploadImage(file);        
            }
            refreshSearchResults();
            $("#post-form").hide();
            $("#featuredActivities").show();
        });        
    } else {
        console.log("error. did not upload");
    }
  }
}


// resets search results
function refreshSearchResults() {
    clearSearchResults();
    getSearchResults(["activities"]);
    autocomplete(document.getElementById("myInput"), search);
}

// form is cleared when clicking on the post link button, 
var postLink = document.getElementById("post-link");
if (postLink !== null) {
  postLink.onclick = function () {
    clearForm();
    $("#featuredActivities").hide();
    $("#searchResultsActivities").hide();
    $("#post-form").show();
  }
}

/*
workerLink = document.getElementById("worker-link");
if (workerLink !== null) {
    workerLink.onclick = function () {
      clearForm();
      $("#featuredActivities").hide();
      $("#searchResultsActivities").hide();
      $("worker-registration-form").show();
  }
}
*/

function clearForm() {
    photo.style.backgroundImage = "url('images/img_placeholder.png')";
    document.getElementById("activityName").value = "";
    document.getElementById("description").value = "";
    postId = newPostId();
}


// SEARCH // // SEARCH // // SEARCH // // SEARCH //

let searchButton = document.getElementById("searchButton");
let search = [];
let results = [];

window.onload = getSearchResults(["activities"]);


function getSearchResults(array) {
  for (let i = 0; i < array.length; i++) {
    db.collection(array[i]).get()
    .then(function (snap) {      
      snap.forEach(function (doc) {
        search.push(doc);
      });
    })
  }
}

function clearSearchResults() {
    search = [];
}


function autocomplete(input, array) {
  var currentFocus;

  if (input !== null) {
    input.addEventListener("input", function (e) {
      let val = this.value;
  
      results = [];
  
      closeAllLists();
  
      if (!val) {
        return false;
      }
      currentFocus = -1;
  
      let a = document.createElement("div");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
  
      for (let i = 0; i < array.length; i++) {
  
        let suggestion = array[i].data().title;
  
        let typed = suggestion.substr(0, val.length);
  
        if (typed.toUpperCase() == val.toUpperCase()) {
  
          this.parentNode.appendChild(a);      
          
          results.push(array[i]);
  
          let b = document.createElement("div");
          b.innerHTML = "<strong>" + typed + "</strong>";
          b.innerHTML += suggestion.substr(val.length);
  
          b.addEventListener("click", function (e) {
            input.value = suggestion;
            results = [array[i]];
            searchButton.click();
            closeAllLists();
          })
  
          a.appendChild(b);
        }
      }
    })
  
  

  // execute a function presses a key on the keyboard
  input.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x)
        x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      // If the arrow DOWN key is pressed, increase the currentFocus variable
      currentFocus++;
      // and and make the current item more visible
      addActive(x);
    } else if (e.keyCode == 38) { //up
      // If the arrow UP key is pressed, decrease the currentFocus variable
      currentFocus--;
      // and and make the current item more visible
      addActive(x);
    } else if (e.keyCode == 13) {
      // If the ENTER key is pressed, prevent the form from being submitted,
      e.preventDefault();
      if (currentFocus > -1) {
        // and simulate a click on the "active" item
        if (x) x[currentFocus].click();
      } else {
        searchButton.click();
      }
    }
  });
}

  function addActive(x) {
    // a function to classify an item as "active":
    if (!x) return false;
    // start by removing the "active" class on all items:
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    // add class "autocomplete-active"
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    // a function to remove the "active" class from all autocomplete items
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(element) {
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (element != x[i] && element != input) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  })
}

autocomplete(document.getElementById("myInput"), search);

if (searchButton !== null) {
    searchButton.onclick = showSearchResults;
}


function showSearchResults() {
  $("#searchResultsActivities *").remove();
  $("#searchResultsActivities").show();


  let searchInput = document.getElementById("myInput").value;
  $("<h4 id='showingFor'>Showing search results for \"" + searchInput + "\"</h4>").appendTo("#searchResultsActivities");
  $("#showingFor").css("padding", "5%");
  results.forEach(result => showActivity(result));

}

function showActivity(result) {
  let resultId = "#" + result.id;
  $("<div class='card' id='" + result.id + "'></div>").appendTo("#searchResultsActivities");
  $(resultId).css("width", "80%");
  $(resultId).css("margin", "5% auto");
  $(resultId).css("padding", "5%");
  ref.child(result.data().image).getDownloadURL().then(function(url) {
    $("<img class='card-img-top' src='" + url + "'></img>").prependTo(resultId);
  })
  $("<div class='card-body'></div>").appendTo(resultId);
  
  $("<h4 class='card-title'>" + result.data().title + "</h4>").appendTo(resultId + " .card-body");
  $("<p class='card-text'>" + result.data().description + "</p>").appendTo(resultId + " .card-body");

  }
}