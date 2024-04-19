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

function back() {
    window.location.href = "../home-page/Home-page.html"
}

async function logout() {
    localStorage.clear()
    await window.open("../../index.html")
    window.close();
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
                show()
            }
        })

    } else {
        alert("All Fields Are Mandatory")
    }
}
function show() {
    var username = localStorage.getItem("u_name")
    firebase.database().ref().child("form").child(username).once("value", function (form) {

        var obj = form.val()
        Arr = Object.keys(obj)

        Arr.map(function (keys) {
            Table(obj[keys].Name, obj[keys].Form, obj[keys].Form_fees, obj[keys].Our_fees, obj[keys].Payment_mode, obj[keys].Phone, obj[keys].Date)
        })


    })
}
function Table(name, form, form_fees, our_fees, payment_mode, phone, date) {

    var card = document.createElement("div")
    card.className = "col-lg-3 col-10 div p-0 rounded-3 overflow-hidden"

    var name_div = document.createElement("div")
    name_div.className = "col-12 bg-primary-subtle pt-2 text-muted rounded-top-3 align-content-center text-center"

    var name_p = document.createElement("p")
    name_p.className = "fs-5"
    name_p.innerHTML = name
    name_div.append(name_p)

    card.append(name_div)

    var table_div = document.createElement("div")

    var table = document.createElement("table")
    table.className = "table table-striped"

    var tbody = document.createElement("tbody")


    //row1

    row1 = document.createElement("tr")

    row1_cell1 = document.createElement("td")
    row1_cell1.innerHTML = "Form Name:"
    row1.append(row1_cell1)

    row1_cell2 = document.createElement("td")
    row1_cell2.innerHTML = form
    row1.append(row1_cell2)

    tbody.append(row1)

    //row2

    row2 = document.createElement("tr")
    row2_cell1 = document.createElement("td")
    row2_cell1.innerHTML = "Form Fees:"
    row2.append(row2_cell1)

    row2_cell2 = document.createElement("td")
    row2_cell2.innerHTML = form_fees
    row2.append(row2_cell2)

    tbody.append(row2)

//row3

row3 = document.createElement("tr")
    row3_cell1 = document.createElement("td")
    row3_cell1.innerHTML = "Our Fees:"
    row3.append(row3_cell1)

    row3_cell2 = document.createElement("td")
    row3_cell2.innerHTML = our_fees
    row3.append(row3_cell2)

    tbody.append(row3)

    //row4

    row4 = document.createElement("tr")
    row4_cell1 = document.createElement("td")
    row4_cell1.innerHTML = "Payment Mode:"
    row4.append(row4_cell1)

    row4_cell2 = document.createElement("td")
    row4_cell2.innerHTML = payment_mode
    row4.append(row4_cell2)

    tbody.append(row4)

    //row5

    row5 = document.createElement("tr")
    row5_cell1 = document.createElement("td")
    row5_cell1.innerHTML = "Phone No.:"
    row5.append(row5_cell1)

    row5_cell2 = document.createElement("td")
    row5_cell2.innerHTML = phone
    row5.append(row5_cell2)

    tbody.append(row5)

    //row6

    row6 = document.createElement("tr")
    row6_cell1 = document.createElement("td")
    row6_cell1.innerHTML = "Date:"
    row6.append(row6_cell1)

    row6_cell2 = document.createElement("td")
    row6_cell2.innerHTML = date
    row6.append(row6_cell2)

    tbody.append(row6)

    //row7

    row7=document.createElement("tr")
    row7_cell1_button=document.createElement("td")
    row7_cell1_button.colSpan="2"
    row7_cell1_button.className="text-end text-dark pe-5"

    //edit button

    var edit_button=document.createElement("button")
    edit_button.className="btn btn-warning me-1"
    edit_button.innerHTML="Edit"

    row7_cell1_button.append(edit_button)
    
    //delete button

    var delete_button=document.createElement("button")
    delete_button.className="btn btn-danger"
    delete_button.innerHTML="Delete"

    row7_cell1_button.append(delete_button)

    row7.append(row7_cell1_button)

    tbody.append(row7)

    table.append(tbody)

    table_div.append(table)

    card.append(table_div)

    document.getElementById("record_cards").append(card)
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