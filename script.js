/****
 * array which stores all tasks list
 *****/
let tasks =[];


/** Dynamic Elements fetch by their ids **/

const tasklist = document.getElementById('task-list');
const addTaskInput = document.getElementById('input-task');
const tasksCounter = document.getElementById('task-counter');
const addbutton = document.getElementById('add-button');

/*****************************************************************************************
 * Function : for add new task in the list . It creates new list item when new task created
 * ****************************************************************************************/

function addTaskToDOM(task){
    const li = document.createElement('li');

    /*Creating List element to whiich we add task name, 
    checkbox to know whether task is completed and delete option*/
    li.innerHTML=`
    <div>
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    </div>
    <i class="delete fa-solid fa-trash" data-id="${task.id}"></i>
    `;
    tasklist.append(li);
}

/*******************************************
 * Function to update the task list 
 * *****************************************/


function renderList(){
    tasklist.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;
};


/******************************************
 * Function to add new task in existing task list
 * *****************************************/


function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        return;
    }
}


/************************************************************************
 * function to delete the task which triggers on click of a delete button
 * ***********************************************************************/

function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return task.id != Number(taskId);
    })
    tasks=newTasks;
    renderList();
}


/***************************************************************
 * function to change the task complete status (True/False)
 * *************************************************************/


function toggleTask(taskId){
    const toggleTasks= tasks.filter(function(task){
        return task.id==Number(taskId)
    });
    if(toggleTasks.length>0){
        const currentTask = toggleTasks[0];
        currentTask.completed=!currentTask.completed;
        renderList();
        if(document.getElementById('uncompleted').style.color=='black'){
            renderUncompleteList();
        }
        else if(document.getElementById('completed').style.color=='black'){
            renderCompleteList();
        }
        return;
    }
}


/***********************************************************************************************************
 * Function to hide the add button when add task input box is empty and it will display when there is content 
 ************************************************************************************************************/

function hideadd(){
    if(addTaskInput.value!=""){
        addbutton.classList.replace('add-btn','add-button-active');
    }else{
        addbutton.classList.replace('add-button-active','add-btn');
    }
}


/******************************************************************
 * function to filter the uncompleted tasks 
 * ****************************************************************/

function renderUncompleteList(){
    tasklist.innerHTML='';
    const uncompleted_tasks = tasks.filter(function(task){
        return task.completed != true;
    })
    for(let i=0;i<uncompleted_tasks.length;i++){
        addTaskToDOM(uncompleted_tasks[i]);
    }
    tasksCounter.innerHTML=uncompleted_tasks.length;
}


/******************************************************************
 * function to filter the completed tasks 
 * ****************************************************************/


function renderCompleteList(){
    tasklist.innerHTML='';
    const completed_tasks = tasks.filter(function(task){
        return task.completed == true;
    })
    for(let i=0;i<completed_tasks.length;i++){
        addTaskToDOM(completed_tasks[i]);
    }
    tasksCounter.innerHTML=completed_tasks.length;
}


/******************************************************************
 * function to show all tasks 
 * ****************************************************************/

function completeAllTasks(){
    for(let i=0;i<tasks.length;i++){
        tasks[i].completed=true;
    }
    renderList();
}


/******************************************************************
 * function to delete all the completed tasks 
 * ****************************************************************/

function clearCompletedTasks(){
    const uncompletedTasksList = tasks.filter(function(task){
        return task.completed !=true;
    })
    tasks=uncompletedTasksList;
    renderList();
}


/***************************
 * function to add new task  
 * *************************/

function handleAddButton(){
    const text = addTaskInput.value;
    const task ={
        title : text,
        id : Date.now(),
        completed : false
    }
    addTaskInput.value="";
    addTask(task);
    hideadd();
}

/************************************************************************
 * function to handle click event listener for checkbox and delete button
 * **********************************************************************/

function handleClickListener(e){
    const target = e.target;
    if(target.className == 'delete fa-solid fa-trash'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className=='custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
    else if(target.id == 'uncompleted'){
        document.getElementById('all').style.color = 'grey';
        document.getElementById('completed').style.color = 'grey';
        document.getElementById('uncompleted').style.color = 'black';
        renderUncompleteList();
        return;
    }
    else if(target.id == 'all'){
        document.getElementById('all').style.color = 'black';
        document.getElementById('completed').style.color = 'grey';
        document.getElementById('uncompleted').style.color = 'grey';
        renderList();
        return;
    }
    else if(target.id == 'completed'){
        document.getElementById('all').style.color = 'grey';
        document.getElementById('completed').style.color = 'black';
        document.getElementById('uncompleted').style.color = 'grey';
        renderCompleteList();
        return;
    }
    else if(target.id == 'complete-all'){
        completeAllTasks();
        return;
    }
    else if(target.id =='clear-complete'){
        clearCompletedTasks();
        return;
    }
}

/************************************************
 * Function to add new task by pressing enter key 
 * **********************************************/

function handleInputKeypress (e) {    
    if( e.key === "Enter" ) {
        var text = e.target.value;
        console.log(text);
    }

    if(!text){
        return;            // return when add task input is empty
    }

    handleAddButton();
}

addbutton.addEventListener('click',handleAddButton);
addTaskInput.addEventListener('keyup',handleInputKeypress);
document.addEventListener('click',handleClickListener);