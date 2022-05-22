// import inquire 
const inquirer = require('inquirer');

// Import mysql2
const mysql = require('mysql2');
const Connection = require('mysql2/typings/mysql/lib/Connection');




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



// inqurier Package
// setting up the questions 

const promptUser = () => {

  inquirer.prompt([
    /* Pass your questions in here */
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'choices',
      choices: ['View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role',
                'Update an employee manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View department budgets',
                'No Action']
    }
  ])

  // tp print it to the screen we do .then and we can do the call back with the arrow function 
  .then((answers) => {
    const answers = {choices};
    // console.log("Test");
  
    if (choices === "view all departments") {
      viewDepartment();
    }
    if (choices === "View all roles") {
      showRoles();
    }

    if (choices === "View all employees") {
      showEmployees();
    }

    if (choices === "Add a department") {
      addDepartment();
    }

    if (choices === "Add a role") {
      addRole();
    }

    if (choices === "Add an employee") {
      addEmployee();
    }

    if (choices === "Update an employee role") {
      updateEmployee();
    }

    if (choices === "Update an employee manager") {
      updateManager();
    }

    if (choices === "View employee by department") {
      employeeDepartment();
    }

    if (choices === "Delete a role") {
      deleteRole();
    }

    if (choices === "Delete an employee") {
      deleteEmployee();
    }

    if (choices === "View department budgets") {
      viewBudget();
    }

    if (choices === "No Action") {
      Connection.end()
    };
  });
};