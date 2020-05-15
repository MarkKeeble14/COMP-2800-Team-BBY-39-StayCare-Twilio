import $ from "jquery"
import { db } from "../js/firebase"
import { ref } from "../js/firebase"

let searchButton = document.getElementById("searchButton");
let search = [];
let results = [];
export { search }

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
export {getSearchResults}

function clearSearchResults() {
    search = [];
}
export {clearSearchResults}

function autocomplete(input, array) {
  var currentFocus;
  input.addEventListener("input", function(e) {
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

      if (typed.toUpperCase() === val.toUpperCase()) {

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
      if (element !== x[i] && element !== input) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  })
}

export {autocomplete}

console.log(document.getElementById("myInput"));
autocomplete(document.getElementById("myInput"), search);

searchButton.onclick = showSearchResults;

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
