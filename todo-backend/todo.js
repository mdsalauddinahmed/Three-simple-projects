const fs= require('fs');

const filePath = "./tasks.json";


//load task

const LoadTask=()=>{
    try{
        const dataBuffer= fs.readFileSync(filePath);
        const dataJson= dataBuffer.toString();
        return JSON.parse(dataJson);

    }catch(error){
      
        return [];
    }
}

const saveTasks=(tasks)=>{
   const datajson= JSON.stringify(tasks);
   fs.writeFileSync(filePath,datajson);
}


// add task

const addTask=(task)=>{
   const tasks = LoadTask()
   tasks.push({task})
   saveTasks(tasks)
   console.log("Task added ", task)
}


// list task

const listTasks=()=>{
    const tasks=LoadTask();

    tasks.forEach((task,index) => {
        console.log(`${index+1} - ${task.task}`)
        
    });
}

// remove task
// Remove task
const removeTask = (index) => {
    const tasks = LoadTask();

    if (index <= 0 || index > tasks.length) {
        console.log("Invalid task number.");
        return;
    }

    const removed = tasks.splice(index - 1, 1);
    saveTasks(tasks);

    console.log(`Removed task: "${removed[0].task}"`);
};



const command = process.argv[2]
const argument= process.argv[3]


if (command ==="add"){
    addTask(argument);
} else if (command ==="list"){
    listTasks();
}else if(command === "remove"){
    removeTask(parseInt(argument));
}else{
    console.log("command not found")
}