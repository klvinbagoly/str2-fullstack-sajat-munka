const findUserById = require('./findUserById')

test('findUserById should return a User object', () => {
  const users = [{ id: 1 }]
  // Stubs: olyan adatok, amelyeket sehol nem használunk fel, kizárólag a tesztnél.
  const id = 1
  expect(findUserById(users, id)).toEqual(users[0])
})
