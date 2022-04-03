var carts = document.getElementsByClassName("buynow");
var namePro = document.getElementsByClassName("name_pro");
var price = document.getElementsByClassName("price");
// let product = [
//     {
//         name: namePro,
//         price: price,
//         incart: 0
//     },
// ]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        console.log("add to cart");
        let product = [
            {
                name: namePro.item(i).textContent,
                price: price.item(i).textContent.split(" ")[0],
                incart: 0
            },
        ]
        cartNumber(product[i]);
        totalCost(product[i]);
        onLoadCart();
    })
}

function onLoadCart() {
    let productNumber = localStorage.getItem('cartNumber');
    if (productNumber) {
        document.querySelector('.cart span').textContent = productNumber;
    }
}

function cartNumber(product){
    // console.log("the product click is",product)
    let productNumber = localStorage.getItem('cartNumber');
    productNumber = parseInt(productNumber);
    // console.log(productNumber);
    if (isNaN(productNumber)) {
        localStorage.setItem('cartNumber', 1); 
        document.querySelector('.cart span').textContent = 1;
    } else{
        localStorage.setItem('cartNumber', productNumber + 1);
        document.querySelectorAll('.basket').textContent = productNumber +1;
    }
    setItem(product);
}

function setItem(product) {
    console.log("my product is", product);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].incart += 1;
    } else {
        product.incart = 1;
        cartItems = {
            [product.name]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + parseInt(product.price));
    }else{
        localStorage.setItem("totalCost", parseInt(product.price));
    }
}

function displayCart(){
    let cartItem = localStorage.getItem("productsInCart");
    cartItem = JSON.parse(cartItem);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    // console.log(cartItem);
    if(cartItem && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItem).map(item => {
            productContainer.innerHTML += `
            <div class="product"> 
                <img src="../product/img/${item.name}.png" > 
                <span>${item.name}</span> 
            </div>    
            <div class="price">${item.price}</div>
            <div class="quantity"> 
                <span>${item.incart}</span>  
            </div>
            <div class="total">
                ${item.incart * item.price}
            </div>
            `  
        });
        
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Basket Total: 
            </h4>
            <h4 class="basketTotal">
                ${cartCost}
            </h4>
        </div>
        `

    }
    
}

onLoadCart();
displayCart();
