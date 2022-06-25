const form = document.getElementById('form-div')
var taskList = [];

window.addEventListener('load',function(){
    displayList();
})

form.addEventListener('submit',function(e){
    e.preventDefault();

    
    const title = form.elements['titletext'].value;
    const descr = form.elements['descrtext'].value;

    console.log({
        'title':title,
        'descr':descr,
    })
    var today = new Date();
    var date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
    var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    var dateTime = date + " , "+time;
    const taskObj = {
        title : title,
        createdAt : dateTime,
        descr : descr,
    }
    if(taskList == null){
        taskList = []
    }
    taskList.push(taskObj);

    localStorage.setItem('taskList',JSON.stringify(taskList));

    form.elements['titletext'].value = "";
    form.elements['descrtext'].value = "";
    
    displayList();
})

function displayList(){
    taskList = JSON.parse(localStorage.getItem('taskList'));

    const listElement = document.getElementById('listOfTasks');
    listElement.innerHTML = "";
    if(taskList != null){
    taskList.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskTitle = document.createElement("h2");
        taskTitle.innerText = task.title;

        const taskDate = document.createElement("p");
        taskDate.innerText = task.createdAt;
        
        const taskDescr = document.createElement("p");
        taskDescr.innerText = task.descr;

        const delBTn = document.createElement("button");
        delBTn.classList.add("del-btn");
        delBTn.innerText = "Delete";
        
        console.log({
            'title':taskTitle.innerText,
            'createdAt':taskDate.innerText,
            'descr':taskDescr.innerText,
        })

        delBTn.addEventListener('click',function(e){
            taskList = taskList.filter(temp => temp != task);
            localStorage.setItem('taskList',JSON.stringify(taskList));
            displayList();
        })
        taskElement.appendChild(taskTitle);
        taskElement.appendChild(taskDate);
        taskElement.appendChild(taskDescr);
        taskElement.appendChild(delBTn);

        listElement.appendChild(taskElement);

    })
    }
}