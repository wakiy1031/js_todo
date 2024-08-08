export class TodoListModel extends EventTarget {
    #items;

    constructor(items = []) {
      super();
      this.#items = items;
    }

    getTotalCount() {
      return this.#items.length;
    }

    getCompletedCount() {
      return this.#items.filter(todo => todo.isCompleted).length;
    }
  
    getIncompleteCount() {
      return this.#items.filter(todo => !todo.isCompleted).length;
    }
  
    getTodoItems() {
        return this.#items;
    }
    
    onChange(listener) {
        this.addEventListener("change", listener);
    }
    
    emitChange() {
        const event = new CustomEvent('change');
        this.dispatchEvent(event);
    }

    addTodo(todoItem) {
        this.#items.push(todoItem);
        this.emitChange();
    }

    editTodo({ id, title }) {
        const todoItem = this.#items.find(todo => todo.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.title = title;
        
        this.emitChange();
    }
    
    updateTodo({ id, isCompleted }) {
        const todoItem = this.#items.find(todo => todo.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.isCompleted = isCompleted;
        
        this.emitChange();
    }

    deleteTodo({ id }) {
        if(window.confirm("本当に削除してもよろしいですか？")){
          this.#items = this.#items.filter(todo => {
            return todo.id !== id;
          });
          this.emitChange();
        }
    }
}  