import ListaAlcaldes from '../datos/alcaldes.js';
import ListaPost from '../datos/posts.js';
var SparqlHttp = require('sparql-http-client');
var stringSimilarity = require('string-similarity');
var fetch = require('isomorphic-fetch');
var parser = require('../parser/parserListJson');
var clienteDBpedia = require('../clienteDBpedia/cliente');
const dbpedia = 'http://lookup.dbpedia.org/api/search.asmx/PrefixSearch?QueryClass=&MaxHits=5&QueryString=';

exports.capital = function(nombreCapital){
    var api_query = dbpedia+nombreCapital;
    console.log(api_query);
    var client = require('http-api-client');
    var parser = require('xml2json');
    return client.request({
        url: api_query
    }).then(function (response) {
        var datos = parser.toJson(response.getData());
        var lista_capitales_json = JSON.parse(datos);
        var recurso_capital = lista_capitales_json.ArrayOfResult.Result[0].URI;
        var capital = clienteDBpedia.capital(recurso_capital);
        return capital;
    });
      
}

exports.posts = function(cantidad){
    if (cantidad == null){
        return ListaPost;
    }
    else{
        return ListaPost.slice(0,cantidad);
    }
}
exports.obtenerAlcaldePorTwitter = function(twitter){
    return ListaAlcaldes.find(alcalde => alcalde.twitter == twitter);
}
exports.alcaldes = function(nombre,cota_inf, cota_sup){
    if (nombre == null){
        return ListaAlcaldes;
    }
    else{
        var alcaldes = ListaAlcaldes.filter(function(alcalde){
            if ( stringSimilarity.compareTwoStrings(alcalde.nombre,nombre) > cota_inf && stringSimilarity.compareTwoStrings(alcalde.nombre,nombre) <= cota_sup){
                return alcalde;
            }
        });
        return alcaldes;
    }
}
exports.pais = function(nombrePais){
    var api_query = dbpedia+nombrePais;
    console.log(api_query);
    var client = require('http-api-client');
    var parser = require('xml2json');
    return client.request({
        url: api_query
    }).then(function (response) {
        var datos = parser.toJson(response.getData());
        var lista_paises_json = JSON.parse(datos);
        var recurso_pais = lista_paises_json.ArrayOfResult.Result[0].URI;
        var pais = clienteDBpedia.pais(recurso_pais);
        return pais;
    });
}