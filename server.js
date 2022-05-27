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
        viewDepartment();
        break;
    
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
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

function viewRoles () {
  db.showRoles()
  .then(([rows]) => {
    let roles = rows
    console.log(roles);
  })

  .then(() => {
    promptUser();
  })
}


function viewEmployees () {
  db.showEmployees()
  .then(([rows]) => {
    let employees = rows
    console.log(employees)
  })

  .then(() => {
    promptUser();
  })
}


// =========now create the 'add' functions ====================
// add department function

function addDeparment () {
  inquirer
    .prompt({
      type: 'input',
      name: 'addDepartment',
      message: 'What is the name of the new department?'
    })
    .then((answer) => {
      // need to finish this 
    })
}

// add role

function addRole () {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'addRole',
        message: 'What is the name if the new role?'
      },
      {
        type: 'input',
        name: 'newSalary',
        message: 'What is the salary of the new role?',
      },
      {
        type: "list",
        name: "whichDepartment",
        message: "In which department is the new role?",
        choices: ["Department 1", "Department 2", "Department 3"],
      },
    ])
    .then((answer) => {
      console.log(answer.addRole);
      console.log(answer.newSalary);
      console.log(answer.whichDepartment);


      promptUser();
    });
};


// add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeFirstName',
        message: 'What is the first name of the new employee?'
      },
      {
        type: 'input',
        name: 'employeeLastName',
        message: 'What is the last name of the new employee?'
      },

      {
        type: 'input',
        name: 'employeeRole',
        message: 'What is the role of this employee?'
      },

      {
        type: 'input',
        name: 'employeeManager',
        message: 'who is the manager of the new employee?'
      },
    ])
      .then((newEmployee) => {
        console.log(answer.employeeFirstName);
        console.log(answer.employeeLastName);
        console.log(answer.employeeRole);
        console.log(answer.employeeManager);
        db.addEmployee(newEmployee);

        promptUser();
      });
};

// ==========Now add the 'update' function =================



