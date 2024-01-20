/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';


const express = require("express");
const morgan =  require('morgan')
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

let agenda = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456"
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5223523"
	},
	{
		id: 3,
		name: "Dam Abramov",
		number: "12-43-234345"
	},
	{
		id: 4,
		name: "Mary Poppendick",
		number: "39-23-65465497"
	}

]

// Constants
const PORT = process.env.PORT ?? 3000;


app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
	response.json(agenda)
  })
  
  app.get('/info', (req, res) => {
	
	res.end(`<p> Phonebook has info for ${agenda.length} people</p><p>${new Date()}</p>`)
	
  })

  app.get('/api/persons/:id',(req, res)=>{
	const id = Number(req.params.id)
	const person = agenda.find(p => p.id === id)
	if(person){
		res.json(person)
	}else{
		res.status(404).end()
	}
  })

  app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	agenda = agenda.filter( p => p.id !== id)
	
	res.status(204).end()
  })

  app.post('/api/persons', (req, res) =>{
		if( !(req.body.name && req.body.number)){
			const faltante = req.body.name ? 'number' : 'name'
			return res.status(400).json({error: `falta ${faltante}`})
		}else if( agenda.find( p => p.name === req.body.name)){
			return res.status(400).json({error: `el nombre ya esta en la agenda`})
		}

		const person = {
			id : Math.floor(Math.random() * 1000),
			...req.body
		}
		agenda = agenda.concat(person)

		res.json(agenda)
  })


  
  app.listen(PORT, () => {
	console.log(`Server running on port:${PORT}`)
  })
