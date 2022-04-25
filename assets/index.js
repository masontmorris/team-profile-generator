const inquirer = require("inquirer");
const fs = require("fs");
const managerQuestions = [
    { name: "name", message: "What is the manager's name?", type: "input" },
    { name: "empID", message: "What is the manager's employee ID?", type: "input" },
    { name: "email", message: "What is the manager's email?", type: "input" },
    { name: "officeNum", message: "What is the manager's office number?", type: "input" },
];
const engineerQuestions = [
    { name: "name", message: "What is this engineer's name?", type: "input" },
    { name: "empID", message: "What is this engineer's employee ID?", type: "input" },
    { name: "email", message: "What is this engineer's email?", type: "input" },
    { name: "github", message: "What is this engineer's github?", type: "input" },
];
const internQuestions = [
    { name: "name", message: "What is this intern's name?", type: "input" },
    { name: "empID", message: "What is this intern's employee ID?", type: "input" },
    { name: "email", message: "What is this intern's email?", type: "input" },
    { name: "school", message: "What school does this intern attend?", type: "input" },
];
const menuOptions = {
    name: "menuSelection",
    message: "What would you like to do?",
    choices: ["Add an engineer.", "Add an intern.", "Finish building my team."],
    type: "list",
};
var team = [];

class Manager {
    constructor(name, empID, email, officeNumber) {
        this.name = name;
        this.empID = empID;
        this.email = email;
        this.officeNumber = officeNumber;
        this.role = "Manager";
    }
    addToTeam() {
        team.push(this);
    }
}

class Engineer {
    constructor(name, empID, email, github) {
        this.name = name;
        this.empID = empID;
        this.email = email;
        this.github = github;
        this.role = "Engineer";
    }
    addToTeam() {
        team.push(this);
    }
}

class Intern {
    constructor(name, empID, email, school) {
        this.name = name;
        this.empID = empID;
        this.email = email;
        this.school = school;
        this.role = "Intern";
    }
    addToTeam() {
        team.push(this);
    }
}

function newEngineer() {
    inquirer.prompt(engineerQuestions).then(function (answers) {
        var engineer = new Engineer(answers.name, answers.empID, answers.email, answers.github);
        engineer.addToTeam();
        mainMenu();
    });
}

function newIntern() {
    inquirer.prompt(internQuestions).then(function (answers) {
        var intern = new Intern(answers.name, answers.empID, answers.email, answers.school);
        intern.addToTeam();
        mainMenu();
    });
}

function buildTeam() {
    let teamCards = "";
    for (let i = 0; i < team.length; i++) {
        if (team[i].role === "Manager") {
            teamCards += `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-header-title">${team[i].name}</h2>
                        <br />
                        <h3 class="card-content">${team[i].role}</h3>
                    </div>
                    <div class="card-content card-body">
                        <ul>
                            <li>ID: ${team[i].empID}</li>
                            <li>Email: <a href="mailto:${team[i].email}" target="_blank">${team[i].email}</a></li>
                            <li>Office number: ${team[i].officeNumber}</li>
                        </ul>
                    </div>
                </div>
                `;
        } else if (team[i].role === "Engineer") {
            teamCards += `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-header-title">${team[i].name}</h2>
                        <br />
                        <h3 class="card-content">${team[i].role}</h3>
                    </div>
                    <div class="card-content card-body">
                        <ul>
                            <li>ID: ${team[i].empID}</li>
                            <li>Email: <a href="mailto:${team[i].email}" target="_blank">${team[i].email}</a></li>
                            <li>Github: <a href="https://www.github.com/${team[i].github}" target="_blank">${team[i].github}</a></li>
                        </ul>
                    </div>
                </div>
                `;
        } else if (team[i].role === "Intern") {
            teamCards += `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-header-title">${team[i].name}</h2>
                        <br />
                        <h3 class="card-content">${team[i].role}</h3>
                    </div>
                    <div class="card-content card-body">
                        <ul>
                            <li>ID: ${team[i].empID}</li>
                            <li>Email: <a href="mailto:${team[i].email}" target="_blank">${team[i].email}</a></li>
                            <li>School: ${team[i].school}</li>
                        </ul>
                    </div>
                </div>
                `;
        }
    }
    let teamHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Team Profile</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css" />
        <link rel="stylesheet" href="./assets/styles.css" />
    </head>
    <body>
        <div class="header">
        <h1>My Team</h1>
        </div>
        <div class = "flex-container">
        ${teamCards}
        </div>
    </body>
    </html>`;
    fs.writeFile("index.html", teamHTML, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

function mainMenu() {
    inquirer.prompt(menuOptions).then(function (answers) {
        // console.log(answer.menuSelection);
        switch (answers.menuSelection) {
            case "Add an engineer.":
                newEngineer();
                break;
            case "Add an intern.":
                newIntern();
                break;
            case "Finish building my team.":
                buildTeam();
                break;
        }
    });
}

function init() {
    inquirer.prompt(managerQuestions).then(function (answers) {
        var manager = new Manager(answers.name, answers.empID, answers.email, answers.officeNum);
        manager.addToTeam();
        mainMenu();
    });
}

init();
