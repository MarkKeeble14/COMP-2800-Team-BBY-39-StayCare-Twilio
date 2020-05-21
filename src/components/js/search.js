import $ from "jquery"
import {db} from "./firebase"
import {ref} from "./firebase"
import { firebase } from "./firebase"
import "../css/search.css"

let search = [];
let results = [];

function getSearchResults(array) {
  for (let i = 0; i < array.length; i++) {
    db.collection(array[i]).get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          search.push(doc);
        });
      }).then(function () {
        autocomplete($("#myInput"), search);
      })
  }
}

function clearSearchResults() {
  search = [];
}

function autocomplete(input, array) {
  var currentFocus;
  input.on("input", function (e) {
    let val = input.val();

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

      if (typed.toUpperCase() === val.toUpperCase()) {

        this.parentNode.appendChild(a);

        results.push(array[i]);

        let b = document.createElement("div");
        b.innerHTML = "<strong>" + typed + "</strong>";
        b.innerHTML += suggestion.substr(val.length);

        b.addEventListener("click", function (e) {
          input.val(suggestion);
          results = [array[i]];
          $("#searchButton").click();
          closeAllLists();
        })

        a.appendChild(b);
      }
    }
  })

  // execute a function presses a key on the keyboard
  input.on("keydown", function (e) {
    let xSelector = "#" + this.id + "autocomplete-list";
    let x = $(xSelector);
    if (x)
      x = $(xSelector + " div");
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
        if (x && x[currentFocus]) {
          x[currentFocus].click();
        }
        currentFocus = -1;
      } else {
        $("#searchButton").click();
      }
    }
  });

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

  // removes search suggestions div
  function closeAllLists(element) {
    let x = $(".autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (element !== x[i] && element !== input) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  })
}

// hides search results
function hideSearchResults() {
  console.log('search results hidden');
  $("#searchResultsActivities *").remove();
}

//shows any activities that were in the search suggestions
function showSearchResults() {
  toggleNav();

  if ($("#myInput").val() !== "") {
    $("#searchResultsActivities *").remove();
    $("#searchResultsActivities").show();

    let searchInput = $("#myInput").val();
    $("<h4 id='showingFor'>Showing search results for \"" + searchInput + "\"</h4>").appendTo("#searchResultsActivities");
    $("<input type='button' id='hideSearchResults' value='Hide Search Results' class='btn btn-white btn-animation-1'></input>").appendTo("#searchResultsActivities");
    $("#hideSearchResults").on('click', function() {
      console.log('search results hidden');
      $("#searchResultsActivities *").remove();
    })
    $("<div id='searchResultsActivitiesContainer'></div>").appendTo("#searchResultsActivities");
    results.forEach(result => showActivity(result));    
  }
}

// displays activity when passed an object that is an activity document
function showActivity(result) {
  let resultId = "#" + result.id;
  $("<div class='card flex' id='" + result.id + "'></div>").appendTo("#searchResultsActivitiesContainer");

  console.log(result.data().image);
  ref.child(result.data().image).getDownloadURL().then(function (url) {
    $("<img class='card-img-top' src='" + url + "'></img>").prependTo(resultId);
  })
  $("<div class='card-body'></div>").appendTo(resultId);

  $("<h4 class='card-title left'>" + result.data().title + "</h4>").appendTo(resultId + " .card-body");
  $("<p class='card-worker left'>" + "with " + result.data().worker + "</p>").appendTo(resultId + " .card-body");
  $("<p class='card-text left'>" + result.data().description + "</p>").appendTo(resultId + " .card-body");

  let scheduledTime = result.data().time;
  let timeHtml = "<p class='card-text left'>Scheduled for: " + scheduledTime + "</p>";
  $(timeHtml).appendTo(resultId + " .card-body");

  $("<p class='card-text left'>Room Size: " + result.data().size + " spots</p>").appendTo(resultId + " .card-body");

  $("<div class='box'><input type='submit' id='signUpButton' class='btn btn-white btn-animation-1 middled-button' value='Sign Up!'/></div>").appendTo(resultId + " .card-body");

  
  function signUp() {
    $('#signUpButton').on('click', function() {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user != null) {
            db.collection("users").doc(user.uid).get()
            .then(function (snap) {
                $('.children-response-container').replaceWith("<div class='children-response-container'></div>");
                if (snap.data().children != undefined) {
                  for (let i = 0; i < snap.data().children.length; i++) {
                    let child = snap.data().children[i];
                    let id = child + '-Check';
                    $('.children-response-container').append("<input type='checkbox' class='child-select' id='" + id + 
                      "' name='" + id + "' value='" + child + "'/>" +
                      "<label for='" + id + "'>" + child + "</label>");
                  }
                  let signupForm = $('#signupForm');
                      if (signupForm.hasClass('active')) {
                        signupForm.removeClass('active');
                      } else {
                        signupForm.addClass('active');
                      }
                      
                      $('#signup-form-activity-title').html(result.data().title);
                      $('#signup-form-activity-key').html(result.data().key);
                      $('#signup-form-activity-worker').html(result.data().worker);
                      $('#signup-form-activity-time').html(result.data().time);
                } else {
                  alert("You don't currently have any children attached to your account. Please go to your Profile and add them.");
                }
            })
        }
      })
    })
  }

  signUp();
}


/*Currently not in use -- was meant to interpret format given by 
datetimepicker which is currently not working*/
function getWrittenDate(dateString) {

  let hour = parseInt(dateString.substr(0, 2));
  
  let ampm = "AM";
  if (hour > 12) {
    hour -= 12;
    ampm = "PM";
  }
  
  let minutes = dateString.substr(3, 3);
  let time = hour + ":" + minutes + " " + ampm;

  let monthNum = parseInt(dateString.substr(6, 7));
  const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let monthName = MONTHS[monthNum - 1];

  let day = parseInt(dateString.substr(9, 10));

  let year = parseInt(dateString.substr(12, 15));

  let date = monthName + " " + day + ", " + year;


  return {
    date: date,
    time: time
  }

}


function clearInput() {
  $("#myInput").val("");
}

// toggles collapsible nav menu
function toggleNav() {
  let expanded = $("#navToggler").attr("aria-expanded");
  if (expanded === "true" && window.innerWidth < 992) {
    $("#navToggler").click();
  }
}

export {search}
export {results}
export {getSearchResults}
export {autocomplete}
export {showSearchResults}
export {showActivity}
export {clearSearchResults}
export {clearInput}
export {toggleNav}
