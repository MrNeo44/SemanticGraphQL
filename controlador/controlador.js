var express = require('express');
var graphqlHTTP = require('express-graphql');
import Schema from '../modelo/esquema'; // recupero el esquema
var app = express();
app.use('/graphql', graphqlHTTP({
                                schema: Schema, // dps de dos puntoa va la variable
                                graphiql: true,
                                }));
app.listen(4000);
console.log('Servidor corriendo en socket: localhost:4000/graphql');
