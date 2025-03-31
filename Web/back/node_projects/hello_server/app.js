import express from 'express'
import fs from 'fs'

//Create a new express application
const app= express()

//Define the port to listen to, a specific process of the computer
const port=3000
//local host:3000/

//Quiero que la app use json, los mensajes que me lleguen deben 
// pasar por un interprete de json en lugar de strings
app.use(express.json())

app.get('/',(req,res)=>{
    fs.readFile('./html/home.html','utf8',
        (err,html)=>{
            if(err){
                res.status(500).send('There was an error: ' + err)
                return
            }

            console.log("Sending page...")
            res.send(html)
            console.log("Page sent!")
        })
})

//aqui defino endpoints, empezando por / -> funcion anonima
//podria ser '/api/name'
//Es una funcion que solo sirve en este contexto, como un apuntador
app.get('/person', (req, res)=>
{
    console.log("hello server")
    //console log en el servidor

    const person={
        name: "Diego",
        email: "A01420632@cwc.edu.mx",
        message: "Hello world from server"
    }

    res.json(person)
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})