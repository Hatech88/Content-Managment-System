const connection = require('./connection');

class DB{
    constructor (connection) {
        this.connection = connection;
    }

// function to show all departments 
 showDepartments () {
    console.log('Showing all departments...\n');
    const sql = `SELECT department.id as id, department.name as department FROM department;`;
    return this.connection.promise().query(sql);
}


// function to show all roles 
 showRoles() {
    console.log('Showing all roles...\n');
    const sql = `SELECT role.id, role.title, department.name as department 
    FROM role
    INNER JOIN department ON role.department_id = department.id;`
    return this.connection.promise().query(sql);
}

// function to show all employees 
 showEmployees() {
    console.log('Showing all employees ...\n')
    const sql =  "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
     return this.connection.promise().query(sql);
}

// function to add a department 


// function to add a role


// function to add a new employee 
 addEmployee (employee) {
     const sql = "INSERT INTO employee SET ?";
        return this.connection.promise().query(sql, employee);
 }




};

// creating a new instant so we can use our methods 
module.exports = new DB(connection);

