// Import mysql2
const mysql = require('mysql2');


// connect to the database 
const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employeetracker_db'
    },
    // console.log('Connect to the employeetracker_db database')
  );
  
  // if error ==============================
  connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
  
  });
  

  module.exports = connection;