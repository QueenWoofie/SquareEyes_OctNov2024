document.addEventListener('DOMContentLoaded', () => {
    const checkoutList = document.getElementById('checkout-list');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const checkoutItem = document.createElement('div');
        checkoutItem.classList.add('checkout-item');

        checkoutItem.innerHTML = `
            <div class="incart-item">
                <div class="product">
                    <img src="${item.image.url}" alt="${item.image.alt || 'Product Image'}">
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
                    <p>${item.price.toFixed(2)},-</p>
                    <button class="delete-item trash icon" data-index="${index}"></button>
                </div>
            </div>
        `;

        checkoutList.appendChild(checkoutItem);

        totalPrice += item.price;
    });

    totalPrice = totalPrice.toFixed(2);

    const totalPriceSection = document.createElement('div');
    totalPriceSection.classList.add('total-price-section');
    totalPriceSection.innerHTML = `
        <h2>Total Price: ${totalPrice},-</h2>
    `;

    checkoutList.appendChild(totalPriceSection);

    document.querySelectorAll('.delete-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            removeFromCart(index);
            setTimeout(() => {
                location.reload();
            }, 1000);
        });
    });
});
