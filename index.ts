#! usr/bin/ node
import inquirer from "inquirer";

//Bank Account Interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    credit(amount: number): void
    debit(amount: number): void
    checkBalance(): void
}

//Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }

    //Debit Money
    public debit(amount: number): void {
        if (amount>0 && amount<this.balance){
            this.balance-= amount;
            console.log(`Debit successfully of $${amount} shared in account balance. Remaining Balance: $${this.balance}`);
            }
            else{
                console.log("Insufficient Balance. Debit unsuccessfull!");
                
            }
    }

    //credit Money
    public credit(amount: number): void {
        if (amount > 100) {
            amount -= 1; //$1 fee charged if more than $100 is credited
        } this.balance += amount;
            console.log(`Credit of $${amount} successfully shared in account balance. Remaining Balance: $${this.balance}`);
        }

        
    //Check Balance
    checkBalance(): void {
        console.log(`Current Balance: $${this.balance}`);
        
    }
}

//customers class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    cell: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, cell: number, account: BankAccount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.cell = cell;
        this.account = account;
    }
}


//Create bank accounts

const accounts: BankAccount[] = [
    new BankAccount (1001, 400),
    new BankAccount (1002, 800),
    new BankAccount (1003, 1200)
];

//create customers
const customers: Customer[] = [
    new Customer ("Sameer", "Hasan", "Male", 34, 3158794627, accounts[0]),
    new Customer ("Salma", "Mir", "Female", 24, 3138784627, accounts[1]),
    new Customer ("Kausar", "Gul", "Female", 29, 3138715827, accounts[2])
]

//function to interact with bank account
async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter Your Account Number:"
        })

        const Customer = customers.find(Customer => Customer.account.accountNumber === accountNumberInput.accountNumber)
        if(Customer){
        console.log(`Welcome! ${Customer.firstName} ${Customer.lastName}`);
        const ans = await inquirer.prompt([{
            name: "select",
            type: "list",
            message: "Select an operation",
            choices: ["Debit", "Credit", "Check Balance", "Exit"]
        }as any]);

        switch (ans.select){
            case "Debit":
                const debitAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to debit:"
                })
                Customer.account.debit(debitAmount.amount);
                break;  

                case "Credit":
                const creditAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to credit:"
                })
                Customer.account.credit(creditAmount.amount);
                break;  

                case "Check Balance":
                    Customer.account.checkBalance();
                    break;

                    case "Exit":
                        console.log("Exiting Bank...");
                        console.log("\n Thank You for using our Bank Services. Have A Great Day!");
                        return;
                        
                        

        }
            
        }else {
            console.log("Invalid Account Number! please try again with correct account number.");
            
        }

    } while(true)
}
service();