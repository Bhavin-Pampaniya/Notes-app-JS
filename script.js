console.log("notes app");
const addBtn = document.getElementById("add");
const section = document.querySelector('.addNote')

const updateData = () => {
    const textAreadata = document.querySelectorAll("#textarea");
    const notes = [];
    textAreadata.forEach((note) => {
        return notes.push(note.value)
    })
    console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNote = (text = "") => {
    const note = document.createElement('div');
    note.classList.add("note");
    // section.appendChild(note);
    const htmlData = `<div class="operations">
                        <button class="edit" ><i class="editicon fa-solid fa-pen-to-square"></i></button>
                        <button class="trash" ><i class="trashicon fa-solid fa-trash"></i></button>
                        </div>
                        <div class="main ${text ? "" : "hidden"}"></div>
                        <textarea id="textarea" class="${text ? "hidden" : ""}" ></textarea>`;

    // note.innerHTML = htmlData;
    note.insertAdjacentHTML("afterbegin", htmlData);

    const deleteNote = note.querySelector(".trash");
    const editNote = note.querySelector(".edit");
    const main = note.querySelector(".main");
    const textarea = note.querySelector("#textarea");

    deleteNote.addEventListener("click", () => {
        note.remove();
        updateData();

    })

    textarea.value = text;
    main.innerHTML = text;

    editNote.addEventListener("click", () => {
        if(textarea.value != ""){
        main.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
        }
    })

    textarea.addEventListener("change", (e) => {
        const value = e.target.value;
        main.innerHTML = value;
        updateData();
    })
    section.appendChild(note);

}

const notes = JSON.parse(localStorage.getItem("notes"));
if(notes){
    notes.forEach((note)=>addNote(note));
}

addBtn.addEventListener("click", () => addNote());
