var form = document.getElementById("form-age-calculator");
var fields = ['day', 'month', 'year']
var current_date = new Date();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  var error_indicator = 0;

  for(let field of fields) {
    let current_input = document.getElementById(field);

    if(!document.getElementById(field).value){

      if(current_input.parentNode.children.length < 3) {
        let error_span = document.createElement('span');
        error_span.appendChild(document.createTextNode('This field is required'));
        error_span.classList.add('error');
        current_input.parentNode.appendChild(error_span);
      }

      error_indicator += 1;
    } else {
      if(document.getElementById(field).classList.contains('error')){
        
        if(current_input.parentNode.children.length == 3) 
          current_input.parentNode.lastChild.remove();
      }
    }
  }

  if(error_indicator > 0){
    pain_label_input_danger();
    error_indicator = 0;
    return;
  }

  var day   = parseInt(e.target.day.value);
  var month = parseInt(e.target.month.value);
  var year  = parseInt(e.target.year.value);

  var current_day   = current_date.getDate();
  var current_month = current_date.getMonth() + 1;
  var current_year  = current_date.getFullYear();

  var day_input   = document.getElementById('day');
  var month_input = document.getElementById('month');
  var year_input  = document.getElementById('year');


  error_indicator += minmax_validation(day, day_input, 'Must be a valid day', 1, 31);
  error_indicator += minmax_validation(month, month_input, 'Must be a valid month', 1, 12);
  
  if(month <= 7 ? (day < 1 || day > (month % 2 == 0 && month != 2 ? 30 : ( month == 2 ? 29 : 31))) : (day < 1 || day > (month % 2 != 0 ? 30 : 31))){
    pain_label_input_danger();

    if(day_input.parentNode.children.length < 3) {
      let error_span = document.createElement('span');
      error_span.appendChild(document.createTextNode('Must be a valid date'));
      error_span.classList.add('error');
      day_input.parentNode.appendChild(error_span);
    } else {
      day_input.parentNode.lastChild.innerHTML = 'Must be a valid date';
    }

    error_indicator += 1;
  } else {
    if (day_input.parentNode.children.length == 3) {
      day_input.parentNode.lastChild.remove();
    }
  }

  if(year > current_year){
    pain_label_input_danger();

    if(year_input.parentNode.children.length < 3) {
      let error_span = document.createElement('span');
      error_span.appendChild(document.createTextNode('Must be in the past'));
      error_span.classList.add('error');
      year_input.parentNode.appendChild(error_span);
    } else {
      year_input.parentNode.lastChild.innerHTML = 'Must be in the past';
    }

    error_indicator += 1;
  } else {
    if (year_input.parentNode.children.length == 3) {
      year_input.parentNode.lastChild.remove();
    }
  }

  if(error_indicator > 0){
    pain_label_input_danger();
    error_indicator = 0;
    return;
  }

  fields.forEach(field => {
    if(document.getElementById(field).classList.contains('error')){
      document.querySelector(`label[for|="${field}"]`).classList.remove('error');
  
      let current_input = document.getElementById(field);
      current_input.classList.remove('error');
    }
  });

  let day_to_display   = current_day - day;
  let month_to_display = current_month - month;
  let year_to_display  = current_year - year;

  if(month_to_display < 0) {
    year_to_display--;
    month_to_display += 12;
  }

  if(day_to_display < 0) {
    let old_month = month_to_display;

    month_to_display--;
    day_to_display = (old_month <= 7 ? (old_month % 2 == 0 && old_month != 2 ? 30 : ( old_month == 2 ? 29 : 31)) : (old_month % 2 != 0 ? 30 : 31)) + day_to_display;
  }

  document.getElementById('display-days').innerHTML   = day_to_display;
  document.getElementById('display-months').innerHTML = month_to_display;
  document.getElementById('display-years').innerHTML  = year_to_display; 

}, true);


function minmax_validation( value, input, message, min, max) {
  if(value < min || value > max) {

    if(input.parentNode.children.length < 3) {
      let error_span = document.createElement('span');
      error_span.appendChild(document.createTextNode(message));
      error_span.classList.add('error');
      input.parentNode.appendChild(error_span);
    } else {
      input.parentNode.lastChild.innerHTML = message;
    }

    return 1;
  } 

  if (input.parentNode.children.length == 3) {
    input.parentNode.lastChild.remove();
  }
  
  return 0;
}

function pain_label_input_danger() {
  for(let field of fields) {

    if(!document.getElementById(field).classList.contains('error')){
     
      document.querySelector(`label[for|="${field}"]`).classList.add('error');

      let current_input = document.getElementById(field);
      current_input.classList.add('error');
    } 
  }

  document.getElementById('display-days').innerHTML   = "--";
  document.getElementById('display-months').innerHTML = "--";
  document.getElementById('display-years').innerHTML  = "--"; 
}