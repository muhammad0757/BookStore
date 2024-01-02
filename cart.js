                    // checking if DOM is loaded
                    if (document.readyState == 'loading') {
                        document.addEventListener('DOMContentLoaded', ready)
                        } else {
                            ready()
                        }
                        // This function handles when the DOM is ready and listens for when 
                        // user removes from cart 
                        function ready() {
                            var removeCartItemButtons = document.getElementsByClassName('btn-danger')
                            for (var i = 0; i < removeCartItemButtons.length; i++) {
                                var button = removeCartItemButtons[i]
                                button.addEventListener('click', removeCartItem)
                            }
                            
                            // handles when user adds to the cart
                            var addToCartButtons = document.getElementsByClassName('shop-item-button')
                            for (var i = 0; i < addToCartButtons.length; i++) {
                                var button = addToCartButtons[i]
                                button.addEventListener('click', addToCartClicked)}
                        }
                            
                    // this function handles when user removes a item from the cart
                    // and updates the total price
                    function removeCartItem(event) {
                        var buttonClicked = event.target
                        buttonClicked.parentElement.parentElement.remove()
                        updateCartTotal()
                    }
                    // this function handles when the quantity is changed for an item
                    // in the cart and updates the total price
                    function quantityChanged(event) {
                    updateCartTotal()}

                    // this function handles when  items are added to a cart and updates the total price 
                    function addToCartClicked(event) {
                        var button = event.target
                        var shopItem = button.parentElement.parentElement
                        // title img and price being displayed in cart
                        var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
                        var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
                        var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
                        addItemToCart(title, price, imageSrc)
                        updateCartTotal()
                    }
                    //  Function handles position title price and img to display in the cart
                    function addItemToCart(title, price, imageSrc) {
                        var cartRow = document.createElement('div')
                        cartRow.classList.add('cart-row')
                        var cartItems = document.getElementsByClassName('cart-items')[0]
                        var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
                        

                        // This code is creating a html element and displaying it under the cart on the client side
                        var cartRowContents = `
                        <div class="cart-item cart-column" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #ccc;">
                            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                            <div class="cart-item-details" style="flex: 1; padding: 0 10px;">
                                <div class="cart-item-title" style="font-weight: bold;">${title}</div>
                                <div class="cart-price" style="color: #555;">${price}</div>
                            </div>
                            <button class="btn btn-danger cart-remove-button" type="button">REMOVE</button>
                            <div class="cart-quantity" style="margin-left: 10px;">
                                <input class="cart-quantity-input" type="number" value="1">
                            </div>
                        </div>
                    `;  cartRow.innerHTML = cartRowContents
                        cartItems.append(cartRow)
                        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
                        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
                    }

                    // This function handles the updating the total price in the cart
                    function updateCartTotal() {
                        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
                        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
                        var total = 0

                        // Loops through the cart rows and update the total based on item prices and quantities
                        for (var i = 0; i < cartRows.length; i++) {
                            var cartRow = cartRows[i]
                            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
                            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
                            var price = parseFloat(priceElement.innerText.replace('$', ''))
                            var quantity = quantityElement.value
                            total = total + (price * quantity)
                        }
                        // Updates the total price on the client side 
                        total = Math.round(total * 100) / 100
                        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
                    }