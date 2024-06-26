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

function Add_customer() {
    var sender = document.getElementById("sender").value
    var reciver = document.getElementById("reciver").value
    var phone = document.getElementById("phone").value
    var bank = document.getElementById("bank").value
    var account = document.getElementById("account").value
    var ifsc = document.getElementById("ifsc").value

    if (sender != "" && reciver != "" && phone != "" && bank != "" && account != "" && ifsc != "") {

        var obj = {
            Sender: sender,
            Reciver: reciver,
            Phone: phone,
            Bank: bank,
            Account: account,
            IFCS: ifsc
        }
        var username = localStorage.getItem("u_name")
        firebase.database().ref().child("customer").child(username).child(sender).child("details").push(obj, err => {
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

function add_money() {
    var div_main = document.createElement("div")
    div_main.className = "amount position-absolute top-0 d-flex justify-content-center align-items-center"

    var div_form = document.createElement("div")
    div_form.className = "bg-white pe-5 pt-3 pb-1 ps-5 rounded-4"
    div_main.append(div_form)

    var heading = document.createElement("h1")
    heading.className = "text-center text-decoration-underline opacity-75"
    heading.innerHTML = "Add Amount"
    div_form.append(heading)

    var form_pannel = document.createElement("form")
    form_pannel.className = "mb-3"
    div_form.append(form_pannel)

    var lab_phone = document.createElement("label")
    lab_phone.innerHTML = "Phone No."

    var span_phone = document.createElement("span")
    span_phone.innerHTML = "*"
    lab_phone.append(span_phone)

    form_pannel.append(lab_phone)

    var inp_phone = document.createElement("input")
    inp_phone.type = "number"
    inp_phone.className = "form-control"
    inp_phone.placeholder = "Enter Phone Number"
    form_pannel.append(inp_phone)

    var lab_amount = document.createElement("label")
    lab_amount.innerHTML = "Amount"

    var span_amount = document.createElement("span")
    span_amount.innerHTML = "*"
    lab_amount.append(span_amount)

    form_pannel.append(lab_amount)

    var inp_amount = document.createElement("input")
    inp_amount.type = "text"
    inp_amount.className = "form-control"
    inp_amount.placeholder = "Enter Amount"
    form_pannel.append(inp_amount)

    var div_button = document.createElement("div")
    div_button.className = "text-center"

    var button_add = document.createElement("button")
    button_add.className = "btn btn-primary mt-2 me-1"
    button_add.innerHTML = "Add"
    div_button.append(button_add)

    var button_close = document.createElement("button")
    button_close.className = "btn btn-primary mt-2"
    button_close.innerHTML = "Close"
    div_button.append(button_close)

    form_pannel.append(div_button)

    document.getElementById("money").append(div_main)
}

show()
function show() {
    var username = localStorage.getItem("u_name")
    firebase.database().ref().child("customer").child(username).once("value", function (customer) {
        var obj_customer = customer.val()
        var array = Object.keys(obj_customer)

        array.map(function (customer_keys) {
            var customer_key_details = obj_customer[customer_keys].details
            var arr = Object.keys(customer_key_details)
            arr.map(function (customer_details) {
                Table(customer_key_details[customer_details].Sender, customer_key_details[customer_details].Phone, customer_key_details[customer_details].Account)
            })
        })
    })
}

function Table(name, phone, account) {
    var div_record = document.createElement("div")
    div_record.className = "border border-1 container col-11 rounded-2 d-flex justify-content-between align-items-center pt-3 ps-4 pe-4 mb-1 details_bg"

    var table_record = document.createElement("table")
    table_record.className = "table table-striped-columns w-100 rounded-5"

    var tbody = document.createElement("tbody")
    table_record.append(tbody)

    var row = document.createElement("tr")
    tbody.append(row)

    var cell_name = document.createElement("td")
    cell_name.className = "w-25 align-content-center"
    cell_name.innerHTML = `Name:&nbsp;${name}`
    row.append(cell_name)

    var cell_phone = document.createElement("td")
    cell_phone.className = "w-25 align-content-center"
    cell_phone.innerHTML = `Phone:&nbsp;${phone}`
    row.append(cell_phone)

    var cell_account = document.createElement("td")
    cell_account.className = "w-25 align-content-center"
    cell_account.innerHTML = `Account:&nbsp;${account}`
    row.append(cell_account)

    var cell_button = document.createElement("td")
    cell_button.className = "w-25 text-center"

    var button_view_record = document.createElement("button")
    button_view_record.className = "btn btn-warning"
    button_view_record.setAttribute("onclick","add_money()")
    button_view_record.innerHTML = "View Record"

    cell_button.append(button_view_record)

    row.append(cell_button)

    div_record.append(table_record)

    document.getElementById("record_output").append(div_record)
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