const firebaseConfig = {
    apiKey: "AIzaSyDEABaFA6lk_oiZ6C8ZygWWj0XwFy6d8bQ",
    authDomain: "money-transfer-9a2d5.firebaseapp.com",
    projectId: "money-transfer-9a2d5",
    storageBucket: "money-transfer-9a2d5.appspot.com",
    messagingSenderId: "24747441596",
    appId: "1:24747441596:web:7d06d417e65a41bf68bfb9"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

onload()
async function onload() {
    u_name = localStorage.getItem("u_name")
    if (u_name != null) {
        await window.open("pages/home-page/Home-page.html")
        window.close();

    } else if (u_name == null && localStorage.getItem("count") == null) {
        localStorage.setItem("count", "1")
        await window.open("index.html")
        window.close();
    }
}

function login() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    if (username == "" && password == "") {
        alert("UserName and Can't be empty")
    } else {

        //loading Screen

        var div_loading = document.createElement("div")
        div_loading.className = "amount position-absolute top-0 d-flex justify-content-center align-items-center"
        div_loading.setAttribute("id", "loading")
        div_loading.innerHTML = "Loading"
        document.getElementById("loading_screen").append(div_loading)

        //Done Loading Screen

        firebase.database().ref().child("login").child(username).once("value", function (u_name) {

            if (u_name.val() != null) {

                var obj = u_name.val()
                array = Object.keys(obj)
                var found = false;

                array.map(function (key) {
                    if (found) {
                        return;
                    }

                    if (username == obj[key].Username && password == obj[key].Password) {
                        alert("login Successfull")
                        localStorage.setItem("u_name", username)
                        window.open(location.href = "/pages/home-page/Home-page.html")
                        window.close()
                        found = true
                    } else {
                        alert("Invalid Credential")
                        document.getElementById("loading").remove()
                        // console.log("lll");
                    }
                })
            } else {
                alert("User Not Found")
                document.getElementById("loading").remove()
            }
        })
    }
}


//prevent space in username 
//32 is the key code of space button

// window.onload = function () {
//     document.getElementById("username").oninput = function (e) {

//         if (e.data == " ") {
//             return false;
//         }
//     }
// };

function preventSpace(event) {
    document.getElementById("username_space_alert").innerHTML = ""
    if (event.keyCode === 32) {
        event.preventDefault();
        document.getElementById("username_space_alert").innerHTML = "Space not Allowed"
    }
}