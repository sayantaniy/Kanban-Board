let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];
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

        columns.forEach(col=>{

            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");
            count.innerText = tasks.length;
        })
    })
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

// Modal related Logic

const toggleModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalbg = document.querySelector(".modal .bg");
const addTaskButton = document.querySelector('#add-task-btn');

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalbg.addEventListener("click", () => {
    modal.classList.remove("active");
});

addTaskButton.addEventListener("click", () => {
    
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;
    
    const div = document.createElement("div");
    div.classList.add('task');
    div.setAttribute('draggable', 'true');

    div.innerHTML = `<h3>${taskTitle}</h3>
                    <p> ${taskDesc} </p>
                    <button> Delete </button>
    `;

    div.addEventListener('drag', (e)=>{
        dragElement = div;
    })

    todo.appendChild(div);

    columns.forEach(col=>{

        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
        count.innerText = tasks.length;
    })
    
    modal.classList.remove("active");

});
