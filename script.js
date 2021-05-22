//variables
const openAddTodoBox = document.querySelector(".addBtnBox__btn");
const addTodoBox = document.querySelector(".addTodo");
const closeAddTodoBox = document.querySelector(".addTodo-header__icon-close");
const closeEditTodoBox = document.querySelector(".editTodo-header__icon-close");
const todosContainer = document.querySelector(".todos-list");
const colorBoxes = document.querySelectorAll(".add-box-color");
const colorBoxesEdit = document.querySelectorAll(".edit-box-color");
const todosTotalBox = document.querySelector(".header-count__num");
const addFormSpace = document.querySelector(".addTodo");
const editFormSpace = document.querySelector(".editTodo");
const editTodoBox = document.querySelector(".editTodo");



let totalTodosSession = 0;
let totalTodos = 0;
//localstorage
const checkLocalStorage = ()=>{  
    if(localStorage.getItem("todos") === null) {
        return false;    
    }else{
        return true;
    }    
}

//localstorage -- get todos
const getToLocalStorage=()=>{
    let todos;
    if(checkLocalStorage()){
        todos = JSON.parse(localStorage.getItem("todos"));    
        for(let i=0;i<=todos.length-1;i++){
            //todo structure
            const todo = `
                <div class="todo-item todo-${i} todo-${todos[i][2]}">
                    <header class="todo-item__header">
                        <div class="todo-item__header-title">
                            <h4 class="todo-item__header-h4">
                                ${todos[i][0]}
                            </h4>
                        </div>
                        <div class="todo-item__header-icon">
                            <i class="todo-item__header-icon__toggle fas fa-angle-up"></i>
                        </div>
                    </header>
                    <div class="todo-item-hidden">
                        <main class="todo-item__main">
                            <p class="todo-item__main-p">
                                ${todos[i][1]}
                            </p>
                        </main>
                        <footer class="todo-item__footer">
                            <div class="todo-item__footer-date">
                                ${todos[i][3]}
                            </div>
                            <div class="todo-item__footer-icons">
                                <i class="todo-item__footer-icon edit-icon fas fa-edit"></i>
                                <i class="todo-item__footer-icon delete-icon fas fa-trash"></i>
                            </div>
                        </footer>
                    </div>
                </div>
            `
            todosContainer.innerHTML+=todo;
            totalTodos = todos.length;
            totalTodosSession = todos.length;
            todosTotalBox.innerHTML = totalTodos
        }

    }
}

window.addEventListener("load",getToLocalStorage)

//localstorage -- add todo
const addToLocalStorage = (title,txt,color,hour)=>{
    let todos;
    const todo = [title,txt,color,hour]
    if(checkLocalStorage()){
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    else{
        todos = [];
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//localstorage -- delete todo
const deleteToLocalStorage = index => {
    let todos;
    if(checkLocalStorage()){
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.splice(index,1);
        localStorage.setItem("todos", JSON.stringify(todos));
        todosContainer.innerHTML=""
        getToLocalStorage()
    }
}

//localstorage -- edit todo
const editToLocalStorage = (index,title,txt,color,hour) =>{
    const todo = [title,txt,color,hour]
    let todos;
    let newTodos = [];
    if(checkLocalStorage()){
        todos = JSON.parse(localStorage.getItem("todos"));
        for(let i=0;i<todos.length;i++){
            if(i==index){
                newTodos.push(todo);
            }
            else{
                newTodos.push(todos[i]);
            }
        }
        localStorage.setItem("todos", JSON.stringify(newTodos));
    }
}

//add new todo
const createTodo = (title,txt,color) =>{

    //create date
    const checkNumberDate = n => {
        if(n.toString().length==1){
            return `0${n}`
        }
        return n;
    }
    const data = new Date;
    const day = data.getDate();
    const month = checkNumberDate(data.getMonth()+1);
    const year = data.getFullYear();
    const hour = checkNumberDate(data.getHours());
    const minute = checkNumberDate(data.getMinutes());

    //todo structure
    const todo = `
                <div class="todo-item todo-${totalTodosSession} todo-${color} ">
                    <header class="todo-item__header">
                        <div class="todo-item__header-title">
                            <h4 class="todo-item__header-h4">
                                ${title}
                            </h4>
                        </div>
                        <div class="todo-item__header-icon">
                            <i class="todo-item__header-icon__toggle fas fa-angle-up"></i>
                        </div>
                    </header>
                    <div class="todo-item-hidden">
                        <main class="todo-item__main">
                            <p class="todo-item__main-p">
                                ${txt}
                            </p>
                        </main>
                        <footer class="todo-item__footer">
                            <div class="todo-item__footer-date">
                                ${day}/${month}/${year} ${hour}:${minute}hs
                            </div>
                            <div class="todo-item__footer-icons">
                                <i class="todo-item__footer-icon edit-icon fas fa-edit"></i>
                                <i class="todo-item__footer-icon delete-icon fas fa-trash"></i>
                            </div>
                        </footer>
                    </div>
                </div>
            `
        
    todosContainer.innerHTML += todo;
    addTodoBox.style.display = "none"
    totalTodosSession++
    totalTodos++
    todosTotalBox.innerHTML = totalTodos;
    addToLocalStorage(title,txt,color,`${day}/${month}/${year} ${hour}:${minute}hs`)
}


//deselect colors
const removeColorChoose = ()=>{
    for(let i = 0; i<colorBoxes.length; i++){
        colorBoxes[i].classList.remove("color-choose")
    }
}
const removeColorChooseEdit = ()=>{
    for(let i = 0; i<colorBoxesEdit.length; i++){
        colorBoxesEdit[i].classList.remove("color-choose")
    }
}

document.querySelector(".addTodo-form-item.color-item").addEventListener("click",(e)=>{
    if(e.target.classList[0] === "box-color"){
        removeColorChoose()
        e.target.classList.add("color-choose")
    }
})

//geting values
document.querySelector(".addTodo-form__btn-button").addEventListener("click",(e)=>{

    e.preventDefault()

    const title = document.querySelector(".addTodo-form__input");
    const txt = document.querySelector(".addTodo-form__textarea");
    const color = document.querySelector(".color-choose")?.classList[2]

    if(title.value !== "" && txt.value !== "" && color !== undefined){
        createTodo(title.value,txt.value,color.slice(color.indexOf("-")+1))
        title.value = "";
        txt.value = "";
        document.querySelector(".color-choose").classList.remove("color-choose")
    }else{
        alert("Complete los campos")
    }
})


//open add form
openAddTodoBox.addEventListener("click",()=>{
    addTodoBox.style.display = "flex"
})
closeAddTodoBox.addEventListener("click",()=>{
    addTodoBox.style.display = "none"
    removeColorChoose()
})
addFormSpace?.addEventListener("click",(e)=>{
    if(e.target.classList[0]=="addTodo"){
        addTodoBox.style.display = "none"
        removeColorChoose()
    }
})
//open text movile
todosContainer.addEventListener("click",(e)=>{
    if(e.target.classList[0]==="todo-item__header"){
        const icon = e.target.firstElementChild.nextElementSibling.firstElementChild;
        icon.classList.toggle("activate")
        const textBox = e.target.nextElementSibling;
        textBox.classList.toggle("todo-item-hidden");
    }
})


//delete todo
todosContainer.addEventListener("click",(e)=>{
    if(e.target.classList[1]==="delete-icon"){
        if(confirm("Estas seguro de borrarlo?")){
            const todo = e.target.parentElement.parentElement.parentElement.parentElement;
            const index = todo.classList[1].slice(todo.classList[1].indexOf("-")+1);
            deleteToLocalStorage(index);
            totalTodos--
            todosTotalBox.innerHTML = totalTodos;
            todo.remove()
        }
    }
})

//edit todo
let todoToEdit; 

const editTodo = (title,txt,color) =>{
    const checkNumberDate = n => {
        if(n.toString().length==1){
            return `0${n}`
        }
        return n;
    }
    const data = new Date;
    const day = data.getDate();
    const month = checkNumberDate(data.getMonth())+1;
    const year = data.getFullYear();
    const hour = checkNumberDate(data.getHours());
    const minute = checkNumberDate(data.getMinutes());


    const editTodoTitle = todoToEdit.firstElementChild.firstElementChild.firstElementChild;
    const editTodoTxt = todoToEdit.firstElementChild.nextElementSibling.firstElementChild.firstElementChild;
    const editTodoColor = todoToEdit;
    const prevColor = todoToEdit.classList[2].slice(todoToEdit.classList[1].indexOf("-")+1)
    const editTodoHour = todoToEdit.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild;

    editTodoTitle.innerHTML = title;
    editTodoTxt.innerHTML = txt;
    editTodoColor.classList.remove(`todo-${prevColor}`);
    editTodoColor.classList.add(`todo-${color}`);
    editTodoHour.innerHTML = `${day}/${month}/${year} ${hour}:${minute}hs`

    const index = todoToEdit.classList[1].slice(todoToEdit.classList[1].indexOf("-")+1)

    editToLocalStorage(index,title,txt,color,`${day}/${month}/${year} ${hour}:${minute}hs`)

    editTodoBox.style.display = "none"
}

document.querySelector(".editTodo-form__btn-button")?.addEventListener("click",(e)=>{
    e.preventDefault()

    const title = document.querySelector(".editTodo-form__input");
    const txt = document.querySelector(".editTodo-form__textarea");
    const color = document.querySelector(".color-choose")?.classList[2];

    if(title.value !== "" && txt.value !== "" && color !== undefined){
        editTodo(title.value,txt.value,color.slice(color.indexOf("-")+1))
        title.value = "";
        txt.value = "";
        document.querySelector(".color-choose").classList.remove("color-choose")
    }else{
        alert("Complete los campos")
    }
})

document.querySelector(".editTodo-form-item.color-item").addEventListener("click",(e)=>{
    if(e.target.classList[0] === "box-color"){
        removeColorChooseEdit()
        e.target.classList.add("color-choose")
    }
})
closeEditTodoBox?.addEventListener("click",()=>{
    editTodoBox.style.display = "none"
    removeColorChoose()
})
editFormSpace?.addEventListener("click",(e)=>{
    if(e.target.classList[0]=="editTodo"){
        editTodoBox.style.display = "none"
        removeColorChoose()
    }
})
todosContainer.addEventListener("click",(e)=>{
    if(e.target.classList[1]==="edit-icon"){
        const todoContainer = e.target.parentElement.parentElement.parentElement.parentElement;
        todoToEdit =  todoContainer;
        const title = todoContainer.firstElementChild.firstElementChild.firstElementChild.textContent.trim();
        const txt = todoContainer.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.textContent.trim()
        const color = todoContainer.classList[2].slice(todoContainer.classList[2].indexOf("-")+1);

        editTodoBox.style.display="flex"
        const editTitle = document.querySelector(".editTodo-form__input");
        const editTxt = document.querySelector(".editTodo-form__textarea");
        const editColor = document.querySelector(`.edit-box-color.color-${color}`);

        editTitle.value = title
        editTxt.value = txt
        editColor.classList.add("color-choose")
    }
})


//search
let typed = new String;
document.querySelector(".searchBox__input").addEventListener("keyup",(e)=>{
    typed = document.querySelector(".searchBox__input").value
    for(let i=0; i<=totalTodos-1;i++){
        const todo = document.querySelector(`.todo-${i}`);
        const title = todo.firstElementChild.firstElementChild.firstElementChild.innerHTML.trim().toLocaleLowerCase();
        if(!title.includes(typed.toLocaleLowerCase())){
            todo.style.display="none"
        }
    }
    if(typed==""){
        for(let i=0; i<=totalTodos-1;i++){
            const todo = document.querySelector(`.todo-${i}`);
            todo.style.display="block"
        }
    }
    
})