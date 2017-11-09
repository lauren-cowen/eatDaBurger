var connection = require('../config/connection.js');

function getplaceholders(number) {
	var arr = [];
	for(i=0; i<number;i++) {
		arr.push("?")
	}

	return arr.toString();
};

function objectToSql(object) {
	var arr = [];

	for(var key in object) {
		var value = object[key];

		if(Object.hasOwnProperty.call(object, key)) {
			if(typeof value === "string" && value.indexOf(" ")>0) {
				value = "'" + value + "'";
			}
			arr.push(key + "=" + value);
		}
	}
	return arr.toString();
}



var orm = {
	selectAll: function(table, callback) {
		var queryString = "SELECT * FROM ";
		queryString+=table;
		queryString+=";";

		connection.query(queryString, function(error, result){
			if(error) throw error;
			callback(result);
		});
	},
	insertOne: function(table, columns, values, callback) {
		var queryString = "INSERT INTO " + table;
		queryString+=" (";
		queryString+=columns.toString();
		queryString+=") ";
		queryString+= "VALUES (";
		queryString+=getplaceholders(values.length);
		queryString+=") ";
		console.log(queryString);

		connection.query(queryString, values, function(error, result){
			if(error) throw error;
			else callback(result);
		});
	},
	updateOne: function(table, objectColumnValues, condition, callback) {
		var queryString = "UPDATE " + table;
		queryString+= " SET ";
		queryString+= objectToSql(objectColumnValues);
		queryString+= " WHERE ";
		queryString+= condition;

		connection.query(queryString, function(error, result){
			if(error) throw error;
			else callback(result);
		});
	}
};

module.exports = orm;
