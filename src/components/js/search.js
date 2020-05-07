let search = []
const db = firebase.firestore();

window.onload = getSearchResults(["activities"]);

function getActivities() {
  db.collection("activities").get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        search.push(doc.data().title);
      });
    }) 
}

function getSearchResults(array) {
  for (let i = 0; i < array.length; i++) {
    db.collection(array[i]).get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        search.push(doc.data().title);
      });
    }).then(console.log(search))
  }
}

function clearSearchResults() {
    search = [];
}


function autocomplete(input, array) {
  var currentFocus;

  input.addEventListener("input", function (e) {
    let val = this.value;

    closeAllLists();

    if (!val) {
      return false;
    }
    currentFocus = -1;

    let a = document.createElement("div");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    for (let i = 0; i < array.length; i++) {

      let typed = array[i].substr(0, val.length);

      if (typed.toUpperCase() == val.toUpperCase()) {

        this.parentNode.appendChild(a);        

        let b = document.createElement("div");
        b.innerHTML = "<strong>" + typed + "</strong>";
        b.innerHTML += array[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + array[i] + "'>";

        b.addEventListener("click", function (e) {
          input.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        })

        a.appendChild(b);
      }
    }
  })

  /*execute a function presses a key on the keyboard:*/
  input.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x)
        x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
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