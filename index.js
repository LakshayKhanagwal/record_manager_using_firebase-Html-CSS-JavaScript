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

// clearing Back History

history.pushState(null, document.title);

function login() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

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
                    localStorage.setItem("u_name",username)
                    window.location.href = "/pages/home-page/Home-page.html"
                    found = true
                } else {
                    alert("Invalid Credential")
                }
            })
        } else {
            alert("User Not Found")
        }
    })
}