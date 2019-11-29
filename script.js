// Array storing all tags with class description
var descriptionTags = $(".description");

window.onload = function() {  

    // Set the current day using moment.js when the window loads
    var date = moment().format('dddd') + ", " + moment().format('MMMM') + " " + moment().format('Do');
    $("#currentDay").text(date);

    //calling updatePassedTime() to check and update the background color of all the time blocks
    updatePassedTime();

    //calling fillTasks() to read the planned tasks from local storage and display in the time blocks
    fillTasks();
}

// Setting interval to check and update the passed time, current time and remaining time every 5 minutes
var interval = setInterval(updatePassedTime, 300000);        

// Function to check the time of all the time blocks and update the background color of their textarea to indicate if that time block has already passed, is currently active or will be in the future.
function updatePassedTime() {

    // Moment object storing the current time
    var currentTime = moment();

    for(var i=0; i< descriptionTags.length; i++) {

        var hour = descriptionTags[i].getAttribute("data-time");
        var tagHour = hour + ":00:00";
        var nextTagHour = (parseInt(hour) + 1) + ":00:00";

        // Moment object storing the time contained in the time block tag
        var tagTime = moment(tagHour, 'hh:mm:ss');          
        // Moment object storing the time contained in the next time block tag   
        var nextTagTime = moment(nextTagHour, 'hh:mm:ss');

        if(currentTime.isBetween(tagTime, nextTagTime)) {
            descriptionTags[i].setAttribute("class", "present");
        }
        else if(currentTime.isAfter(tagTime)) {
            descriptionTags[i].setAttribute("class", "past");
        }
        else {
            descriptionTags[i].setAttribute("class", "future");
        }
    }
}

$(".saveBtn").on("click", function() {
    // Variable storing the time attribute value corresponding to the clicked save button
    var time = $(this).attr("data-time");

    // Variable storing the planned tasks read from local storage 
    var plannerTasks = JSON.parse(localStorage.getItem("plannerTasks"));

    var plannedTaskList = plannerTasks.tasks;

    for(var i=0; i< descriptionTags.length; i++) {
        if(descriptionTags[i].getAttribute("data-time") === time) {
            // Object storing the planned task along with its time
            var task = {
                "time" : time,
                "task": descriptionTags[i].value
            };
            if(plannedTaskList === null) {
                plannedTaskList = [];                 //If the task list is undefined, then create empty array
            }                                      
            else {
                for(var index=0; index<plannedTaskList.length; index++) {
                    if(plannedTaskList[index].time === time) {
                        plannedTaskList.splice(index,1);        //Remove previous task if task at that time already exists in local storage
                        break;
                    }
                }
            }
            plannedTaskList.push(task);                     //Push the saved task to the local storage object
        }
    }
    plannerTasks.tasks = plannedTaskList;
    localStorage.setItem("plannerTasks", JSON.stringify(plannerTasks));  //Write the planned tasks to local storage
});

function fillTasks() {

    //calling checkIfNewDay() to check if it is a new day and empty the planned tasks stored in local storage
    checkIfNewDay();

    // Variable storing the planned tasks read from local storage 
    var plannerTasks = JSON.parse(localStorage.getItem("plannerTasks"));
    var plannedTaskList = plannerTasks.tasks;

    for(var i=0; i< descriptionTags.length; i++) {  //iterating the list of all textarea tags
        //variable storing the time attribute value corresponding to each textarea
        var time = descriptionTags[i].getAttribute("data-time");

        for(var index=0; index<plannedTaskList.length; index++) {
            if(plannedTaskList[index].time === time) {                  
                descriptionTags[i].value = plannedTaskList[index].task; //read from the planned task stored in local storage and update the task in textarea
                break;
            }
        }
    }
}

function checkIfNewDay() {
    var planner = {
        day: $("#currentDay").text(),
        tasks: []
    }
    // Variable storing the planned tasks read from local storage 
    var plannerTasks = JSON.parse(localStorage.getItem("plannerTasks"));

    if(plannerTasks === null) {
        localStorage.setItem("plannerTasks", JSON.stringify(planner));  //Write the initial planner object with day and empty task list to local storage
    }
    else {                                                             //Planner object in local storage is not empty
        if(plannerTasks.day !== $("#currentDay").text()) {             //If the local storage is storing tasks from a different day than the current day, then reinitialize with initial planner object with current date and empty task list
            localStorage.setItem("plannerTasks", JSON.stringify(planner));
        }
    }
}