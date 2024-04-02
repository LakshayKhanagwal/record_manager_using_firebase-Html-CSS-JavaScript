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

verify()
function verify() {
    var u_name = localStorage.getItem("u_name")
    if (u_name == null) {
        window.location.href = "../../index.html"
        return
    }
}

function back(){
    window.location.href="../home-page/Home-page.html"
}

function logout() {
    localStorage.clear()
    history.pushState(null, location.href="../../index.html");
}

function save() {
    var name = document.getElementById("name").value
    var phone = document.getElementById("phone").value
    var form = document.getElementById("form-name").value
    var form_fees = document.getElementById("form-fees").value
    var our_fees = document.getElementById("our-fees").value
    var date = document.getElementById("date").value
    var payment_mode = document.getElementById("payment-mode").value

    if (name != "" && phone != "" && form != "" && form_fees != "" && our_fees != "" && date != "" && payment_mode != "") {
        var obj = {
            Name: name,
            Phone: phone,
            Form: form,
            Form_fees: form_fees,
            Our_fees: our_fees,
            Date: date,
            Payment_mode: payment_mode
        }
        var username = localStorage.getItem("u_name")

        firebase.database().ref().child("form").child(username).push(obj, err => {
            if (err) {
                alert("Error Occured")
            } else {
                alert("Data Saved Successfully")
                window.location.reload()
            }
        })

    } else {
        alert("All Fields Are Mandatory")
    }
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