let todoIdx = 0;

export class TodoItemModel {
    id;
    title;
    isCompleted;

    constructor({ title, isCompleted }) {
        this.id = todoIdx++;
        this.title = title;
        this.isCompleted = isCompleted;
    }
}