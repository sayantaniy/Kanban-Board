const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
let dragElement = null;

const tasks = document.querySelectorAll(".task"); //creates an array which consists the tasks

tasks.forEach(task =>{   //goes to every element in tasks array
    task.addEventListener('drag',(e)=>{  //whenever a task is dragged
       dragElement = task;
    })
})

function addDragEventsOnColumn (column) {
    

    column.addEventListener('dragenter', (e)=>{ //event and event listener
        e.preventDefault();  //allow drop
        column.classList.add("hover-over");
    })

    column.addEventListener('dragleave', (e)=>{
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener('dragover', (e)=>{
        e.preventDefault(); //allow drop
        
    })

    column.addEventListener('drop', (e)=>{
        e.preventDefault();
        console.log("Dropped", dragElement, column);
        column.appendChild(dragElement);
        column.classList.remove("hover-over");
    })
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

// Modal related Logic

const toggleModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalbg = document.querySelector(".modal .bg");

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalbg.addEventListener("click", () => {
    modal.classList.remove("active");
});
