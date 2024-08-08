import { element } from "./html-util.js";

export class TodoItemView {
    createElement(todoItem, { onUpdateTodo, onDeleteTodo, onEditTodo }) {
        const todoItemElement = element`
        <li class="todo-item todo-actions ${todoItem.isCompleted ? 'completed' : ''}">
            <input type="checkbox" class="checkbox" ${todoItem.isCompleted ? 'checked' : ''}>
            <span class="todo-item-title">${todoItem.title}</span>
            <input type="text" class="edit-input" style="display:none;" required>
            <button class="todo-item-btn edit">編集</button>
            <button class="todo-item-btn delete">削除</button>
        </li>`;

        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        const titleElement = todoItemElement.querySelector(".todo-item-title");
        const inputElement = todoItemElement.querySelector(".edit-input");
        const editButtonElement = todoItemElement.querySelector(".edit");
        const deleteButtonElement = todoItemElement.querySelector(".delete");

        inputCheckboxElement.addEventListener("change", () => {
            onUpdateTodo({
                id: todoItem.id,
                isCompleted: !todoItem.isCompleted
            });
        });

        editButtonElement.addEventListener("click", () => {
            const isEditing = todoItemElement.classList.toggle("editing");
            if (isEditing) {
                titleElement.style.display = "none";
                inputElement.style.display = "inline";
                inputElement.value = todoItem.title;
                inputElement.focus();
                editButtonElement.textContent = "保存";
            } else {
                saveEdit();
            }
        });

        inputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                saveEdit();
            }
        });

        deleteButtonElement.addEventListener("click", () => {
            onDeleteTodo({
                id: todoItem.id
            });
        });

        function saveEdit() {
            const newTitle = inputElement.value.trim();
            if (newTitle) {
                onEditTodo({
                    id: todoItem.id,
                    title: newTitle
                });
                titleElement.textContent = newTitle;
            }
            titleElement.style.display = "inline";
            inputElement.style.display = "none";
            todoItemElement.classList.remove("editing");
            editButtonElement.textContent = "編集";
        }

        return todoItemElement;
    }
}