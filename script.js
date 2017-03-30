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
      deleteLocalStorage(product); // to do
    }

  });

  $("#newItem").on("submit", function(e) {
    var inputText = $("input:text").val();
    e.preventDefault();
    addNewProduct(inputText);
    saveLocalStorage(inputText);
    $("input:text").val("");
    updateAmount();
  });

  function addNewProduct(product) {
    var $productList = $("#current-products");
    $productList.append("<li class=\"product\">" + product + "</li>").hide()
               .append("<button type=\"button\" name=\"purchased\" class=\"purchased\">Check</button>").hide()
               .fadeIn(700);
  }

  function updateAmount() {
    var amount = $("#current-products").children(".product").length;
    $("#amount").text(amount);
  }

  var i = 0;
  (function() {
    var elem = localStorage.length;
    if (elem !== 0) {
      for (var j=0; j < elem; j++) {
        addNewProduct(localStorage.getItem("product" + j));
      }
      updateAmount();
    }
  }());


  function saveLocalStorage(product) {
    if (window.localStorage) {
      localStorage.setItem("product"+ i, product);
      i++;
    }
  }

  function deleteLocalStorage(product) {
    localStorage.removeItem(product);
  }

});
