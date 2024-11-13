document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://v2.api.noroff.dev/square-eyes';
    const loadingIndicator = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const productContents = document.getElementById('product-contents');
    let products = [];

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        errorMessage.textContent = 'Product ID not found.';
        errorMessage.style.display = 'block';
        loadingIndicator.style.display = 'none';
        return;
    }

    async function fetchProductDetails() {
        loadingIndicator.style.display = 'flex';
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        try {
            const response = await fetch(`${apiUrl}/${productId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product details. Please try again later.');
            }

            const data = await response.json();
            console.log('API Response:', data);

            let product;
            if (Array.isArray(data.data)) {
                product = data.data.find(item => item.id === productId);
            } else {
                product = data.data;
            }

            if (!product) {
                throw new Error('Product not found.');
            }

            products = [product];
            displayProductDetails(product);
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }

    function displayProductDetails(product) {
        if (!product.image || !product.image.url) {
            errorMessage.textContent = 'Product image not available.';
            errorMessage.style.display = 'block';
            return;
        }

        productContents.innerHTML = `
            <div class="product-details-card">
                <img src="${product.image.url}" alt="${product.image.alt || 'Product Image'}" class="product-details-image">
                <div class=product-details-text>
                    <div class="product-details-title">
                        <h1>${product.title}</h1>
                        <h1>${product.released}</h1>
                        <h1>${product.rating}</h1>
                    </div>
                    <div class="product-details-info">
                        <h2 class="genre-button">${product.genre}</h2>
                        <p>${product.description}</p>
                    </div>
                    <div class="product-details-cart">
                        <p>${product.price},-</p>
                        <button class="add-to-cart-large" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;

        document.querySelector('.add-to-cart-large').addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            addToCart(productId, products);
        });
    }

    fetchProductDetails();
});