const Person = require('../../models/person.model')

exports.create = personData => {
  const person = new Person(personData)
  return person.save()
}

exports.findAll = () => Person.find()

exports.findOne = id => Person.findById(id)

exports.update = (id, update) => Person.findByIdAndUpdate(id, update, { new: true })

exports.delete = id => Person.findByIdAndRemove(id)