#! /usr/bin/env node

import inquirer from "inquirer";

let todos: string[] = [];
let condition: boolean = true;

async function createTodo(todos: string[]) {
  while (condition) {
    let todoOperation = await inquirer.prompt([
      {
        name: "operation",
        type: "list",
        message: "Select any operation to perform: ",
        choices: ["add", "update", "view", "delete"],
      },
      {
        name: "continue",
        type: "confirm",
        message: `Are you sure you want to continue? `,
        default: true,
      },
    ]);

    // Break Loop
    if (todoOperation.continue === false) {
      condition = false;
    }

    // Add Todo
    else if (todoOperation.operation === "add") {
      let addTodo = await inquirer.prompt({
        name: "add",
        type: "input",
        message: "Add an item to todo list: ",
      });

      if (addTodo.add !== "") {
        todos.push(addTodo.add);
        
        console.log("Updated Todo List");
        todos.forEach((todo) => console.log(todo));
        console.log(todos);
      } else {
        console.log(
          "Empty string can not be added in the todo list.\nPlease add something to your to do list."
        );
      }
    }

    // View Todo List
    else if (todoOperation.operation === "view") {
      console.log("***  TODO LIST  ***");
      todos.forEach((todo) => console.log(todo));
      console.log("---------------");
    }

    // Update Todo List
    else if (todoOperation.operation === "update") {
      // Select Item to update
      let updateTodo = await inquirer.prompt([
        {
          name: "update",
          type: "list",
          message: "Select any item to update: ",
          choices: todos.map((item) => item),
        },
      ]);

      // Add Item
      let addTodo = await inquirer.prompt({
        name: "add",
        type: "input",
        message: "Add an item to todo list: ",
      });

      let newTodo = todos.filter((item) => item !== updateTodo.update);
      todos = [...newTodo, addTodo.add];

      console.log(
        `"${updateTodo.update}" successfully updated in the todo list.`
      );
      console.log("Updated Todo List");
      todos.forEach((todo) => console.log(todo));
    }

    // Delete Todo
    else if (todoOperation.operation === "delete") {
      let deleteTodo = await inquirer.prompt({
        name: "delete",
        type: "list",
        message: "Select any item to delete: ",
        choices: todos.map((todo) => todo),
      });

      let newTodo = todos.filter((todos) => todos !== deleteTodo.delete);
      todos = [...newTodo];

      console.log(
        `"${deleteTodo.delete}" successfully deleted from todo list.`
      );
      console.log("Updated Todo List");
      todos.forEach((todo) => console.log(todo));
    }
  }
}

createTodo(todos);
