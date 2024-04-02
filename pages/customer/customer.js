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
    window.location.reload()
    history.pushState(null, location.href="../../index.html");
}

function Add_customer(){
  var sender=  document.getElementById("sender").value
  var reciver=  document.getElementById("reciver").value
  var phone=  document.getElementById("phone").value
  var bank=  document.getElementById("bank").value
  var account=  document.getElementById("account").value
  var ifsc=  document.getElementById("ifsc").value

  if (sender!="" && reciver!="" && phone!="" && bank!="" && account!="" && ifsc!="") {

    var obj ={
        Sender:sender,
        Reciver:reciver,
        Phone:phone,
        Bank: bank,
        Account:account,
        IFCS:ifsc
    }
    var username=localStorage.getItem("u_name")
    firebase.database().ref().child("customer").child(username).child(sender).child("details").push(obj,err=>{
if (err) {
    alert("Error Occured")
} else {
    alert("Customer Added Successfully")
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