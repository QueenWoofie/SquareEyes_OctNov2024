let cart = JSON.parse(localStorage.getItem('cart')) || [];
const addToCartSound = new Audio('https://queenwoofie.github.io/SquareEyes_OctNov2024/assets/audio/add-to-cart.mp3');
const removeFromCartSound = new Audio('https://queenwoofie.github.io/SquareEyes_OctNov2024/assets/audio/remove-from-cart.mp3');

function addToCart(productId, products) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        addToCartSound.play();
        updateCartDisplay();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    removeFromCartSound.play();
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    const cartCount = document.getElementById('cart-count');
    if (cartList && cartCount) {
        cartList.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.title}</p>
                <p>Price: ${item.price}</p>
                <button class="delete-item trash icon" data-index="${index}"></button>
            `;
            cartList.appendChild(cartItem);
        });
        cartCount.textContent = cart.length;

        document.querySelectorAll('.delete-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cartElement = document.getElementById('cart');
    if (cartElement) {
        cartElement.addEventListener('click', () => {
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'checkout.html';
        });
    }
    updateCartDisplay();
});