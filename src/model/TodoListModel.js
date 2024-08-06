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
      return this.#items.filter(todo => todo.completed).length;
    }
  
    getIncompleteCount() {
      return this.#items.filter(todo => !todo.completed).length;
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
    
    updateTodo({ id, completed }) {
        const todoItem = this.#items.find(todo => todo.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.completed = completed;
        
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