import { element } from "./html-util.js";

export class TodoItemView {
    createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
        const todoItemElement = element`
        <li class="todo-item ${todoItem.completed ? 'completed' : ''}">
        <input type="checkbox" class="checkbox" ${todoItem.completed ? 'checked' : ''}>
        <span class="todo-item-title">${todoItem.title}</span>
        <button class="todo-item-btn delete">削除</button>
        </li>`;

        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
            onUpdateTodo({
                id: todoItem.id,
                completed: !todoItem.completed
            });
        });
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener("click", () => {
            onDeleteTodo({
                id: todoItem.id
            });
        });
        return todoItemElement;
    }
}