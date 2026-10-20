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

const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
    ];

const newTaskButton = document.querySelector(".new-proj-btn");
const taskDialog = document.querySelector(".task-dialog");
const cancelButton = document.querySelector(".cancel-btn");
const taskForm = document.querySelector(".task-form");
const taskColumns = document.querySelectorAll(".task-column");

function renderTask(task){
    const taskList = document.querySelector(`[data-status="${task.status}"] .task-list`);
    const taskCard = document.createElement("details");
    const taskSummary = document.createElement("summary");
    const taskDescription = document.createElement("p");
    const priorityContainer = document.createElement("div");
    const priorityLabel = document.createElement("p");
    const priorityType = document.createElement("p");
    const dateContainer = document.createElement("div");
    const dateLabel = document.createElement("p");
    const date = document.createElement("p");

    taskCard.classList.add("task-card");
    taskDescription.classList.add("description");
    priorityContainer.classList.add("priority");
    priorityType.classList.add("priority-type");
    dateContainer.classList.add("expected-date");
    date.classList.add("date");

    taskSummary.textContent = task.title;
    taskDescription.textContent = task.description;
    priorityLabel.textContent = "Priority:";
    priorityType.textContent = task.priority[0].toUpperCase() + task.priority.slice(1);
    dateLabel.textContent = "Expected:";

    if(task.expectedDate){
        const dateParts = task.expectedDate.split("-");
        const year = dateParts[0];
        const month = months[dateParts[1] - 1];
        const day = dateParts[2];

        date.textContent = `${month} ${day}, ${year}`;
    }else{
        date.textContent = "No Date";
    }

    priorityContainer.append(priorityLabel);
    priorityContainer.append(priorityType);
    dateContainer.append(dateLabel);
    dateContainer.append(date);
    taskCard.append(taskSummary);
    taskCard.append(taskDescription);
    taskCard.append(priorityContainer);
    taskCard.append(dateContainer);
    taskList.append(taskCard);

}

function countTasks(status){
    const filteredTasks = tasks.filter(function(task){
        return task.status === status;
    });
    return filteredTasks.length;
}

function updateTaskCount(status) {
    const countedTasks = document.querySelector(
        `[data-status="${status}"] .task-count`
    );
    countedTasks.textContent = countTasks(status);

}

tasks.forEach(function(task) {
    renderTask(task);
});

taskColumns.forEach(function(column) {
    
    updateTaskCount(column.dataset.status);
});

newTaskButton.addEventListener("click", function(){
    taskDialog.showModal();
});


cancelButton.addEventListener("click", function(){
    taskForm.reset();
    taskDialog.close();
});

taskForm.addEventListener("submit", function(event){

    event.preventDefault();

    const title = document.querySelector("#task-title").value;
    const description = document.querySelector("#task-description").value;
    const status = document.querySelector("#task-status").value;
    const priority = document.querySelector("#task-priority").value;
    const expectedDate = document.querySelector("#expected-date").value;

    const id = tasks.length + 1;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const createdDate = `${year}-${month}-${day}`;

    const newTask = {
        id,
        title,
        description,
        status,
        priority,
        expectedDate,
        createdDate,
        archived: false,
        actualCompletedDate: null
    };

    tasks.push(newTask);
    renderTask(newTask);
    updateTaskCount(status);

    taskForm.reset();
    taskDialog.close();
});