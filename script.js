const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const tasks = document.querySelectorAll(".task"); //creates an array which consists the tasks

tasks.forEach(task =>{   //goes to every element in tasks array
    task.addEventListener('drag',(e)=>{  //whenever a task is dragged

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
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

