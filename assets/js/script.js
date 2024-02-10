
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var startHour = 9;
  var endHour = 17;

  for(i = startHour; i <= endHour; i++){
    // Create hour block for hour i
    $(`<div id="hour-${i}" class="row time-block">`)
      // Create hour indicator
      .append($('<div class="col-2 col-md-1 hour text-center py-3">').text(((i - 1) % 12) + 1 + (Math.trunc((i-1)/12) ? "PM" : "AM")))
      // Create area for text to be entered
      .append('<textarea class="col-8 col-md-10 description" rows="3">')
      // Create button to save input
      .append($('<button class="btn saveBtn col-2 col-md-1" aria-label="save">')
        // create an icon for save button
        .append('<i class="fas fa-save" aria-hidden="true">'))
      // Add block to block container
      .appendTo('#hour-container');
  }
  
  $('.saveBtn').on('click', function () {
    localStorage.setItem(
      // Id of hour block
      $(this).parent().attr('id'),
      // Text being saved
      $(this).siblings('.description').val());
  })

  // Set hour block as past, present, or future
  $('.time-block').each(function(){
    var currentHour = dayjs().hour();
    var blockHour = $(this).attr('id').split('-')[1];
    
    if( blockHour < currentHour){
        $(this).addClass('past')
        .removeClass('present')
        .removeClass('future');
    }
    else if(blockHour > currentHour){
      $(this).addClass('future')
      .removeClass('present')
      .removeClass('past');
    } else {
      $(this).addClass('present')
      .removeClass('future')
      .removeClass('past');
    }
  });
  
  // Load content from local storage
  $('.time-block').each(function() {
    $(this).children('textarea').val(localStorage.getItem($(this).attr('id')))
  })

  // display the current date in the header of the page
  $('#currentDay').text(dayjs().format('dddd, MMMM, DD, YYYY'));
});
  