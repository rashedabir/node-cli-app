#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const chalk = require("chalk");

const todoFilePath = path.join(__dirname, "todo.txt");

program
  .version("1.0.0")
  .description("Simple command line todo list application");

program
  .command("add <task>")
  .description("Add a new task to the list")
  .action((task) => {
    // Load existing tasks from file
    let tasks = [];
    try {
      tasks = fs.readFileSync(todoFilePath, "utf8").trim().split("\n");
    } catch (err) {}

    // Add the new task and save the updated list to file
    tasks.push(task);
    fs.writeFileSync(todoFilePath, tasks.join("\n"));

    console.log(chalk.green(`Task "${task}" has been added to the list`));
  });

program
  .command("list")
  .description("List all tasks")
  .action(() => {
    // Load tasks from file and print them to the console
    let tasks = [];
    try {
      tasks = fs.readFileSync(todoFilePath, "utf8").trim().split("\n");
    } catch (err) {}

    if (tasks.length === 0) {
      console.log(chalk.yellow("No tasks found"));
    } else {
      console.log(chalk.bold("Tasks:"));
      tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
      });
    }
  });

program
  .command("delete <taskID>")
  .description("Delete a task by ID")
  .action((taskID) => {
    // Load existing tasks from file
    let tasks = [];
    try {
      tasks = fs.readFileSync(todoFilePath, "utf8").trim().split("\n");
    } catch (err) {}

    // Remove the specified task and save the updated list to file
    if (taskID > 0 && taskID <= tasks.length) {
      const deletedTask = tasks.splice(taskID - 1, 1)[0];
      fs.writeFileSync(todoFilePath, tasks.join("\n"));
      console.log(
        chalk.green(`Task "${deletedTask}" has been deleted from the list`)
      );
    } else {
      console.log(chalk.red(`Invalid task ID: ${taskID}`));
    }
  });

program.parse(process.argv);
