var mysql = require('mysql');

var connection;

if(process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
}

else {

connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "h78km9341ws?P",
    database: "burgers_db"
});
}


connection.connect(function(error){
	if(error) {
		console.log("Error connecting " + error.stack);
		return;
	}
	else {
		console.log("Connected as id " + connection.threadId);
	}
});

module.exports = connection;