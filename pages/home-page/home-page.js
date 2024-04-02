function logout() {
    localStorage.clear()
    window.location.href = "../../index.html"
}
load()
function load(){
   var u_name= localStorage.getItem("u_name")
if (u_name==null) {
    window.location.href = "../../index.html"
    return
}

document.getElementById("heading").innerHTML=`Hi ${u_name}, What Is our Task Today`
}