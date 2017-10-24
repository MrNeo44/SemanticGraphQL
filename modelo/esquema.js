
var { buildSchema } = require('graphql');
var recuperador = require('./resolvers');
var clienteDBpedia = require('../clienteDBpedia/cliente');
import ListaAlcaldes from '../datos/alcaldes.js';
import ListaPost from '../datos/posts.js';
import {
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLSchema 
} from 'graphql';
const Post = new GraphQLObjectType({
    name: "Post",
    descrciption: "Clase Post",
    fields: () => ({
        twitter: {type: GraphQLString},
        categoria: {type: GraphQLString},
        contenido: {type: GraphQLString}
    })
});

const Capital = new GraphQLObjectType({
    name: "capital",
    description: "clase sujeto capital",
    fields: () => ({
        nombre_capital: {type: GraphQLString},
        codigo_area: {type:  GraphQLString},
        codigo_postal: {type: GraphQLString},
        alcalde: {
            type: Alcalde,
            resolve: function(capital){
                return ListaAlcaldes.find(alcalde => alcalde.capital == capital.nombre_capital);
            }

        }
    })
});

const Pais = new GraphQLObjectType({
    name: "Pais",
    description: "Clase pais",
    fields: () => ({
        recurso: {type: GraphQLString},
        nombre_pais: {type: GraphQLString},
        coordenada_geo: {type: GraphQLString},
        capital: { 
            type: Capital,
            resolve: function(pais){
                return clienteDBpedia.capitalPorPais(pais.recurso);
            }
        }
    })
});

const Alcalde = new GraphQLObjectType({
    name: "Alcalde",
    description: "Clase alcalde",
    fields: () => ({
        _id: {type: GraphQLString},
        nombre: {type: GraphQLString},
        twitter: {type: GraphQLString},
        capital: {type: GraphQLString},
        post: {
            type: new GraphQLList(Post),
            args:{
                limite: {type: GraphQLInt}
            },
            resolve: function(alcalde,{limite}){
                if (limite == null){
                    return ListaPost.filter(p => p.twitter == alcalde.twitter)
                }
                else{
                    return ListaPost.filter(p => p.twitter == alcalde.twitter).slice(0,limite);
                }
            }
        }
    })
});

const Query = new GraphQLObjectType({
    name: 'Consultas',
    description: 'Endpoint',
    fields: () => ({
    	capital: {
            type: Capital,
            args:{
                nombreCapital: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: function(source,{nombreCapital}){
                return recuperador.capital(nombreCapital);
            }
        },
        posts: {
            type: new GraphQLList(Post),
            args:{
                cantidad: {type: GraphQLInt}
            },
            resolve: function(source,{cantidad}){
                return recuperador.posts(cantidad);
            }
        },
        obtenerAlcaldePorTwitter: {
            type: Alcalde,
            args:{
                twitter: {type: GraphQLString}
            },
            resolve: function(source,{twitter}){
                return recuperador.obtenerAlcaldePorTwitter(twitter);
            }
        },
        alcaldes: {
            type: new GraphQLList(Alcalde),
            args: {
                limite: {type: GraphQLInt}
            },
            resolve: function(source,{limite}){
                if (limite === null){
                    return ListaAlcaldes;
                }
                else{
                    return ListaAlcaldes.slice(0,limite);
                }
            }
        },
        pais: {
            type: Pais,
            args:{
                nombrePais: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: function(source,{nombrePais}){
                return recuperador.pais(nombrePais);    
            }
        }                                
    })
});

const Schema = new GraphQLSchema({
  query: Query
});
// exporto el esquema
export default Schema;
