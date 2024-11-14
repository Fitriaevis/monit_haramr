let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'monit_haramr',
});

connection.connect(function(error){
    if(!!error){
        console.log(error)
    }else{
        console.log('Connection Success to Database!')
    }
});

module.exports = connection;