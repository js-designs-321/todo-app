const express = require('express'); 
const port = 8000; 

//call "express" as a function
const app = express();                         

//indicating that we are using "ejs" as template
app.set('view engine','ejs'); 
app.set('views','./views'); 

//middleware
app.use(express.urlencoded()); 

//adding static files
app.use(express.static('assets')); 


var taskList = [{
        task:"WOW!! NO WORK TO DO",
        priority:"4",
        deadline:"NO DEADLINE"
    }
]

var completedTaskList = [{
    task:"TASKS COMPLETED",
    priority:"4",
    deadline:"NO DEADLINE"
}]

//rendering home
app.get('/',function(req,res){
    return res.render('home',{
        title : 'TODO APP',
        task_list : taskList,
        completed_task_list : completedTaskList
    });
})

//mark task as done 
app.get('/mark-as-done',function(req,res){
    let task = req.query.task; 
    let taskIndex = taskList.findIndex(i => i.task == task); 
    if(taskIndex != -1){
        completedTaskList.push(taskList[taskIndex]);
        taskList.splice(taskIndex,1);
    }
    return res.redirect('back'); 
})

//delete task 
app.get('/delete-task',function(req,res){
    let task = req.query.task; 
    let taskIndex = completedTaskList.findIndex(i => i.task == task); 
    if(taskIndex != -1){
        completedTaskList.splice(taskIndex,1); 
    }
    return res.redirect('back'); 
})

//add new task
app.post('/add-task',function(req,res){
    var Deadline = "NO DEADLINE"; 
    if(req.body.deadline != ""){
        Deadline = req.body.deadline; 
    }
    taskList.push({
        task:req.body.task,
        priority:req.body.priority,
        deadline: Deadline
    });
    console.log(taskList);
    res.redirect('back');
})

//listening to request nad responding back to it
app.listen(port,function(err){
    if(err){
        console.log("Error",err); 
        return; 
    }
    console.log("Server is up and running on port : ",port);
})