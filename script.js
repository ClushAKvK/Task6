function newPrice() {
  let s = document.getElementsByName("productType");
  let select = s[0];
  let price = 0, prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) { price = prices.productTypes[priceIndex]; }
  count = document.getElementById('productCount').value;

  let checkDiv = document.getElementById("checkboxes");
  checkDiv.style.display = (select.value == "2" ? "block" : "none");

  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = (select.value == "3" ? "block" : "none");

  let priceProp = 0;
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      let propPrice = prices.productProperties[checkbox.name];
      if (propPrice !== undefined) {
        priceProp += propPrice;
      }
    }
  });

  let priceOption = 0;
  let radios = document.getElementsByName("productOptions");
  radios.forEach(function(radio) {
    if (radio.checked) {
      let optionPrice = prices.productOptions[radio.value];
      if (optionPrice !== undefined) {
        priceOption += optionPrice;
      }
    }
  });

  let productPrice = document.getElementById("productPrice");
  productPrice.innerHTML = price * count + (select.value == "3" ? priceOption : 0) + (select.value == "2" ? priceProp : 0) + " руб.";
}

window.addEventListener('DOMContentLoaded', function (event) {
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = "none";

  let s = document.getElementsByName("productType");
  let select = s[0];
  select.addEventListener("change", function(event) {
    let target = event.target;
    console.log(target.value);
    newPrice();
  });

  let radios = document.getElementsByName("productOptions");
  radios.forEach(function(radio) {
    radio.addEventListener("change", function(event) {
      let r = event.target;
      console.log(r.value);
      newPrice();
    });
  });

  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function(event) {
      let c = event.target;
      console.log(c.name);
      console.log(c.value);
      newPrice();
    });
  });

  let productCount = document.querySelectorAll("#productCount input");
  productCount.forEach(function(count) {
    count.addEventListener("change", function(event) {
      let d = event.target;
      console.log(d.value);
	  console.log(d.name);
      newPrice();
    });
  });

  newPrice();
});

function getPrices() {
  return {
    productTypes: [1000, 500000, 5000],
    productOptions: {
      option1: 1000,
      option2: 7000,
      option3: 10000,
    },
    productProperties: {
      prop1: 15000,
      prop2: 120000,
      prop3: 7000,
    }
  };
}
