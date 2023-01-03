console.log("notes app");
const addBtn = document.getElementById("add");
const section = document.querySelector('.addNote')

const updateData = () => {
    // const textAreadata = document.querySelectorAll("#textarea");
    // const title = document.querySelectorAll("#title");
    const noteData = document.querySelectorAll(".note"); 
    const notes = [];
    // const notesObj ={};
    // title.forEach((note) => {
    //     notesObj.title = note.value;
    // })
    // textAreadata.forEach((note) => {
    //     notesObj.textarea = note.value;
    // })

    noteData.forEach((note)=>{
        const notesObj = {};
        const title = note.querySelector("#title");
        const textAreadata = note.querySelector("#textarea");
        notesObj.title = title.value;
        notesObj.textarea = textAreadata.value;
        // notesObj.title = title.value;
        // notesObj.textarea = textAreadata.value;
        notes.push(notesObj);
    })
    

    console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNote = (text = "") => {
    const note = document.createElement('div');
    note.classList.add("note");
    // section.appendChild(note);
    const htmlData = `<div class="operations">
                        <div class="title ${text ? "" : "hidden"}"></div>
                        <input class="${text ? "hidden" : ""}" type="text" name="title" id="title" placeholder="Enter Title" >
                        <button class="edit" ><i class="editicon fa-solid fa-pen-to-square"></i></button>
                        <button class="trash" ><i class="trashicon fa-solid fa-trash"></i></button>
                        </div>
                        <div class="main ${text ? "" : "hidden"}"></div>
                        <textarea placeholder="Enter Note" id="textarea" class="${text ? "hidden" : ""}" ></textarea>`;

    // note.innerHTML = htmlData;
    note.insertAdjacentHTML("afterbegin", htmlData);

    const deleteNote = note.querySelector(".trash");
    const editNote = note.querySelector(".edit");
    const main = note.querySelector(".main");
    const showTitle = note.querySelector(".title");
    const textarea = note.querySelector("#textarea");
    const title = note.querySelector("#title");

    deleteNote.addEventListener("click", () => {
        note.remove();
        updateData();

    })

    if(text !=""){
    textarea.value = text.textarea;
    main.innerHTML = text.textarea;
    title.value = text.title;
    showTitle.innerHTML = text.title;
    }

    editNote.addEventListener("click", () => {
        if(textarea.value != "" && title.value != ""){
        showTitle.classList.toggle("hidden");
        title.classList.toggle("hidden");
        main.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
        }
    })

    textarea.addEventListener("change", (e) => {
        const value = e.target.value;
        main.innerHTML = value;
        updateData();
    })
    title.addEventListener("change", (e) => {
        const value = e.target.value;
        showTitle.innerHTML = value;
        updateData();
    })
    section.appendChild(note);

}

const notes = JSON.parse(localStorage.getItem("notes"));
console.log(notes);
if(notes){
    notes.forEach((note)=>{
        return addNote(note)
    });
}

addBtn.addEventListener("click", () => addNote());
