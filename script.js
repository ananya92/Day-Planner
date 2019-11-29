// Array storing all tags with class description
var descriptionTags = $(".description");

window.onload = function() {  

    // Set the current day using moment.js when the window loads
    var time = moment().format('dddd') + ", " + moment().format('MMMM') + " " + moment().format('Do');
    $("#currentDay").text(time);

    //calling updatePassedTime() to check and update the background color of all the time blocks
    updatePassedTime();
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

    // Variable storing the planned tasks array along with their time slots read from local storage 
    var plannedTaskList = JSON.parse(localStorage.getItem("plannedTasks"));

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
    localStorage.setItem("plannedTasks", JSON.stringify(plannedTaskList));  //Write the planned tasks to local storage
});