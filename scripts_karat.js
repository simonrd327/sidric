let cart = [];
let cartCount = 0;

// Agregar evento para agregar productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productId = productCard.getAttribute('data-id');
        const productName = productCard.querySelector('h2').textContent;
        const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('Precio: $', ''));

        addToCart(productId, productName, productPrice);
    });
});

// Función para agregar productos al carrito
function addToCart(id, name, price) {
    const existingProduct = cart.find(product => product.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    cartCount++;
    updateCartCount();
}

// Actualiza la cantidad en el botón del carrito
function updateCartCount() {
    document.getElementById('cart-count').textContent = cartCount;
}

// Mostrar el carrito al hacer clic en el botón de "Ver Carrito"
document.getElementById('cart-btn').addEventListener('click', () => {
    displayCart();
    document.getElementById('cart-modal').style.display = 'flex';
});

// Cerrar el carrito
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});

// Función para mostrar los productos en el carrito
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Limpiar el carrito

    let total = 0;

    cart.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} x ${product.quantity} - $${(product.price * product.quantity).toFixed(2)}`;

        // Botón de eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.backgroundColor = '#ff6f61';
        deleteBtn.style.border = 'none';
        deleteBtn.style.color = 'white';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.addEventListener('click', () => {
            removeFromCart(product.id);
        });

        li.appendChild(deleteBtn); // Añadimos el botón de eliminar al producto en la lista
        cartItems.appendChild(li);

        total += product.price * product.quantity;
    });

    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    const productIndex = cart.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        // Restar la cantidad de productos eliminados del conteo total
        cartCount -= cart[productIndex].quantity;
        updateCartCount();

        // Eliminar el producto del carrito
        cart.splice(productIndex, 1);

        // Actualizar la vista del carrito
        displayCart();
    }
}

// Comprar los productos del carrito
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('¡Gracias por tu compra!');
        cart = [];
        cartCount = 0;
        updateCartCount();
        displayCart();
    } else {
        alert('El carrito está vacío.');
    }
});
