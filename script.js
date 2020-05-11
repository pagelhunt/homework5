
var plannerText = [];
$("#currentDay").text(moment().format('LL'));

var twelveTime =["9-AM","10-AM","11-AM","12-PM","1-PM","2-PM","3-PM","4-PM","5-PM","6-PM"];
var milTime =[9,10,11,12,13,14,15,16,17,18];
var currentHour = moment().format('LT');

for ( var i = 0; i < twelveTime.length; i++){

    var tableRow =$("<tr>");
 
    //time data Time
    var tableDataTime = $("<td>");
    tableDataTime.addClass("hour");
    tableDataTime.text(twelveTime[i]);

    // event data event
    var tableDataEvent =$("<td>");
    var textInput = $("<textarea>");
    textInput.attr("data-event",milTime[i]);
    textInput.attr("id", twelveTime[i]);
    textInput.addClass("row textArea");

    tableDataEvent.append(textInput);
   
    // check current hour 
    var currentDayTime =parseInt(moment().format("HH") );
    if (currentDayTime === milTime[i] )
    {
        textInput.addClass("bg-danger");
    } else if (currentDayTime > milTime[i])
    {
        textInput.addClass("bg-secondary");
    } else {
        textInput.addClass("bg-success");
    }

    var tableSaveBtn =$("<td>");
    var saveBtn = $("<button>");
    saveBtn.attr("eventID",twelveTime[i]);
    saveBtn.addClass("btn btn-primary saveBtn");
    tableSaveBtn.append(saveBtn);
    
   //append table elements
   tableRow.append(tableDataTime,tableDataEvent,tableSaveBtn);
    $("#tableRows").append(tableRow);
}

// save to local storage f
$('.saveBtn').on("click", function()
    {
    var valueID = $(this).data('eventID');
    var tableText =$("#" + valueID).val();

    plannerText.push({valueID,tableText});
    localStorage.setItem("plannerText", JSON.stringify(plannerText));
    console.log(tableText)
});

function renderEvent (value){
   if( value){
    $("#"+value.valueID).text(value.tableText);
   }
}

$(document).ready(function()
{
    plannerText = JSON.parse(localStorage.getItem("Data")) ;
    if (plannerText === null){
        plannerText = [];
    }
      for (var j = 0; j < plannerText.length; j++){
        renderEvent(plannerText[j]);
    }
});