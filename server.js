// import inquire 
const inquirer = require('inquirer');

// Import mysql2
const mysql = require('mysql2');
const { showDepartments, showRoles, showEmployees } = require('./db');

const db = require('./db');



init();

function init() {
  promptUser();
}


// inqurier Package =============================
// setting up the questions 

function promptUser() {

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

  // to print it to the screen we do .then and we can do the call back with the arrow function 
  .then((answers) => {
    let choices = answers.choices;
    // console.log("Test");
  
    switch (choices) {
      case 'View all departments':
        showDepartments();
        break;
    
      case 'View all roles':
        showRoles();
        break;
      case 'View all employees':
        showEmployees();
        break;
      case 'Add a department':
        addDeparment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployee();
        break;
      case 'Update an employee manager':
        updateManager();
        break;
      case 'View employees by department':
        viewEmployeesByDepartment();
        break;
      case 'Delete a department':
        deleteDepartment();
        break;
      case 'Delete a role':
        deleteRole();
        break;
      case 'Delete an employee':
        deleteEmployee();
        break;
      case 'View department budgets':
        viewBudgets();
        break;
      default:
        quit();
    }

  });
};


function viewDepartment () {
  db.showDepartments()
  .then(([rows] ) => {
    let department = rows 
    console.log(department);

  })
  .then(() => {
    promptUser();
  })
}

