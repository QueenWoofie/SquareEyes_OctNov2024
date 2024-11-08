document.addEventListener('DOMContentLoaded', () => {
    const checkoutList = document.getElementById('checkout-list');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let totalPrice = 0;

    cart.forEach(item => {
        const checkoutItem = document.createElement('div');
        checkoutItem.classList.add('checkout-item');

        checkoutItem.innerHTML = `
                <div class="cart-item">
                    <div class="product">
                        <src="${item.image.url}" alt="${item.image.alt || 'Product Image'}">
                        <div class="details">
                            <h2>${item.title}</h2>
                            <p>${item.genre}</p>
                            <p>${item.released}</p>
                        </div>
                    </div>
                    <div class="plot">
                        <p>${item.description}</p>
                    </div>
                    <div class="price-section">
                        <p>${item.price},-</p>
                    </div>
                </div>
        `;

        checkoutList.appendChild(checkoutItem);

        totalPrice += item.price;
    });

    const totalPriceSection = document.createElement('div');
    totalPriceSection.classList.add('total-price-section');
    totalPriceSection.innerHTML = `
        <h2>Total Price: ${totalPrice},-</h2>
    `;

    checkoutList.appendChild(totalPriceSection);
});
