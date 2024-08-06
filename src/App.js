import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
    #todoListModel = new TodoListModel();

    mount() {
        const formElement = document.querySelector("#js-todo-form");
        const inputElement = document.querySelector("#js-todo-input");
        const containerElement = document.querySelector("#js-todo-list");
        const totalTasksElement = document.querySelector("#js-total-tasks");  
        const completedTasksElement = document.querySelector("#js-completed-tasks");
        const incompleteTasksElement = document.querySelector("#js-incomplete-tasks");

        this.#todoListModel.onChange(() => {
            const todoListElement = element`<ul></ul>`;
            const todoItems = this.#todoListModel.getTodoItems();

            todoItems.forEach(item => {
                
                const todoItemElement = element`
                  <li class="todo-item ${item.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${item.completed ? 'checked' : ''}>
                    <span class="todo-item-title">${item.title}</span>
                    <button class="todo-item-btn delete-btn">削除</button>
                  </li>`;
                
                const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
                inputCheckboxElement.addEventListener("change", () => {
                    // 指定したTodoアイテムの完了状態を反転させる
                    this.#todoListModel.updateTodo({
                        id: item.id,
                        completed: !item.completed
                    });
                });  
                
                const deleteButtonElement = todoItemElement.querySelector(".delete-btn");
                deleteButtonElement.addEventListener("click", () => {
                  this.#todoListModel.deleteTodo({
                    id: item.id,
                  });
                });
                todoListElement.appendChild(todoItemElement);
            });
            render(todoListElement, containerElement);
            totalTasksElement.textContent = `${this.#todoListModel.getTotalCount()}`;
            completedTasksElement.textContent = `${this.#todoListModel.getCompletedCount()}`;
            incompleteTasksElement.textContent = `${this.#todoListModel.getIncompleteCount()}`;      
        });

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.#todoListModel.addTodo(
              new TodoItemModel({
                title: inputElement.value,
                completed: false,
              })
            );
            
            inputElement.value = "";
        });
    }
}