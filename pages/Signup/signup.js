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

function signup() {
    var name = document.getElementById("name").value
    var surname = document.getElementById("surname").value
    var phone = document.getElementById("phone").value
    var mail = document.getElementById("mail").value
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var confirm_password = document.getElementById("confirm_password").value

    //cheacking Usernae and Phone Number
    var validatePromise = new Promise(function (resolve, reject) {
        firebase.database().ref().child("login").once("value", function (u_name) {

            if (u_name.val() != null) {

                var obj = u_name.val()
                array = Object.keys(obj)
                var found = false;

                array.map(function (key) {

                    arr = obj[key]
                    array1 = Object.keys(obj[key])

                    array1.map(function (key1) {
                        if (found) {
                            return;
                        }
                        if (username == key) {
                            alert("Username Already Exists")
                            found = true
                            reject("Username Already Exists");
                        } else if (phone == arr[key1].Phone) {
                            alert("Phone Number Already Exists")
                            found = true
                            reject("Phone Number Already Exists");
                        }
                    })

                })
                resolve();
            } else {
                resolve();
            }
        })
    })

    //Inserting Data to Database

    validatePromise.then(function () {
        if (name != "" && surname != "" && phone != "" && mail != "" && username != "" && password != "" && confirm_password != "") {
            if (password == confirm_password) {
                var obj = {
                    Name: name,
                    Surname: surname,
                    Phone: phone,
                    Mail: mail,
                    Username: username,
                    Password: password,
                    confirm_password: confirm_password
                }
                firebase.database().ref().child("login").child(username).push(obj, err => {
                    if (err) {
                        alert("Error Occured")
                    } else {
                        alert("Account Created")
                    }
                })
                document.getElementById("name").value = ""
                document.getElementById("surname").value = ""
                document.getElementById("phone").value = ""
                document.getElementById("mail").value = ""
                document.getElementById("username").value = ""
                document.getElementById("password").value = ""
                document.getElementById("confirm_password").value = ""
            } else {
                alert("password didn't Match")
            }
        } else {
            alert("All Fields are Mandatory")
        }
    }).catch(function (error) {
        // Handle errors from validation
        console.error(error);
    });
}

// for prevent arrow key to increase number in ijnput field

document.addEventListener('DOMContentLoaded', function () {
    var numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(function (input) {
        input.addEventListener('keydown', function (e) {
            // Prevent arrow keys from changing the value
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
            }
        });
    });
});

//prevent space in username 
//32 is the key code of space button

window.onload = function () {
    document.getElementById("username").oninput = function (e) {
        
        if (e.data == " ") {
            return false;
        }
    }
};

function preventSpace(event) {
    document.getElementById("username_space_alert").innerHTML=""
    if (event.keyCode === 32) {
        event.preventDefault();
        document.getElementById("username_space_alert").innerHTML="Space not Allowed"
    }
}