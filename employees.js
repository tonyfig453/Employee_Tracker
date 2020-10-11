var inquirer = require("inquirer");
var connection = require("./config/server.js");


initiateApp();


function initiateApp(){
    inquirer
    .prompt({
      type: "list",
      name: "starting",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role",
        "Delete Employee",
        "Exit"
      ]
    }).then(function(response){
      console.log("Get Started response: ", response);
      console.log("the choice: ", response.starting);
  
      switch (response.starting) {
  
        case "View All Employees":
          viewAllEmployees();
            break;
        case "View All Roles":
          viewAllRoles();
            break;
        case "View All Departments":
          viewAllDepartments();
            break;
        case "Add Employee":
          addEmployee();
            break;
        case "Add Role":
          addRole();
            break; 
        case "Add Department":
          addDepartment();
            break;    
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Exit":
          connection.end();
          break;
    
        }
    })
  };
  
  
  function viewAllEmployees(){
    console.log("inside VIEW ALL EMPLOYEES");
    
    var presentEmployees = "SELECT * FROM employee";
    connection.query(presentEmployees, function(error, response){
      console.log("present Employees: ");
      console.table(response);
  
      setTimeout(initiateApp, 2000);
    })
  }
  
  
  function viewAllRoles(){
    console.log("inside VIEW ALL ROLES");
  
    var presentRoles = "SELECT * FROM role";
    connection.query(presentRoles, function(error, response){
      console.log("present Roles: ");
      console.table(response);
      setTimeout(initiateApp, 2000);
    })
  }
  
  function viewAllDepartments(){
    console.log("inside VIEW ALL DEPARTMENTS");
  
  
    var presentDepartments = "SELECT * FROM department";
    connection.query(presentDepartments, function(error, response){
      console.log("present Departments: ");
      console.table(response);
     setTimeout(initiateApp, 2000);
    })
  }
  
  function addEmployee(){
    console.log("inside ADD EMPLOYEE");
    
    inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter employee first name: "
      },
      {
        
        type: "input",
        name: "lastName",
        message: "Enter employee last name: "
      },
      {
        type: "input",
        name: "roleID",
        message: "What is the role ID of the employee: "
      },
      {
        type: "input",
        name: "managerID",
        message: "What is the manager ID?: "
      }
    ]).then(function(response){
      console.log(response);
      var newEmployee = response;
      connection.query("INSERT INTO employee SET ?",
      {
        first_name: newEmployee.firstName,
        last_name: newEmployee.lastName,
        role_id: newEmployee.roleID,
        manager_id: newEmployee.managerID,
      }, function(err, response){
        if(err){
          throw err;
        }
        console.log("employee added");
      })
  
  
      initiateApp();
    })
  }
  
  function addRole(){
    console.log("inside ADD ROLE");
  
    inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the title you would like to include?: "
      },
      {
        type: "input",
        name: "salary",
        message: "What is the role salary?: "
      },
      {
        type: "input",
        name: "departmentID",
        message: "What is the department ID?: "
      }
    ]).then(function(response){
      console.log(response);
      var newRole = response;
      connection.query("INSERT INTO role SET ?",
      {
        title: response.role,
        salary: response.salary,
        department_id : response.departmentID
      }, function(err, response){
        if(err){
          throw err;
        }
        console.log("added new role");
      })
      initiateApp();
    })
  }
  
  function addDepartment(){
    console.log("inside ADD DEPARTMENT");
  
    inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Enter department name that you would like to add: "
      }
    ]).then(function(response){
      console.log(response);
      var newDepartment = response;
      connection.query("INSERT INTO department SET ?",
      {
        name: response.department
      }, function(err, response){
        if(err){
          throw err;
        }
        console.log("added department");
      })
      initiateApp();
    })
  }
  
  
  
  function updateEmployeeRole(){
    console.log("inside UPDATE EMPLOYEE ROLE");
  
    connection.query("SELECT * FROM employee", function(err, response){
      var employeeInfo = [];
      for(let x =0; x < response.length; x ++){
        var grabbingEmployeeInfo = {value: response[x].id , name:response[x].first_name + " " +response[x].last_name};
        console.log("Grabbing info of employee: ", grabbingEmployeeInfo);
        employeeInfo.push(grabbingEmployeeInfo)
      }
      console.log("Employee Info: ", employeeInfo);
  
      if(!employeeInfo.length){
        console.log("THERE ARE NO EMPLOYEES ON THE DATABASE!");
        return setTimeout(() => initiateApp(), 2000);
        ;
      }
    inquirer
    .prompt([
      {
        type: "list",
        name: "updateEmployee",
        message: "Select employee that you'd like to update: ",
        choices: employeeInfo
      },
      {
        type: "input",
        name: "newRoleId",
        message: "What is the new role ID?: "
      }
    ]).then(res=> {
      console.log("choosing ID ", res.updateEmployee)
      connection.query("UPDATE employee SET ? WHERE ?",
      [{role_id:res.newRoleId}, {id:res.updateEmployee}]
      , function(err, response){
      if(err){
        console.log("NOT A VALID ROLE ID");
        return setTimeout(() => {
          initiateApp()
        }, 2000);
      }
      console.log("updated employee role");
    })
      
   })
  
  })
  }
  
  function deleteEmployee(){
    console.log("inside delete EMPLOYEE ROLE");
  
    connection.query("SELECT * FROM employee", function(err, response){
      var employeeInfo = [];
      for(let x =0; x < response.length; x ++){
        var grabbingEmployeeInfo = {value: response[x].id , name:response[x].first_name + " " +response[x].last_name};
        console.log("Grabbing employee info: ", grabbingEmployeeInfo);
        employeeInfo.push(grabbingEmployeeInfo)
      }
      console.log("Employee Info: ", employeeInfo);
  
      if(!employeeInfo.length){
        console.log("No employees in database");
        return setTimeout(() => initiateApp(), 2000);
        ;
      }
  
    inquirer
    .prompt([
      {
        type: "list",
        name: "updateEmployee",
        message: "Select employee that you'd like to delete: ",
        choices: employeeInfo
      }
    ]).then(res=> {
      console.log("you chose id ", res.updateEmployee)
      connection.query("DELETE FROM employee WHERE ?",
      {id:res.updateEmployee}
      , function(err, response){
      if(err){
        throw err;
      }
      console.log("employee deleted");
    })
      
   })
  
  })
  }