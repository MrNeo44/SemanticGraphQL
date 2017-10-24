exports.capital = function(resultado){
	var nombre_capital = JSON.stringify(resultado['results']['bindings'][0]['nombre_capital']['value'],null, ' ');
	var codigo_area = JSON.stringify(resultado['results']['bindings'][0]['codigo_area']['value'],null, ' ');
	var codigo_postal = JSON.stringify(resultado['results']['bindings'][0]['codigo_postal']['value'],null, ' ');
	var capital = new Object();
	capital.nombre_capital = nombre_capital.replace(/['"]+/g, '');
	capital.codigo_area = codigo_area.replace(/['"]+/g, '');
	capital.codigo_postal = codigo_postal.replace(/['"]+/g, '');
	capital.alcalde = null;
	return capital;
}

exports.pais = function(resultado,recursoPais){
	var pais = new Object();
	var capital = new Object();
	var nombre_pais = JSON.stringify(resultado['results']['bindings'][0]['nombre_pais']['value'],null, ' ');
	var coordenada_geo = JSON.stringify(resultado['results']['bindings'][0]['coordenada_geo']['value'],null, ' '); 
	pais.recurso = recursoPais;
	pais.nombre_pais = nombre_pais.replace(/['"]+/g, '');
	pais.coordenada_geo = coordenada_geo.replace(/['"]+/g, '');
	capital = null;
	pais.capital = capital;
	return pais;
}




