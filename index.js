const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./src/schema.js')

let port = 3000

const app = express()

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(port, () => {
  console.log('Graphql API server is running at localhost:3000')
})

