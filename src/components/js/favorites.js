let back = document.getElementById("back");

back.onclick = function () {
    location.href = "index.html";
}

//holds all favorite objects.
let favorites = [];

//retrieves favorite objects
function display() {
    var table = document.createElement("table");
    var table2 = document.createElement("table");
    table.id = "favorites";
    table2.id = "label";

    firebase.auth().onAuthStateChanged(function (user) {

        db.collection("users").doc(user.uid)
            .collection("favorites").get().then(function (snap) {
                snap.forEach(function (doc) {
                    favorites.push(doc.data());

                });
            }).then(function () {

                var tr = document.createElement('tr');
                tr.id = "row1";

                var td1 = document.createElement('td');
                td1.id = "cell1";
                var td2 = document.createElement('td');
                td2.id = "cell2";

                var text1 = document.createTextNode("Name");
                var text2 = document.createTextNode("Email");

                td1.appendChild(text1);
                td2.appendChild(text2);

                tr.appendChild(td1);
                tr.appendChild(td2);
                table2.appendChild(tr);

                for (let i = 0; i < favorites.length; i++) {

                    var tr = document.createElement('tr');
                    tr.id = "row1";

                    var td1 = document.createElement('td');
                    td1.id = "cell1";
                    var td2 = document.createElement('td');
                    td2.id = "cell2";

                    var text1 = document.createTextNode(favorites[i].name);
                    var text2 = document.createTextNode(favorites[i].email);

                    td1.appendChild(text1);
                    td2.appendChild(text2);

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    table.appendChild(tr);
                }
            })
        document.body.appendChild(table2);
        document.body.appendChild(table);
    })
}
display();