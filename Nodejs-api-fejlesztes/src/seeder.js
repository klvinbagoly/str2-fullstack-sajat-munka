const PersonModel = require('./models/person.model')
const data = require('./controllers/person/data');

(async () => {
  await PersonModel.insertMany(data)
})()