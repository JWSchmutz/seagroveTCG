$(document).ready(function() {
  $("#creators-table").DataTable({
    paging: false,
    searching: false
  });
});

function copyDiscountCode(code) {
  var textArea = document.createElement("textarea");
  textArea.value = code;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();
}
