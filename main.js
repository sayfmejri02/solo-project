// here var of phones to try with it
var phones = [
  {
    name: "iPhone 13",
    price: "$999",
    img: "https://www.ooredoo.tn/Personal/5141-large_default/portable-iphone-13-128go.jpg",
    details: "128GB, 5G, A15 Bionic chip"
  },
  
  {
    name: "Samsung Galaxy S21",
    price: "$799",
    img: "https://khadraouitek.tn/4615-large_default/smartphone-samsung-galaxy-s21-fe-5g-8g256g-noir.jpg",
    details: "256GB, 5G, Exynos 2100"
  },
  {
    name: "Google Pixel 6",
    price: "$599",
    img: "https://i5.walmartimages.com/seo/Google-Pixel-6-128GB-GB7N6-Factory-Unlocked-8GB-RAM-Smartphone-Sorta-Seafoam_04252aa4-00b0-4844-b803-3eaeb0fc7fc3.be79d2ebfaa3a0278b612c0bb2de2056.jpeg",
    details: "128GB, 5G, Google Tensor chip"
  }
]

var totalPrice = 0
// here to fixed the total price
function totalprice() {
  $('#total-price').text(totalPrice.toFixed(2))
}
//display the phones by append them , two buttons and the phone price ,name and details
function displayPhones() {
  for (let i = 0; i < phones.length; i++) {
    $('#phone-container').append(`
          <div class="phone-card">
              <img src="${phones[i].img}" alt="${phones[i].name}">
              <div class="phone-name">${phones[i].name}</div>
              <div class="phone-price">${phones[i].price}</div>
              <div class="phone-details" style="display:none;">${phones[i].details}</div>
              <button class="show-details-btn">Show Details</button>
              <button class="buy-now-btn" data-phone-index="${i}">Buy Now</button>
          </div>
      `)
  }

  
  //.siblings() return all sibling elements of each <li> element with class name 
  //slidetoggle to slide the details of phone up and down with one button 
  $('.show-details-btn').click(function () {
    $(this).siblings('.phone-details').slideToggle()
  })

  // here add to cart"panier"
  //the parseFloat() function parses a string argument and returns a floating point number
  //replace()that replace element with another
  //data()attach data to a <div> element, then retrieve the data
  $('.buy-now-btn').click(function () {
    var phoneIndex = $(this).data('phone-index')
    var phone = phones[phoneIndex]
    var phonePrice = parseFloat(phone.price.replace('$', ''))
    // append to the cart "panier"
    var cartItemHtml =( `
          <li>
              ${phone.name} - ${phone.price} 
              <button class="remove-from-cart-btn" data-phone-price="${phonePrice}">Remove</button>
          </li>
      `);
    $('#cart-items').append(cartItemHtml)
    // here the total price
    totalPrice += phonePrice
    totalprice()
    // here the button of remove when you the price smallest
    //.parent(): This selects the parent element of the current element (this). In the HTML structure, 
    // every element is nested inside a parent element, so .parent() grabs the direct parent of the element
    $('.remove-from-cart-btn').last().click(function () {
      var priceToRemove = parseFloat($(this).data('phone-price'))
      $(this).parent().remove()
      totalPrice -= priceToRemove
      totalprice()
    })
  })
}

// the function of click and alert and calculate the price
$('#buy-now-btn').click(function () {
  alert('Thank you for your purchase! Total: $' + totalPrice.toFixed(2))
  $('#cart-items').empty()
  totalPrice = 0
  totalprice()
})

displayPhones()


