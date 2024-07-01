import { useContext } from "react"
import AuthContext from "./auth"

export default function NewTask({ updateTasks }) {
    let user = useContext(AuthContext)


    async function submitHandler(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: event.target.elements.newTask.value,
                usersName: user.userName
            })
        })
        const result = await response.json()
         console.log(response)
         console.log(result)
        updateTasks(result)

        event.target.elements.newTask.value = ""

    }

    return (
        <form onSubmit={submitHandler} className="input-container">
            <input type="text" id="newTask" placeholder="add a new task" />
            <button className="add" type="submit" id="button">+</button>
        </form>

    )
}