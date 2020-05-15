import $ from "jquery"
import {db} from "./firebase"
import {ref} from "./firebase"
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
        if (x) {
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

function showSearchResults() {
  console.log("clicked this");
  toggleNav();

  if ($("#myInput").val() !== "") {
    $("#searchResultsActivities *").remove();
    $("#searchResultsActivities").show();

    let searchInput = $("#myInput").val();
    $("<h4 id='showingFor'>Showing search results for \"" + searchInput + "\"</h4>").appendTo("#searchResultsActivities");
    $("#showingFor").css("padding", "5%");
    results.forEach(result => showActivity(result));    
  }
}

function showActivity(result) {
  let resultId = "#" + result.id;
  $("<div class='card flex' id='" + result.id + "'></div>").appendTo("#searchResultsActivities");

  ref.child(result.data().image).getDownloadURL().then(function (url) {
    $("<img class='card-img-top' src='" + url + "'></img>").prependTo(resultId);
  })
  $("<div class='card-body'></div>").appendTo(resultId);

  $("<h4 class='card-title left'>" + result.data().title + "</h4>").appendTo(resultId + " .card-body");
  $("<p class='card-text left'>" + result.data().description + "</p>").appendTo(resultId + " .card-body");

  let scheduledTime = getWrittenDate(result.data().time);
  let timeHtml = "<p class='card-text left'>Scheduled for: " + scheduledTime.time + " on " + scheduledTime.date + "</p>";
  $(timeHtml).appendTo(resultId + " .card-body");

  $("<p class='card-text left'>Room Size: " + result.data().size + " spots</p>").appendTo(resultId + " .card-body");

}

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

function toggleNav() {
  console.log("clicked");
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
export {getWrittenDate}
export {clearSearchResults}
export {clearInput}
export {toggleNav}
