// || M O D E L:
//DOM connections:
const createNodeBtn = document.getElementById("createANoteBtn");
const edit = document.getElementById("editBtn");
const delet = document.getElementById("deleteBtn");
const clearAll = document.getElementById("clearAllBtn");
const saveMain = document.getElementById("saveBtn");
const saveEdited = document.getElementById("editedSaveBtn");
const mainTextArea = document.getElementById("mainTextarea");
const editTextArea = document.getElementById("editTextarea");
const editAreaDiv = document.getElementById("editAreaDiv");
const mainAreaDiv = document.getElementById("mainAreaDiv");
const nodeDisplay = document.getElementById("nodeDiv");
const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");

//Notes Class
class Note {
  constructor() {
    this.array = [];
  }

  saveNotesToLS = () => {
    localStorage.setItem("savedNodes", JSON.stringify(this.array));
  };

  getSavedNotesFromLS = () => {
    return JSON.parse(localStorage.getItem("savedNodes"));
  };

  displayCurNote = () => {
    let savedNotes = this.getSavedNotesFromLS();
    render(savedNotes[savedNotes.length - 1]);
  };

  displayFromLS = (index) => {
    let savedNotes = this.getSavedNotesFromLS();
    render(savedNotes[index]);
  };

  saveEditedNotes = (index, editedNote) => {
    this.array[index] = editedNote;
    this.saveNotesToLS();
  };

  deleteNote = () => {};
}

let notes = new Note();
let curIndex = 0;

//Initial Load
if (notes.getSavedNotesFromLS()) {
  curIndex = notes.getSavedNotesFromLS().length - 1;
  notes.displayFromLS(curIndex);
  for (let a = 0; a < notes.getSavedNotesFromLS().length; a++) {
    notes.array.push(notes.getSavedNotesFromLS()[a]);
  }
} else {
  createNode();
}

// || C O N T R O L L E R:
//'Create a note' button click
createNodeBtn.addEventListener("click", () => {
  createNode();
});

//'Save' button click
saveMain.addEventListener("click", () => {
  saveMainNotes();
});

//'Edit' button click
edit.addEventListener("click", () => {
  aditNotesBtn();
});

//'Save Edited' button click
saveEdited.addEventListener("click", () => {
  saveEditedNotes();
});

//'Delete' button click
delet.addEventListener("click", () => {
  deleteNote();
});

//'Clear All' button click
clearAll.addEventListener("click", () => {
  clearingAllNotes();
});

//'Arrow Left' button click
arrowLeft.addEventListener("click", () => {
  movingLeft();
});

//'Arrow Right' button click
arrowRight.addEventListener("click", () => {
  movingRight();
});

// || V I E W:
//Saving created notes
function saveMainNotes() {
  delet.style.display = "block";

  let aNode = mainTextArea.value;
  notes.array.push(aNode);
  notes.saveNotesToLS();
  curIndex = notes.getSavedNotesFromLS().length - 1;
  notes.displayCurNote();
}

//Editing existing notes
function aditNotesBtn() {
  editAreaDiv.style.visibility = "visible";
  mainAreaDiv.style.visibility = "hidden";
  arrowRight.style.display = "none";
  arrowLeft.style.display = "none";

  editTextArea.value = notes.getSavedNotesFromLS()[curIndex];
  console.log(notes.getSavedNotesFromLS()[curIndex]);
}

//Saving edited notes
function saveEditedNotes() {
  editAreaDiv.style.visibility = "hidden";
  mainAreaDiv.style.visibility = "visible";
  if (notes.getSavedNotesFromLS().length === 1) {
    arrowRight.style.display = "none";
    arrowLeft.style.display = "none";
  } else if (curIndex === 0) {
    arrowLeft.style.display = "none";
    arrowRight.style.display = "block";
  } else if (curIndex === notes.getSavedNotesFromLS().length - 1) {
    arrowRight.style.display = "none";
    arrowLeft.style.display = "block";
  } else {
    arrowRight.style.display = "block";
    arrowLeft.style.display = "block";
  }

  let editedNote = editTextArea.value;
  notes.saveEditedNotes(curIndex, editedNote);
  notes.displayFromLS(curIndex);
}

//deleting notes
function deleteNote() {
  let notesToDelete = notes.array;
  let leftNotes = notesToDelete.filter(
    (note) => note !== notesToDelete[curIndex]
  );
  if (leftNotes.length === 0) {
    createNode();
    notes.array = [];
    localStorage.removeItem("savedNodes");
  } else {
    notes.array = leftNotes;
    notes.saveNotesToLS();
    if (curIndex > notes.getSavedNotesFromLS().length - 1) {
      curIndex -= 1;
      notes.displayFromLS(curIndex);
    }
    notes.displayFromLS(curIndex);
  }
}

//Clearing all notes
function clearingAllNotes() {
  notes.array = [];
  localStorage.removeItem("savedNodes");
  createNode();
}

//Moving left to display previous notes
function movingLeft() {
  arrowRight.style.display = "block";
  if (curIndex > 0) {
    curIndex -= 1;
    notes.displayFromLS(curIndex);
    if (curIndex === 0) {
      arrowLeft.style.display = "none";
    }
  }
}

//Moving right to display forward notes
function movingRight() {
  if (curIndex < notes.getSavedNotesFromLS().length - 1) {
    curIndex += 1;
    notes.displayFromLS(curIndex);
    if (curIndex === notes.getSavedNotesFromLS().length - 1) {
      arrowRight.style.display = "none";
    }
  }
}

// Creating new note
function createNode() {
  edit.style.display = "none";
  delet.style.display = "none";
  nodeDisplay.style.display = "none";
  arrowLeft.style.display = "none";
  arrowRight.style.display = "none";
  saveMain.style.display = "block";
  mainTextArea.style.display = "block";
  mainTextArea.value = "";
}

//Rendering notes
function render(node) {
  if (notes.getSavedNotesFromLS().length > 1 && curIndex > 0) {
    arrowLeft.style.display = "block";
    if (curIndex === notes.getSavedNotesFromLS().length - 1) {
      arrowRight.style.display = "none";
    }
  } else if (curIndex === 0 && notes.getSavedNotesFromLS().length === 1) {
    arrowRight.style.display = "none";
    arrowLeft.style.display = "none";
  }

  edit.style.display = "inline-block";
  saveMain.style.display = "none";
  mainTextArea.style.display = "none";
  nodeDisplay.style.display = "grid";
  nodeDisplay.textContent = node;
}
