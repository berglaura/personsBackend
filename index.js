const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())

morgan.token('person', (req, res) => {
    return JSON.stringify(req.body)
})


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))



let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <br>${new Date()}<p>`
    )
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * (10000 - 1 + 1) ) + 1;
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Insert both name and number'
        })
    } else if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: 'Name allready exists'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId
    }

    persons = persons.concat(person)

    res.json(person)
})

const port = process.env.port || 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
