$(function(){

  $("ul").on("click", "button", function(e) {
    var $this = $(this);
    var selected = $this.hasClass("purchased");
    var deleted = $this.hasClass("delete");

    if (selected) {
      $this.prev().addClass("checked");
      $this.text("Delete")
          .removeClass("purchased")
          .addClass("delete");

      var $moveItem = $this.prev().detach();
      var $moveBtn = $this.detach();
      $moveItem.appendTo("#checked-products");
      $moveBtn.appendTo("#checked-products");

      updateAmount();
    }
    if (deleted) {
      $this.prev().remove();
      $this.remove();
    }

  });

  $("#newItem").on("submit", function(e) {
    var inputText = $("input:text").val();
    var $productList = $("#current-products");
    e.preventDefault();
    $productList.append("<li class=\"product\">" + inputText + "</li>").hide()
               .append("<button type=\"button\" name=\"purchased\" class=\"purchased\">Check</button>").hide()
               .fadeIn(700);
    $("input:text").val("");
    updateAmount();
  });

  function updateAmount() {
    var amount = $("#current-products").children(".product").length;
    $("#amount").text(amount);
  }

});
