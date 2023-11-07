import { faker } from "@faker-js/faker";
import chalk from "chalk";
import inquirer from "inquirer";
class Customer {
    constructor(firstName, lastName, age, gender, cellNum, accNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.cellNum = cellNum;
        this.accNumber = accNumber;
    }
}
class Bank {
    constructor() {
        this.customer = [];
        this.account = [];
    }
    addCustomer(obj) {
        this.customer.push(obj);
    }
    addAccountNumber(obj) {
        this.account.push(obj);
    }
    transactions(accObj) {
        let NewAccounts = this.account.filter(acc => acc.accNumber !== accObj.accNumber);
        this.account = [...NewAccounts, accObj];
    }
}
;
let myBank = new Bank();
for (let i = 1; i <= 1000; i++) {
    let fName = faker.person.firstName("male");
    let lName = faker.person.lastName();
    // let num = parseInt(faker.phone.number("3##########"));
    let num = 1001; //hard coded acccount number
    const cus = new Customer(fName, lName, 25 * i, "male", num, 1000 + i);
    myBank.addCustomer(cus);
    myBank.addAccountNumber({ accNumber: cus.accNumber, balance: 100 * i });
}
// console.log(myBank)
// Bank Functionality
async function bankService(bank) {
    let service = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "PLease Select The Service",
        choices: ["View Balance", "Cash Withdraw", "Cash Deposit"],
    });
    if (service.select == "View Balance") {
        console.log("View Balance");
        let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: "Please Enter Your Account Number:",
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.num);
        if (!account) {
            console.log(chalk.red.bold("Invalid Account Number"));
        }
        if (account) {
            let name = myBank.customer.find((item) => item.accNumber == account?.accNumber);
            console.log(`Dear ${chalk.green.bold(name?.firstName)} ${chalk.green.bold(name?.lastName)} Your Account Balance is ${chalk.bold.blueBright("$", account.balance)}`);
        }
    }
    if (service.select == "Cash Withdraw") {
        let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: "Please Enter Your Account Number:",
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.num);
        if (!account) {
            console.log(chalk.red.bold("Invalid Account Number"));
        }
        if (account) {
            let ans = await inquirer.prompt({
                type: "number",
                message: "Please Enter Your Amount.",
                name: "Rupees",
            });
            let newBalance = account.balance - ans.Rupees;
            bank.transactions({ accNumber: account.accNumber, balance: newBalance });
            console.log(newBalance);
        }
    }
    if (service.select == "Cash Deposit") {
        let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: "Please Enter Your Account Number:",
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.num);
        if (!account) {
            console.log(chalk.red.bold("Invalid Account Number"));
        }
        if (account) {
            let ans = await inquirer.prompt({
                type: "number",
                message: "Please Enter Your Amount.",
                name: "Rupees",
            });
            let newBalance = account.balance + ans.Rupees;
            bank.transactions({ accNumber: account.accNumber, balance: newBalance });
            console.log(newBalance);
        }
    }
}
bankService(myBank);
