import { useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function Login({setCurrentUser}) {
  const  navigate = useNavigate()

    let usernameElem = useRef(null)
    let userpassElem = useRef(null)

    async function loginHandler(event) {
        event.preventDefault()
        const result = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
                userName: event.target.elements.username.value,
                password: event.target.elements.password.value
            })
        })
        let res = await result.json()
        console.log(res.ok,res.name)
    
        if (res.ok === true) {
            setCurrentUser({userName:res.name,password:res.password})
            navigate('/Todos')
    
        } else {
            alert('invaled Login')
        }

        console.log(event.target.elements.username.value)
    }

    async function signUpHandler(event) {
        event.preventDefault()
        let userName = usernameElem.current.value
        let password = userpassElem.current.value
        const result = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        })
        console.log(await result.json())
        console.log(usernameElem.current)
        console.log('signing up', userName, password)
    }

    return (<>
        <form onSubmit={loginHandler}>
            <label htmlFor="username"> UserName </label>
            <input ref={usernameElem} type="text" placeholder="Enter your name" id="username"  />
            <br />
            <label htmlFor="password"> Password </label>
            <input ref={userpassElem} type="password" placeholder="Enter your Password" id="password" />
            <br />
            <button id="submit">Log In</button>
            <button onClick={signUpHandler}>Sign Up</button>

        </form>
    </>)
}