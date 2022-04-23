//Display current date and time to top of page
var today = moment();
$("#currentDay").text(today.format('llll'));

//--establishing variables--//

var inputArr = $('textarea').toArray();//text area converted to array; needed for save button
var index = 0;
var hourArr = $('.hour').toArray(); //puts hours of work scheduler into array (9am-5pm)
const currentHour = moment().format('HH');//current hour (live)
let currentEvent = ''; 
//parse for localstorage
var savedEvents = JSON.parse(localStorage.getItem('currentEvent')) || [];
var hour;



//for the hour Array, the current hour is checked with the designated hour slots
//depending on the time, 'past' 'present' and 'future' designations are applied
//see CSS style sheet for the class designations.
hourArr.forEach(function(hour, index) {

    //set hour into a hard number to compare to current time
    //think military time; added index to net values up to 17 
    hour = moment().hour(9).add(index,'hours').hours();

    
    textArea = inputArr[index];

    if (hour > currentHour) {
       $(textArea).removeClass('past');
       $(textArea).removeClass('present'); 
       $(textArea).addClass('future');
        
    } else if (hour < currentHour) {
        $(textArea).addClass('past');
        $(textArea).removeClass('present');
        $(textArea).removeClass('future');
        
    } else {
        $(textArea).removeClass('past');
        $(textArea).addClass('present');
        $(textArea).removeClass('future');
        
    }

})


//save button on right of screen
//the current task saved is paired with the index variable
$('.saveBtn').on("click", function () {
    index = $('.saveBtn').index(this);

    if (inputArr[index].value !== '') {
         currentEvent = {
            index: index,
            value: inputArr[index].value
         }
         
    } else {
       //nothing saved yields error
        console.log("No input received")
        }
    //saved to localstorage into string form, then stringified
    savedEvents.push(currentEvent);
    localStorage.setItem('currentEvent', JSON.stringify(savedEvents));
    }

)

//object value from user input is saved, allowing it to refresh at the corresponding time index, or slot
savedEvents.forEach(event =>{$(inputArr[event.index]).val(event.value)});
