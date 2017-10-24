var SparqlHttp = require('sparql-http-client');
var fetch = require('isomorphic-fetch');
var parser = require('../parser/parserListJson');

exports.capital = function(recursoCapital){
	SparqlHttp.fetch = fetch;
    var endpoint = new SparqlHttp({endpointUrl: 'http://dbpedia.org/sparql'}) // se crea el cliente a dbpedia
    var query = 'select distinct * where {<'+recursoCapital+'> rdfs:label ?nombre_capital. <'+recursoCapital+'> dbo:areaCode ?codigo_area. <'+recursoCapital+'> dbo:postalCode ?codigo_postal }';
    return endpoint.selectQuery(query).then(function (res) {                          
        return res.text();
    }).then(function (body) {
        var result = JSON.parse(body);
        var capital = parser.capital(result);
        return capital;
    });

}

exports.pais = function(recursoPais){
    SparqlHttp.fetch = fetch;
    var endpoint = new SparqlHttp({endpointUrl: 'http://dbpedia.org/sparql'}) // se crea el cliente a dbpedia
    var query = 'select distinct * {<'+recursoPais+'> rdfs:label ?nombre_pais. <'+recursoPais+'> georss:point ?coordenada_geo}';
    return endpoint.selectQuery(query).then(function (res,recursoPais) {                          
        return res.text();
    }).then(function (body) {
        var result = JSON.parse(body)
        var pais = parser.pais(result,recursoPais);
        return pais;
    });
}

exports.capitalPorPais = function(recurso){
    SparqlHttp.fetch = fetch;
    var endpoint = new SparqlHttp({endpointUrl: 'http://dbpedia.org/sparql'}) // se crea el cliente a dbpedia
    var query = 'select distinct ?nombre_capital, ?codigo_area, ?codigo_postal { <'+recurso+'> dbo:capital ?capital. ?capital rdfs:label ?nombre_capital. ?capital dbo:areaCode ?codigo_area. ?capital dbo:postalCode ?codigo_postal}';
    return endpoint.selectQuery(query).then(function (res) {                          
        return res.text();
    }).then(function (body) {
        var result = JSON.parse(body)
        var capital = parser.capital(result);
        return capital;
    });
}
