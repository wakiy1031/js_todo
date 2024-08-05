import { element, render } from "./view/html-util.js";

export class App {
    constructor() {
        this.totalTasks = 0;
    }

    mount() {
        const formElement = document.querySelector("#js-todo-form");
        const inputElement = document.querySelector("#js-todo-input");
        const containerElement = document.querySelector("#js-todo-list");
        const totalTasksElement = document.querySelector("#js-total-tasks");
        const todoListElement = element`<ul></ul>`;
                
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const todoItemElement = element`<li>${inputElement.value}</li>`;
            todoListElement.appendChild(todoItemElement);
            render(todoListElement, containerElement);
            this.totalTasks += 1;
            this.updateTaskCounts(totalTasksElement);
            
            inputElement.value = "";
        });
    }
    updateTaskCounts(totalElement) {
        totalElement.textContent = this.totalTasks;
    }
}