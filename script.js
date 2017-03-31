$(function(){

  var tab = [];
  (function() {
    var elem = localStorage.length;
    if (elem !== 0) {
      var tabValue = JSON.parse(localStorage.getItem("product"));
      for (var j=0; j < tabValue.length; j++) {
        tab.push(tabValue[j]);
        addNewProduct(tabValue[j]);
      }
      updateAmount();
    }
  }());

  $("ul").on("click", "button", function(e) {
    var $this = $(this);
    var selected = $this.hasClass("purchased");
    var deleted = $this.hasClass("delete");

    if (selected) selectProduct($this);
    if (deleted) deleteProduct($this);
  });

  $("#newItem").on("submit", function(e) {
    var inputText = $("input:text").val();
    e.preventDefault();
    addNewProduct(inputText);
    tab.push(inputText);
    saveLocalStorage(JSON.stringify(tab));
    $("input:text").val("");
    updateAmount();
  });

  function addNewProduct(product) {
    var $productList = $("#current-products");
    $productList.append("<li class=\"product\">" + product + "</li>").hide()
               .append("<button type=\"button\" name=\"purchased\" class=\"purchased\">Check</button>").hide()
               .fadeIn(700);
  }

  function selectProduct($btnProduct) {
    $btnProduct.prev().addClass("checked");
    $btnProduct.text("Delete")
        .removeClass("purchased")
        .addClass("delete");

    var $moveItem = $btnProduct.prev().detach();
    var $moveBtn = $btnProduct.detach();
    $moveItem.appendTo("#checked-products");
    $moveBtn.appendTo("#checked-products");
    updateAmount();
  }

  function deleteProduct($btnProduct) {
    var $liProduct = $btnProduct.prev();
    $liProduct.remove();
    $btnProduct.remove();
    deleteLocalStorage($liProduct);
  }

  function updateAmount() {
    var amount = $("#current-products").children(".product").length;
    $("#amount").text(amount);
  }

  function saveLocalStorage(product) {
    if (window.localStorage) {
      localStorage.setItem("product", product);
    }
  }

  function deleteLocalStorage($liProduct) {
    var product = $liProduct.text();
    var i = tab.indexOf(product);
    if (i >= 0) {
    	tab.splice(i, 1);
    }
    saveLocalStorage(JSON.stringify(tab));
  }

});
