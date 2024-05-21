// YOUR NAME HERE

// === constants ===
const MAX_QTY = 9;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";

// === global variables  ===
// the total cost of selected products 
var total = 0;



// function called when page is loaded, it performs initializations 
var init = function () {//hya fonction main li bch nadi fiha les fcts
	createShop();
	filter();
	addQuantity();
	// TODO : add other initializations to achieve if you think it is required
}
window.addEventListener("load", init);



// usefull functions

/*
* create and add all the div.produit elements to the div#boutique element
* according to the product objects that exist in 'catalog' variable
*/
var createShop = function () {
	var shop = document.getElementById("boutique");
	for(var i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
	}
}

/*
* create the div.produit elment corresponding to the given product
* The created element receives the id "index-product" where index is replaced by param's value
* @param product (product object) = the product for which the element is created
* @param index (int) = the index of the product in catalog, used to set the id of the created element
*/
var createProduct = function (product, index) {
	// build the div element for product
	var block = document.createElement("div");
	block.className = "produit";
	// set the id for this product
	block.id = index + "-" + productIdKey;
	// build the h4 part of 'block'
	block.appendChild(createBlock("h4", product.name));
	
	// /!\ should add the figure of the product... does not work yet... /!\ 
	block.appendChild(createFigureBlock(product));//tzid taswira

	// build and add the div.description part of 'block' 
	block.appendChild(createBlock("div", product.description, "description"));
	// build and add the div.price part of 'block'
	block.appendChild(createBlock("div", product.price, "prix"));
	// build and add control div block to product element
	block.appendChild(createOrderControlBlock(index));
	return block;
}


/* return a new element of tag 'tag' with content 'content' and class 'cssClass'
 * @param tag (string) = the type of the created element (example : "p")
 * @param content (string) = the html wontent of the created element (example : "bla bla")
 * @param cssClass (string) (optional) = the value of the 'class' attribute for the created element
 */
var createBlock = function (tag, content, cssClass) {
	var element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/*
* builds the control element (div.controle) for a product
* @param index = the index of the considered product
*
* TODO : add the event handling, 
*   /!\  in this version button and input do nothing  /!\  
*/
var createOrderControlBlock = function (index) {
	var control = document.createElement("div");
	control.className = "controle";
	//control.setAttribute("class","controle");
	//console.log(control);
	// create input quantity element
	var input = document.createElement("input");
	input.id = index + '-' + inputIdKey;
	input.type = "number";
	input.step = "1";
	input.value = "0";
	input.min = "0";
	input.max = MAX_QTY.toString();//t9bl string lmax
	// add input to control as its child
	control.appendChild(input);
	
	// create order button
	var button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-" + orderIdKey;
	
	button.addEventListener("click", function () {//lzm nst3ml fonction anonyme bch naadilha parametre lfct okhra 
        addPanier(index);
    });

	// add control to control as its child
	control.appendChild(button);
	
	// the built control div node is returned
	return control;
}


/*
* create and return the figure block for this product
* see the static version of the project to know what the <figure> should be
* @param product (product object) = the product for which the figure block is created
*
* TODO : write the correct code
*/
var createFigureBlock = function (product) {

	// sna3et figure
	var figureBlock = createBlock("figure", "");
    
	var imageElement = document.createElement("img");
	
	imageElement.src = product.image;

	//var nameElement = createBlock("p", product.name,);

	figureBlock.appendChild(imageElement);
	//figureBlock.appendChild(nameElement);

	
	return figureBlock;
}


//Filtrage lel produit
function filter(){

	var filterInput = document.getElementById("filter");
	filterInput.addEventListener("keyup", function() {
		find();
});

}
function find(){
	var filterInput = document.getElementById("filter");
	var filterValue = filterInput.value.toLowerCase();
    var products = document.querySelectorAll("#boutique .produit");

    for(var i = 0; i < products.length; i++) {
        var productName = products[i].querySelector("h4").textContent.toLowerCase(); 
        
        if(productName.includes(filterValue)) {
            products[i].style.display = "inline-block"; 
        } else {
            products[i].style.display = "none";
        }
    }
}


// ajouter quantite
var addQuantity = function () {
    var quantityInputs = document.querySelectorAll('input[type="number"]');
	//console.log("button: ",quantityInputs);
    quantityInputs.forEach(function(input) {
		input.addEventListener('input', function() {
			controlQuantity(input);
		});
    });
}

// control quantity & change opacity 
var controlQuantity = function(input) {

    var quantity = parseInt(input.value);
	var addButton = document.getElementById(input.id.replace(inputIdKey, orderIdKey));

	console.log(addButton);

	if (isNaN(quantity) || quantity < 0 || quantity > MAX_QTY) {
        input.value = 0;
    }

	if (quantity === 0) {
        addButton.style.opacity = 0.25; 
    } else {
        addButton.style.opacity = 1; 
    }

}

//ajouter au panier
var addPanier = function (index) {
    var input = document.getElementById(index + "-" + inputIdKey);//controle de saisie al input 
    var quantity = parseInt(input.value);
    
    if (isNaN(quantity) || quantity <= 0 || quantity > MAX_QTY) {
        input.value = 0;
        return;
    }

   
	console.log(catalog[index]);
    var productDescription = catalog[index].description;
    var productImage = catalog[index].image;

    var productPrice = catalog[index].price;
    var existingCartItem = document.getElementById(index + "-" + orderIdKey + "-panier");
	var image = document.createElement("img");

	image.src = productImage; 
	//image.alt = productDescription;
	/*image.width="25";
	image.height="25";*/
	//console.log(image);

    if (existingCartItem) {
        var existingQuantity = parseInt(existingCartItem.dataset.quantity);
        var newQuantity = existingQuantity + quantity;
		
        if (newQuantity <= MAX_QTY) {
			
            existingCartItem.dataset.quantity = newQuantity;
			existingCartItem.childNodes[0].textContent = productDescription + " x" + newQuantity + "  " + productPrice + " €";
            updateTotal();
			
        } else {
            alert("Maximum quantity is 9 for " + productDescription + " !!!");
        }
    } else {
        var cartItem = document.createElement("div");
        cartItem.className = "achat";
        cartItem.id = index + "-" + orderIdKey + "-panier";
        cartItem.dataset.quantity = quantity;

        var cartItemText = document.createElement("span");
		cartItemText.className = "cart-item-content";
        cartItemText.textContent = productDescription + " x" + quantity + "  " + productPrice + " €";
        cartItem.appendChild(cartItemText);

        var image = document.createElement("img");
        image.src = productImage;
        image.width = 15;
        image.height = 15;
        cartItem.appendChild(image);

		 var deleteButton = document.createElement("button");
		 deleteButton.className = "delete";

		 var deleteImage = document.createElement("img");
         deleteImage.src = "./style/images/poubelle.jpg"; 
		 deleteImage.width = 15; 
         deleteImage.height = 15;
         


		 deleteButton.appendChild(deleteImage);

		 deleteButton.addEventListener("click", function () {
			 removeCartItem(index);
			 
		 });
		 cartItem.appendChild(deleteButton);

        document.querySelector("#panier .achats").appendChild(cartItem);
        updateTotal();
    }


    input.value = 0;
};

var updateTotal = function () {
    var totalCost = 0;
    var cartItems = document.querySelectorAll("#panier .achats .achat");
	console.log(cartItems)
    cartItems.forEach(function (item) {
        var index = parseInt(item.id.split("-")[0]);
        var quantity = parseInt(item.dataset.quantity);
        var price = parseFloat(catalog[index].price);
        totalCost += quantity * price;
    });

    var totalElement = document.getElementById("montant");
    totalElement.textContent = totalCost.toFixed(2);//baad lvirgule zouz ar9am
};



var removeCartItem = function (index) {
    var cartItem = document.getElementById(index + "-" + orderIdKey + "-panier");
    if (cartItem) {
        cartItem.parentNode.removeChild(cartItem);
    }
    updateTotal();
};