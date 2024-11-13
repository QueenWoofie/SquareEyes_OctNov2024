const apiUrl = 'https://v2.api.noroff.dev/square-eyes';
let products = [];

async function fetchProducts() {
    const loadingIndicator = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const productList = document.getElementById('product-list');

    loadingIndicator.style.display = 'flex';
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch products. Please try again later.');
        }

        const data = await response.json();
        products = data.data;
        displayProducts(products);
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    productList.classList.add('fade-in');

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <div class="product-card" data-id="${product.id}">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image.url}" alt="${product.image.alt}">
                    <div class="product-details">
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <p>Price: ${product.price}</p>
                    </div>
                </a>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productItem);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            addToCart(productId, products);
        });
    });

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (event) => {
            if (!event.target.classList.contains('add-to-cart')) {
                window.location.href = `product.html?id=${card.getAttribute('data-id')}`;
            }
        });
    });

    setTimeout(() => productList.classList.add('visible'), 100);
}

fetchProducts();