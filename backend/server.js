const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');

const schema = require('./schema/schema');

const app = express();

app.use(cors())

// Connect app to DB / MongoDB Atlas
mongoose.connect(
  process.env.ATLAS_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

mongoose.connection.once('open', () => {
  console.log("Connecting sucessfully to DB...")
})

// 
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
