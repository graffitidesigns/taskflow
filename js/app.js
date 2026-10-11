const tasks = [
    {
        id: 1, 
        title: "Finish dashboard layout",
        description: "Complete the initial desktop layout for the TaskFlow dashboard.",
        status: "todo", 
        priority: "high", 
        expectedDate: "2026-10-12", 
        createdDate: "2026-10-09", 
        archived: false, 
        actualCompletedDate: null
    },

    {
        id: 2,
        title: "Add js to dashboard",
        description: "Add js to the task cards for TaskFlow ",
        status: "in-progress",
        priority: "medium",
        expectedDate: "2026-10-12",
        createdDate: "2026-10-09",
        archived: false,
        actualCompletedDate: null
    },

    {
        id: 3,
        title: "Add CSS to dashboard",
        description: "Add css to the html of the TaskFlow dashboard layout",
        status: "review",
        priority: "low",
        expectedDate: "2026-10-12",
        createdDate: "2026-10-09",
        archived: false,
        actualCompletedDate: null
    }
];

/*tasks.forEach(function(task) {
    console.log(task);
});

console.log(tasks[0]);*/

/*const todoTaskList = document.querySelector('[data-status="todo"] .task-list');
const taskCard = document.createElement("details");
const taskSummary = document.createElement("summary");

taskCard.classList.add("task-card");
todoTaskList.append(taskCard);

taskSummary.textContent = tasks[0].title;
taskCard.append(taskSummary);

console.log(taskCard);*/

function renderTask(task){
    const taskList = document.querySelector(`[data-status="${task.status}"] .task-list`);
    const taskCard = document.createElement("details");
    const taskSummary = document.createElement("summary");
    taskCard.classList.add("task-card");

    taskSummary.textContent = task.title;
    taskCard.append(taskSummary);
    taskList.append(taskCard);
    console.log(taskCard);
}

tasks.forEach(function(task) {
    renderTask(task);
});

/*const todoTasks = tasks.filter(function(task) {
    return task.status === "todo";
    
});
console.log(todoTasks);
console.log(todoTasks.length);*/

function countTasks(status){
    const filteredTasks = tasks.filter(function(task){
        return task.status === status;
    });
    return filteredTasks.length;
}

console.log(countTasks("completed"));

function updateTaskCount(status) {
    const countedTasks = document.querySelector(
        `[data-status="${status}"] .task-count`
    );
    countedTasks.textContent = countTasks(status);

}
updateTaskCount("in-progress");
