$(function () {
  loadRecipies();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#recipes").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updateSave").click(function () {
    var id = $("#updateId").val();
    var isUser = $("#updateTitle").val();
    var fullName = $("#updateBody").val();
    console.log(isUser, fullName)
    $.ajax({
      url: "https://retoolapi.dev/yMJB3q/userpayments/" + id,
      data: { isUser, fullName },
      method: "PUT",
      success: function (response) {
        console.log(response);
        loadRecipies();
        $("#updateModal").modal("hide");
      }
    });
  });
});
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get("https://retoolapi.dev/yMJB3q/userpayments/" + id, function (
    response
  ) {
    $("#updateId").val(response.id);
    $("#updateTitle").val(response.fullName);
    $("#updateBody").val(response.isUser);
    $("#updateModal").modal("show");
  });
}
function addRecipe() {
  var isUser = $("#title").val();
  var fullName = $("#body").val();
  $.ajax({
    url: "https://retoolapi.dev/yMJB3q/userpayments",
    method: "POST",
    data: { isUser, fullName },
    success: function (response) {
      console.log(response);
      $("#title").val("");
      $("#body").val("");
      loadRecipies();
      $("#addModal").modal("hide");
    }
  });
}
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://retoolapi.dev/yMJB3q/userpayments/" + id,
    method: "DELETE",
    success: function () {
      loadRecipies();
    }
  });
}
function loadRecipies() {
  $.ajax({
    url: "https://retoolapi.dev/yMJB3q/userpayments",
    method: "GET",
    error: function (response) {
      var recipes = $("#recipes");
      recipes.html("An Error has occured");
    },
    success: function (response) {
      console.log(response);
      var recipes = $("#recipes");
      recipes.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        if (true) {
          recipes.append(
            `<div class="recipe" data-id="${rec.id}"><h3>This used paid by (${rec.isUser})</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> ${rec.fullName}</p></div>`
          );
        }
       
        // recipes.append("<div><h3>" + rec.title + "</h3></div>");
      }
    }
  });
}
