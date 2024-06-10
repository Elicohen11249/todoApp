const title = "Welcome to our To Do App!"


async function logInBtnClicked() {
    let inputName = document.querySelector("#user-Name-input").value
    let inputPass = document.querySelector("#user-Pass-input").value


    const result = await fetch('http://localhost:3000/tasks/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userName: inputName,
            password: inputPass
        })
    })
    let res = await result.json()
    console.log(res.ok)

    if (res.ok ===true) {
        main()
setTimeout(displayApp,2000)
    } else {
        alert('invaled Login')
    }
    //document.querySelector("#Login-btn").innerText = "Logging In..."
    // setTimeout(displayApp, 1000)
}

function displayApp() {
    document.querySelector(".todo-container").style.display = "block";
    document.querySelector(".Wellcome").style.display = "none";

    displayTitle()
    displayTasks()
}

function displayTitleTillIndex(index) {
    let subTitle = title.substring(0, index + 1)
    if (index < title.length - 1) subTitle += '_';
    document.querySelector("#disTitle").innerText = subTitle
}



function displayTitle() {
    for (let i = 0; i < title.length; i++) {
        setTimeout(function () { displayTitleTillIndex(i) }, i * 100)
    }
}