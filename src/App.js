import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";

export class App {
    #todoListView = new TodoListView();
    #todoListModel = new TodoListModel([]);

    handleAdd(title) {
        this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
    }

    handleUpdate({ id, completed }) {
        this.#todoListModel.updateTodo({ id, completed });
    }

    handleDelete({ id }) {
        this.#todoListModel.deleteTodo({ id });
    }

    mount() {
        const formElement = document.querySelector("#js-todo-form");
        const inputElement = document.querySelector("#js-todo-input");
        const containerElement = document.querySelector("#js-todo-list");
        const totalTasksElement = document.querySelector("#js-total-tasks");  
        const completedTasksElement = document.querySelector("#js-completed-tasks");
        const incompleteTasksElement = document.querySelector("#js-incomplete-tasks");

        this.#todoListModel.onChange(() => {
            const todoItems = this.#todoListModel.getTodoItems();
            const todoListElement = this.#todoListView.createElement(todoItems, {
                onUpdateTodo: ({ id, completed }) => {
                    this.handleUpdate({ id, completed });
                },
                onDeleteTodo: ({ id }) => {
                    this.handleDelete({ id });
                }
            });

            render(todoListElement, containerElement);
            totalTasksElement.textContent = `${this.#todoListModel.getTotalCount()}`;
            completedTasksElement.textContent = `${this.#todoListModel.getCompletedCount()}`;
            incompleteTasksElement.textContent = `${this.#todoListModel.getIncompleteCount()}`;      
        });

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.#todoListModel.addTodo(new TodoItemModel({
              title: inputElement.value,
              completed: false,
            }));
            inputElement.value = "";
        });
    }
}