let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];
let dragElement = null;

function addTask(title,desc,column){

    const div = document.createElement("div");
    div.classList.add('task');
    div.setAttribute('draggable', 'true');
    div.innerHTML = `<h3>${title}</h3>
                    <p> ${desc} </p>
                    <button class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                    </button>

    `;
    column.appendChild(div);
    div.addEventListener('drag', (e)=>{
        dragElement = div;
    })

    //delete task
const deleteTask = div.querySelector('button');
deleteTask.addEventListener('click', (e)=>{
    div.remove();
    updateTaskCount();
})

    return div;
}





function updateTaskCount() {
    columns.forEach(col=>{

        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        tasksData[col.id] = Array.from(tasks).map(task => {  //Dynamic obj key tasksData[todo]
            return {
                title: task.querySelector("h3").innerText,
                description: task.querySelector("p").innerText
            }
        })
        localStorage.setItem("tasks", JSON.stringify(tasksData));

        count.innerText = `Count : ${tasks.length}`;
    })
}


if(localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks")) || {};  //returns an object hence for in loop
    console.log(data); //logs an object

    for(const key in data){
        const column = document.querySelector(`#${key}`);  //here key is todo,progress,done

        data[key].forEach(task => {
            addTask(task.title,task.description,column);
        })

        updateTaskCount();
        
        
    }
}
 

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

        

        column.appendChild(dragElement);
        column.classList.remove("hover-over");

       updateTaskCount();
       
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

// Adding Task
addTaskButton.addEventListener("click", () => {
    
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;
    
    addTask(taskTitle, taskDesc, todo);  //new added task is added to first column ToDo


    // Save to local storage
    updateTaskCount();
    
    modal.classList.remove("active");

});
