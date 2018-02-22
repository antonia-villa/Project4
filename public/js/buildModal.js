
// Build Main HTML structure for Changeable Modal
function buildModal(){
  html =  '<div class="modal fade" id ="myModal" role="dialog">';
  html += '<div class="modal-dialog">';
  html += '<div class="modal-content">';
  html += '<div class="modal-header">';
  html += '<a class="close" data-dismiss="modal">×</a>';
  html += '<h4 class="modal-title" id="modalHeaderText">';
  html += '</h4>';
  html += '<h4 class="modal-title" id="modalSubHeaderText">';
  html += '</h4>';
  html += '<h4 class="modal-title" id="modalSubHeaderText2">';
  html += '</h4>';
  html += '</div>';
  html += '<div class="modal-body" id="modalVisual">';
  html += '</div>'; 
  html += '</div>'; 
  html += '</div>'; 

  $('#d3_visual').append(html);
  $("#myModal").modal();
  $("#myModal").modal('hide');
  $('#modalHeaderText').text('School enrollment: by level');
  $('body').append('<div id="tooltip2" class="hidden"><p id="educaiton_status"></p></div>');
}


// Remove Modal and Data
function hideModal(){
  $(".modal").removeClass("in");
  $(".modal-backdrop").remove();
  $('body').removeClass('modal-open');
  $('body').css('padding-right', '');
  $("#myModal").remove();
}