//variables
const openAddNoteBox = document.querySelector(".addBtnBox__btn");
const addNoteBox = document.querySelector(".addNote");
const closeAddNoteBox = document.querySelector(".addNote-header__icon-close");
const closeEditNoteBox = document.querySelector(".editNote-header__icon-close");
const NotesContainer = document.querySelector(".Notes-list");
const colorBoxes = document.querySelectorAll(".add-box-color");
const colorBoxesEdit = document.querySelectorAll(".edit-box-color");
const NotesTotalBox = document.querySelector(".header-count__num");
const addFormSpace = document.querySelector(".addNote");
const editFormSpace = document.querySelector(".editNote");
const editNoteBox = document.querySelector(".editNote");
const searchBox = document.querySelector(".searchBox__input");



let totalNotesSession = 0;
let totalNotes = 0;
//localstorage
const checkLocalStorage = ()=>{  
    if(localStorage.getItem("Notes") === null) {
        return false;    
    }else{
        return true;
    }    
}

//localstorage -- get Notes
const getToLocalStorage=()=>{
    let Notes;
    if(checkLocalStorage()){
        Notes = JSON.parse(localStorage.getItem("Notes"));    
        for(let i=0;i<=Notes.length-1;i++){
            //Note structure
            const Note = `
                <div class="Note-item Note-${i} Note-${Notes[i][2]}">
                    <header class="Note-item__header">
                        <div class="Note-item__header-title">
                            <h4 class="Note-item__header-h4">
                                ${Notes[i][0]}
                            </h4>
                        </div>
                        <div class="Note-item__header-icon">
                            <i class="Note-item__header-icon__toggle fas fa-angle-up"></i>
                        </div>
                    </header>
                    <div class="Note-item-hidden">
                        <main class="Note-item__main">
                            <p class="Note-item__main-p">
                                ${Notes[i][1]}
                            </p>
                        </main>
                        <footer class="Note-item__footer">
                            <div class="Note-item__footer-date">
                                ${Notes[i][3]}
                            </div>
                            <div class="Note-item__footer-icons">
                                <i class="Note-item__footer-icon edit-icon fas fa-edit"></i>
                                <i class="Note-item__footer-icon delete-icon fas fa-trash"></i>
                            </div>
                        </footer>
                    </div>
                </div>
            `
            NotesContainer.innerHTML+=Note;
            totalNotes = Notes.length;
            totalNotesSession = Notes.length;
            NotesTotalBox.innerHTML = totalNotes
        }

    }
}

window.addEventListener("load",getToLocalStorage)

//localstorage -- add Note
const addToLocalStorage = (title,txt,color,hour)=>{
    let Notes;
    const Note = [title,txt,color,hour]
    if(checkLocalStorage()){
        Notes = JSON.parse(localStorage.getItem("Notes"));
    }
    else{
        Notes = [];
    }
    Notes.push(Note);
    localStorage.setItem("Notes", JSON.stringify(Notes));
}

//localstorage -- delete Note
const deleteToLocalStorage = index => {
    let Notes;
    if(checkLocalStorage()){
        Notes = JSON.parse(localStorage.getItem("Notes"));
        Notes.splice(index,1);
        localStorage.setItem("Notes", JSON.stringify(Notes));
        NotesContainer.innerHTML=""
        getToLocalStorage()
    }
}

//localstorage -- edit Note
const editToLocalStorage = (index,title,txt,color,hour) =>{
    const Note = [title,txt,color,hour]
    let Notes;
    let newNotes = [];
    if(checkLocalStorage()){
        Notes = JSON.parse(localStorage.getItem("Notes"));
        for(let i=0;i<Notes.length;i++){
            if(i==index){
                newNotes.push(Note);
            }
            else{
                newNotes.push(Notes[i]);
            }
        }
        localStorage.setItem("Notes", JSON.stringify(newNotes));
    }
}

//add new Note
const createNote = (title,txt,color) =>{

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

    //Note structure
    const Note = `
                <div class="Note-item Note-${totalNotesSession} Note-${color} ">
                    <header class="Note-item__header">
                        <div class="Note-item__header-title">
                            <h4 class="Note-item__header-h4">
                                ${title}
                            </h4>
                        </div>
                        <div class="Note-item__header-icon">
                            <i class="Note-item__header-icon__toggle fas fa-angle-up"></i>
                        </div>
                    </header>
                    <div class="Note-item-hidden">
                        <main class="Note-item__main">
                            <p class="Note-item__main-p">
                                ${txt}
                            </p>
                        </main>
                        <footer class="Note-item__footer">
                            <div class="Note-item__footer-date">
                                ${day}/${month}/${year} ${hour}:${minute}hs
                            </div>
                            <div class="Note-item__footer-icons">
                                <i class="Note-item__footer-icon edit-icon fas fa-edit"></i>
                                <i class="Note-item__footer-icon delete-icon fas fa-trash"></i>
                            </div>
                        </footer>
                    </div>
                </div>
            `
        
    NotesContainer.innerHTML += Note;
    addNoteBox.style.display = "none"
    totalNotesSession++
    totalNotes++
    NotesTotalBox.innerHTML = totalNotes;
    addToLocalStorage(title,txt,color,`${day}/${month}/${year} ${hour}:${minute}hs`)
    searchBox.value = "";
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

document.querySelector(".addNote-form-item.color-item").addEventListener("click",(e)=>{
    if(e.target.classList[0] === "box-color"){
        removeColorChoose()
        e.target.classList.add("color-choose")
    }
})

//geting values
document.querySelector(".addNote-form__btn-button").addEventListener("click",(e)=>{

    e.preventDefault()

    const title = document.querySelector(".addNote-form__input");
    const txt = document.querySelector(".addNote-form__textarea");
    const color = document.querySelector(".color-choose")?.classList[2]

    if(title.value !== "" && txt.value !== "" && color !== undefined){
        createNote(title.value,txt.value,color.slice(color.indexOf("-")+1))
        title.value = "";
        txt.value = "";
        document.querySelector(".color-choose").classList.remove("color-choose")
    }else{
        alert("Complete los campos")
    }
})


//open add form
openAddNoteBox.addEventListener("click",()=>{
    addNoteBox.style.display = "flex"
})
closeAddNoteBox.addEventListener("click",()=>{
    addNoteBox.style.display = "none"
    removeColorChoose()
})
addFormSpace?.addEventListener("click",(e)=>{
    if(e.target.classList[0]=="addNote"){
        addNoteBox.style.display = "none"
        removeColorChoose()
    }
})
//open text movile
NotesContainer.addEventListener("click",(e)=>{
    if(e.target.classList[0]==="Note-item__header"){
        const icon = e.target.firstElementChild.nextElementSibling.firstElementChild;
        icon.classList.toggle("activate")
        const textBox = e.target.nextElementSibling;
        textBox.classList.toggle("Note-item-hidden");
    }
})


//delete Note
NotesContainer.addEventListener("click",(e)=>{
    if(e.target.classList[1]==="delete-icon"){
        if(confirm("Estas seguro de borrarlo?")){
            const Note = e.target.parentElement.parentElement.parentElement.parentElement;
            const index = Note.classList[1].slice(Note.classList[1].indexOf("-")+1);
            deleteToLocalStorage(index);
            totalNotes = totalNotes - 1
            NotesTotalBox.innerHTML = totalNotes;
            Note.remove()
        }
    }
})

//edit Note
let NoteToEdit; 

const editNote = (title,txt,color) =>{
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


    const editNoteTitle = NoteToEdit.firstElementChild.firstElementChild.firstElementChild;
    const editNoteTxt = NoteToEdit.firstElementChild.nextElementSibling.firstElementChild.firstElementChild;
    const editNoteColor = NoteToEdit;
    const prevColor = NoteToEdit.classList[2].slice(NoteToEdit.classList[1].indexOf("-")+1)
    const editNoteHour = NoteToEdit.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild;

    editNoteTitle.innerHTML = title;
    editNoteTxt.innerHTML = txt;
    editNoteColor.classList.remove(`Note-${prevColor}`);
    editNoteColor.classList.add(`Note-${color}`);
    editNoteHour.innerHTML = `${day}/${month}/${year} ${hour}:${minute}hs`

    const index = NoteToEdit.classList[1].slice(NoteToEdit.classList[1].indexOf("-")+1)

    editToLocalStorage(index,title,txt,color,`${day}/${month}/${year} ${hour}:${minute}hs`)

    editNoteBox.style.display = "none"
}

document.querySelector(".editNote-form__btn-button")?.addEventListener("click",(e)=>{
    e.preventDefault()

    const title = document.querySelector(".editNote-form__input");
    const txt = document.querySelector(".editNote-form__textarea");
    const color = document.querySelector(".color-choose")?.classList[2];

    if(title.value !== "" && txt.value !== "" && color !== undefined){
        editNote(title.value,txt.value,color.slice(color.indexOf("-")+1))
        title.value = "";
        txt.value = "";
        document.querySelector(".color-choose").classList.remove("color-choose")
    }else{
        alert("Complete los campos")
    }
})

document.querySelector(".editNote-form-item.color-item").addEventListener("click",(e)=>{
    if(e.target.classList[0] === "box-color"){
        removeColorChooseEdit()
        e.target.classList.add("color-choose")
    }
})
closeEditNoteBox?.addEventListener("click",()=>{
    editNoteBox.style.display = "none"
    removeColorChoose()
})
editFormSpace?.addEventListener("click",(e)=>{
    if(e.target.classList[0]=="editNote"){
        editNoteBox.style.display = "none"
        removeColorChoose()
    }
})
NotesContainer.addEventListener("click",(e)=>{
    if(e.target.classList[1]==="edit-icon"){
        const NoteContainer = e.target.parentElement.parentElement.parentElement.parentElement;
        NoteToEdit =  NoteContainer;
        const title = NoteContainer.firstElementChild.firstElementChild.firstElementChild.textContent.trim();
        const txt = NoteContainer.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.textContent.trim()
        const color = NoteContainer.classList[2].slice(NoteContainer.classList[2].indexOf("-")+1);

        editNoteBox.style.display="flex"
        const editTitle = document.querySelector(".editNote-form__input");
        const editTxt = document.querySelector(".editNote-form__textarea");
        const editColor = document.querySelector(`.edit-box-color.color-${color}`);

        editTitle.value = title
        editTxt.value = txt
        editColor.classList.add("color-choose")
    }
})


//search
let typed = new String;
searchBox.addEventListener("keyup",(e)=>{
    typed = searchBox.value;
    for(let i=0; i<=totalNotes-1;i++){
        const Note = document.querySelector(`.Note-${i}`);
        const title = Note.firstElementChild.firstElementChild.firstElementChild.innerHTML.trim().toLocaleLowerCase();
        if(!title.includes(typed.toLocaleLowerCase())){
            Note.style.display="none"
        }
    }
    if(typed==""){
        for(let i=0; i<=totalNotes-1;i++){
            const Note = document.querySelector(`.Note-${i}`);
            Note.style.display="block"
        }
    }
    
})