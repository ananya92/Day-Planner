window.onload = function() {  
    var time = moment().format('dddd') + ", " + moment().format('MMMM') + " " + moment().format('Do');
    $("#currentDay").text(time);
    
}
