const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://LaraB:${password}@cluster0.il1gu.mongodb.net/puhluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length > 3) {
    const curName = process.argv[3]
    const curNumber = process.argv[4]

    const person = new Person({
        name: curName,
        number: curNumber
      })

      person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
      })
} else {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
