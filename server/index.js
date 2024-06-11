import express from 'express'
import cors from 'cors'
import pgPromise from 'pg-promise'

const app = express()
app.use(cors())
app.use(express.json())
/*
app.get('/',(req,res,next)=>{
    next( new Error("this is bad"))
})

app.use((err,req,res,next)=>{
    res.status(500)
    res.send(`this is a error massege:${err.message}`)
})
*/



const pgp = pgPromise()
const db = pgp({
    host: 'ep-dawn-bar-a6bi78xb.us-west-2.retooldb.com',
    port: 5432,
    database: "retool",
    user: 'retool',
    password: '9SOCrxPsjU0Y',
    ssl: true
})


app.get('/database', async (req, res) => {
    const result = await db.many('select * from person')
    res.json(result)
})





function rootHandler(req, res) {
    res.json(tasks)
}


app.get('/tasks/:usersName', async (req, res) => {
    const result = await db.many('select * from task where deleted_at is null and user_id = (SELECT id  FROM person  WHERE name = ${userName})',{
userName:req.params.usersName
    })
    res.json(result.map(task => ({
        id: task.id,
        title: task.title,
        done: task.status !== 'active'
    })))
    console.log(result)
})


app.post('/tasks', async (req, res,) => {

    const result = await db.one('INSERT INTO task  ( title , user_id  ) VALUES(${title}, (SELECT id  FROM person  WHERE name = ${name}))returning *', {
        title: req.body.title,
        name:req.body.userName
    })
    res.json({
        title: result.title,
        id: result.user_id,
        done: false
    })
})
app.post('/tasks/users', async (req, res) => {
    const result = await db.one('insert into person(name,pass)values(${userName},${password})returning* ', {
        userName: req.body.userName,
        password: req.body.password

    })
    console.log(result)
    res.json({ user: result.name })
})

app.post('/tasks/login', async (req, res) => {
    try {
    let result = await db.many('select * from  person where name =${userName} and pass=${password}', {
        userName: req.body.userName,
        password: req.body.password
    })
    res.json({ok:true})

     } catch (e) {
     res.json({ ok: false })
}
    
})

app.patch('/tasks/:id', async (req, res) => {
    let result = await db.none("update task set status = 'done' where id = ${id}", {
        id: req.params.id
    })
    res.json({ ok: true })
})


app.delete('/tasks/:id', async (req, res) => {
    await db.none('update task set deleted_at = now()where id = ${id}', {
        id: req.params.id
    })
    res.json({ ok: true })
})

app.listen('3000', () => {
    console.log('the server is now running and listening for requests')
})





/*
app.get('/database', async(req,res)=>{
    const result = await db.many('select * from person')
    res.json(result)
})


let tasks = []



function rootHandler(req, res) {
    res.json(tasks)
}


app.get('/tasks', rootHandler)

app.post('/tasks', (req, res,) => {
    tasks.push(req.body)
    res.json(req.body)
})


app.patch('/tasks/:id',(req, res)=>{
    let task = tasks.find((task) => Number(task.id).toString()===req.params.id)
    task.done=true
    res.json(tasks)    
})


app.listen('3000', () => {
    console.log('the server is now running and listening for requests')
})

*/




/*app.use((req,res,next)=>{
    console.log('hello from my middle ')
    next()
})
[{
    title: 'Register on VP',
    done: true,
    usersName: "Shimen"

}, {
    title: 'Learn React.js',
    done: false,
    usersName: "Shimen"

}, {
        title: 'Learn Express.js',
        done: false,
        usersName: "Shimen"

    }]*/
