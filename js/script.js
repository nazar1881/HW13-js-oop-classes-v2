   class TodoList {
    constructor(el) {
        this.todos = [];
        this.el = el;  
    }
    addTodo(todo) {
        this.todos.push(todo);
    }
    removeTodo(id) {
        this.todos = this.todos.filter((el) => {
            return el.id !== id;
        });
        let idList = document.querySelector(`[data-id="${id}"]`);
        idList.remove();
    }
    setTodos(todos) {
        this.todos = todos;
    }
    getTodos() {
        return this.todos;
    }
    changeStatus(id) {
        let index = this.todos.findIndex((el) => el.id === id);
        this.todos[index].status = !this.todos[index].status;
        let idList = document.querySelector(`[data-id="${id}"]`);
        idList.classList.toggle("done");
    }
    render() {
        let lis = '';
        for (let el of this.todos) {
            if (!el) {
                return;
            }  
            lis += `<li class="not-done ${el.status ? "done" : "not-done"}" data-id="${el.id}">${el.value}<button class="set-status">Change status</button><button class="delete-task"></button></li>`;
        }
        this.el.innerHTML = lis;
    }

    findTasks(str) {
        let todos = this.getTodos();
        this.todos = this.todos.filter(todo => todo.value && todo.value.includes(str));
        this.render();
        this.setTodos(todos);
    }
}

class Task {
    constructor(value, status) {
        this.value = value;
        this.status = status;
        this.id = Math.random().toString(36).substr(2, 9);
    }
}

let input = document.getElementById('inputText');
let ul = document.getElementById('list');
let findLi = document.getElementById('find');
let createBtn = document.getElementById('createBtn');

let todo = new TodoList(ul);

createBtn.addEventListener('click', function () {
    todo.addTodo(new Task(input.value, false));
    todo.render();
    input.value = "";  
});

ul.addEventListener('click', (event) => {
    let e = event.target;
    let dataId = event.target.closest('[data-id]').dataset.id;
    if (e.className === 'set-status') {
        todo.changeStatus(dataId);
        
    } else if (e.className === 'delete-task') {
        todo.removeTodo(dataId);
    }
});

findLi.addEventListener('click', function () {
    todo.findTasks(input.value);
});