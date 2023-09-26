#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

async function welcome() {
  console.log(chalk.bold("Welcome to Abbas Number Guessing Game\n"));
  console.log(chalk.yellow("You have 3 attempts to guess the correct number between 0 and 10."));
  console.log(chalk.blue`
                                   888                             
                                   888                             
                                   888      
88888b.   888  888  88888b.d88b.   88888b.     .d88b.    888d888     .d8888b  
888 "88b  888  888  888 "888 "88   b888 "88  bd8P  Y8b8  88P"        88K      
888  888  888  888  888  888  888  888  888  88888888    888         "Y8888b. 
888  888  Y88b 888  888  888  888  888 d88    PY8b.      888               X88 
888  888  "Y88888   888  888  888  88888P"    "Y8888     888          88888P' 
`);

  await new Promise((resolve) => setTimeout(resolve, 2000)); // Sleep for 2 seconds
}

async function main() {
  const guessingNumber: number = Math.floor(Math.random() * 11); // Generates a random number between 0 and 10
  let attempts = 3;

  while (attempts > 0) {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "guess",
        message: "Please enter your guess:",
        validate: (value) => {
          const parsedValue = parseInt(value);
          if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 10) {
            return "Please enter a valid number between 0 and 10.";
          }
          return true;
        },
      },
    ]);

    const userGuess = parseInt(answer.guess);

    if (userGuess === guessingNumber) {
      console.log(chalk.green("Congratulations! Your guess is correct. You won!"));
      break;
    } else {
      attempts--;
      if (attempts > 0) {
        console.log(chalk.red(`Oops! That's not correct. You have ${attempts} attempts left. Try again!`));
      } else {
        console.log(chalk.yellow(`Sorry, you've run out of attempts. The correct number was: ${guessingNumber}`));
      }
    }
  }
}

async function startAgain() {
  do {
      await welcome();
      await main();
      var again = await inquirer
          .prompt({
              type: "input",
              name: "restart",
              message: "Do You Want To Continue Press y or n ?",
          })
  } while (again.restart == 'y' || again.restart == 'yes' || again.restart == 'Y' || again.restart == 'YES')
};

startAgain();
