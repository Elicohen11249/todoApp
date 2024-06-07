const title = "Welcome to our To Do App!"


function logInBtnClicked() {
    let inputEl = document.querySelector("#user-Name-input")
    let userName = inputEl.value

    document.querySelector("#Login-btn").innerText = "Logging In..."

    setTimeout(displayApp, 1000)

} 

function displayApp() {
    document.querySelector(".todo-container").style.display = "block";
    document.querySelector(".Wellcome").style.display = "none";

    displayTitle()
    displayTasks()
}

function displayTitleTillIndex(index) {
    let subTitle = title.substring(0, index+1)
   if(index < title.length-1) subTitle += '_';
    document.querySelector("#disTitle").innerText = subTitle
}



function displayTitle() {
    for (let i = 0; i < title.length; i++) {
        setTimeout(function () { displayTitleTillIndex(i) }, i * 100)
    }
}
/*    document.querySelector("#user-Name").innerText = userName

document.addEventListener("DOMContentLoaded", function () {


    document.querySelector("#Login-btn")
        .addEventListener("click",lib)
})*/