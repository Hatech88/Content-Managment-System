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
        createRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      // case 'Update an employee manager':
      //   updateManager();
      //   break;
      // case 'View employees by department':
      //   viewEmployeesByDepartment();
      //   break;
      // case 'Delete a department':
      //   deleteDepartment();
      //   break;
      // case 'Delete a role':
      //   deleteRole();
      //   break;
      // case 'Delete an employee':
      //   deleteEmployee();
      //   break;
      // case 'View department budgets':
      //   viewBudgets();
      //   break;
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
      name: 'name',
      message: 'What is the name of the new department?'
    })
    
    .then(res => {
      let name = res;
      db.addDepartment(name)
          .then(() => console.log(`Added ${name.name} to the database`))
          .then(() => promptUser())
  })
}

// add role
// Add a role
function createRole() {
  db.showDepartments()
      .then(([rows]) => {
          let departments = rows;
          const departmentChoices = departments.map(({ id, name }) => ({
              name: name,
              value: id
          }));
inquirer
          .prompt([
              {
                  name: "title",
                  message: "What is the name of the role?"
              },
              {
                  name: "salary",
                  message: "What is the salary rate?"
              },
              {
                  type: "list",
                  name: "department_id",
                  message: "Which department does the role fall under?",
                  choices: departmentChoices
              }
          ])
              .then(role => {
                  db.addRole(role)
                      .then(() => console.log(`Added ${role.title} to the database`))
                      .then(() => promptUser())
              })
      })
}


// function addRole () {
//   db.showDepartments()
//   .then(([rows]) => {
//       let departments = rows;
//       const departmentChoices = departments.map(({ id, name }) => ({
//           name: name,
//           value: id
//       }));

//   // inquirer
//     .prompt([
//       {
//         name: 'title',
//         message: 'What is the name if the new role?'
//       },
//       {
//         name: 'Salary',
//         message: 'What is the salary of the new role?',
//       },
//       {
//         type: "list",
//         name: "department_id",
//         message: "In which department is the new role?",
//         choices: ["Department 1", "Department 2", "Department 3"],
//       },
//     ])

//     .then(role => {
//       db.addRole(role)
//           .then(() => console.log(`Added ${role.title} to the database`))
//           .then(() => promptUser())
//   });


    // .then((answer) => {
    //   console.log(answer.addRole);
    //   console.log(answer.newSalary);
    //   console.log(answer.whichDepartment);


    //   promptUser();
    // });
// };


// add an employee
function addEmployee() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the new employee?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the new employee?'
    },

    {
      type: 'input',
      name: 'roleId',
      message: 'What is the role of this employee?',
      // choices: roleChoices
    },

    {
      type: 'input',
      name: 'employeeManager',
      message: 'who is the manager of the new employee?'
    },
  ])
  
  .then(res => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.showRoles()
    .then(([rows]) =>{
      let roles = rows;
      const roleChoices = roles.map(({id, title}) =>({
        name: title,
        value: id
      }));
inquirer
      .prompt({
        type: "list",
        name: "roleId",
        message: "What's the employee's role?",
        choices: roleChoices
    })
        .then(res => {
            let roleId = res.roleId;

            db.showEmployees()
                .then(([rows]) => {
                    let employees = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));

                    managerChoices.unshift({ name: "None", value: null });
inquirer
                    .prompt({
                        type: "list",
                        name: "managerId",
                        message: "Who will be the employee's manager?",
                        choices: managerChoices
                    })
                        .then(res => {
                            let employee = {
                                manager_id: res.managerId,
                                role_id: roleId,
                                first_name: firstName,
                                last_name: lastName
                            }

                            db.addEmployee(employee);
                        })
                        .then(() => console.log(
                            `Added ${firstName} ${lastName} to the database`
                        ))
                        .then(() => promptUser())
                })
        })

    })

  })



};

// +===========================================================================


// Update an employee's role
function updateEmployeeRole() {
  db.showEmployees()
      .then(([rows]) => {
          let employees = rows;
          const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
          }));
inquirer
          .prompt([
              {
                  type: "list",
                  name: "employeeId",
                  message: "Which employee's role do you want to update?",
                  choices: employeeChoices
              }
          ])
              .then(res => {
                  let employeeId = res.employeeId;
                  db.showRoles()
                      .then(([rows]) => {
                          let roles = rows;
                          const roleChoices = roles.map(({ id, title }) => ({
                              name: title,
                              value: id
                          }));
inquirer
                          .prompt([
                              {
                                  type: "list",
                                  name: "roleId",
                                  message: "What's the new role of this employee?",
                                  choices: roleChoices
                              }
                          ])
                              .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                              .then(() => console.log("Employee's role is updated"))
                              .then(() => promptUser())
                      });
              });
      })
}

// Quit the app
function quit() {
  process.exit();
}