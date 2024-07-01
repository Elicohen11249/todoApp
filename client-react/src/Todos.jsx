import { useContext, useEffect, useState } from "react"
import Task from "./Task"
import NewTask from "./NewTask"
import Title from "./Title"
import AuthContext from "./auth"



export default function Todos() {
    const [tasks, setTasks] = useState([])
    const [deleted, setDeleted] = useState(0)
    let user = useContext(AuthContext)
    let usersName = user.userName;
    let password = user.password;

    function updateTask(taskId) {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, done: true } : task
        ));
    }

    function deleteTask() {
        setDeleted(() => deleted + 1)
    }
 
    function updateTasks(task) {
        setTasks(tasks => [...tasks, task])
    }
    useEffect(() => {
        async function loadTasks() {
            let response = await fetch(`http://localhost:3000/tasks/${usersName}/${password}`)
            const res = await response.json()
            setTasks(res)
        }
        loadTasks()

    }, [deleted])


    return (<>
        <div className="todo-container" >
            <Title />
            <NewTask updateTasks={updateTasks} />
            <section className="task-list" id="todo-list">
                <h2>Todo</h2>
                {tasks.filter(task => !task.done).map((task) => <Task deleteTask={deleteTask} updateTask={updateTask} task={task} key={task.id} />)}
            </section>
            <section className="completed" id="done-list">
                <h2>Completed</h2>
                {tasks.filter(task => task.done).map((task) => <Task deleteTask={deleteTask} task={task} key={task.id} />)}
            </section>

        </div>
    </>)
}