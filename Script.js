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

function save() {
    var sender = document.getElementById("Send_name").value
    var reciver = document.getElementById("Recive_name").value
    var phone = document.getElementById("Phone").value
    var bank = document.getElementById("Bank").value
    var account = document.getElementById("Account").value
    var ifsc = document.getElementById("IFSC").value
    var amount = document.getElementById("Amount").value
    var date = document.getElementById("Date").value

    if (sender != "" && reciver != "" && phone != "" && bank != "" && account != "" && ifsc != "" && amount != "" && date != "") {
        var obj = {
            Sender: sender,
            Reciver: reciver,
            Phone: phone,
            Bank: bank,
            Account: account,
            IFSC: ifsc,
            Amount: amount,
            Date: date
        }
        firebase.database().ref().child("Details_Money_Transfer").push(obj, err => {
            if (err) {
                alert("Error Occured");
            } else {
                alert("Data Save")
            }
        })
        document.getElementById("Send_name").value = ""
        document.getElementById("Recive_name").value = ""
        document.getElementById("Phone").value = ""
        document.getElementById("Bank").value = ""
        document.getElementById("Account").value = ""
        document.getElementById("IFSC").value = ""
        document.getElementById("Amount").value = ""
        document.getElementById("Date").value = ""

        show()

    } else {
        alert("Fill All Mendatory Fields")
    }
}
show()
function show() {

    firebase.database().ref().child("Details_Money_Transfer").once("value", function (data_retrived) {

        if (data_retrived.val() == null) {
            var row1 = document.createElement("tr")
            var cell_no_record = document.createElement("td")
            cell_no_record.innerHTML = "No Record"
            cell_no_record.className = "text-center text-dark"
            cell_no_record.colSpan = 9
            row1.append(cell_no_record)
            document.getElementById("tbody").append(row1)
        } else {
            var obj = data_retrived.val()
            var array = Object.keys(obj)

            document.getElementById("tbody").innerHTML = ""

            array.map(function (key, index) {
                Table(obj[key].Sender, obj[key].Reciver, obj[key].Phone, obj[key].Bank, obj[key].Account, obj[key].IFSC, obj[key].Amount, obj[key].Date, index)
            })
        }
    })
}
function Table(sender, reciver, phone, bank, account, ifsc, amount, date, index) {
    var row = document.createElement("tr")

    var cell = document.createElement("td")
    var cell1 = document.createElement("td")
    var cell2 = document.createElement("td")
    var cell3 = document.createElement("td")
    var cell4 = document.createElement("td")
    var cell5 = document.createElement("td")
    var cell6 = document.createElement("td")
    var cell7 = document.createElement("td")
    var cell8 = document.createElement("td")

    cell.innerHTML = index + 1
    cell1.innerHTML = sender
    cell2.innerHTML = reciver
    cell3.innerHTML = phone
    cell4.innerHTML = bank
    cell5.innerHTML = account
    cell6.innerHTML = ifsc
    cell7.innerHTML = amount
    cell8.innerHTML = date

    row.append(cell)
    row.append(cell1)
    row.append(cell2)
    row.append(cell3)
    row.append(cell4)
    row.append(cell5)
    row.append(cell6)
    row.append(cell7)
    row.append(cell8)

    document.getElementById("tbody").append(row)
}