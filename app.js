document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const productModal = document.getElementById('product-modal');
    const productDetails = document.getElementById('product-details');
    const closeButton = document.querySelector('.close-button');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    let allProducts = [];

    // Get the heading element
    const heading = document.getElementById('page-heading');

    // Add click event listener to the heading
    heading.addEventListener('click', () => {
        window.location.reload();
    });

    // Fetch products from the FakeShop API 
    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();
            allProducts = products;
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Display products
    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = createProductElement(product);
            productsContainer.appendChild(productElement);
        });
    }

    // Create a product element
    function createProductElement(product) {
        // const productDiv = document.createElement('div');
        // productDiv.classList.add('product', 'medium-card'); // Add a class for medium card style
    
        const productImg = document.createElement('img');
        productImg.src = product.image;
        productImg.alt = product.title;
        productImg.classList.add('product-image');
    
        const productTitle = document.createElement('h2');
        productTitle.textContent = product.title;
    
        const productPrice = document.createElement('p');
        productPrice.classList.add('price');
        productPrice.textContent = `$${product.price}`;
    
        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;
    
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View Details';
        viewButton.addEventListener('click', () => showProductDetails(product.id));
    
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.addEventListener('click', () => addToCart(product));
    
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = 1;
        quantityInput.min = 1;
    
        // Append elements to productDiv
        productDiv.appendChild(productImg);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(productDescription);
        productDiv.appendChild(viewButton);
        productDiv.appendChild(quantityInput);
        productDiv.appendChild(addToCartButton);
    
        return productDiv;
    }
    

    // Show product details in a modal using async/await
    async function showProductDetails(productId) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            const product = await response.json();
            productDetails.innerHTML = `
                <h2>${product.title}</h2>
                <img src="${product.image}" alt="${product.title}">
                <p class="price">$${product.price}</p>
                <p>${product.description}</p>
            `;
            productModal.style.display = 'block';
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    // Add to Cart
    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'cart.html'; // Navigate to the cart page
    }

    // Search functionality
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = allProducts.filter(product => 
            product.title.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
    });

    // Filter products by category
    function filterProduct(category) {
        if (category === 'all') {
            displayProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(product => 
                product.category.toLowerCase() === category.toLowerCase()
            );
            displayProducts(filteredProducts);
        }
    }

    // Close the modal
    closeButton.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
    });

    // Carousel auto-scroll
    let carouselIndex = 0;
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    function autoScroll() {
        carouselIndex = (carouselIndex + 1) % carouselItems.length;
        carouselItems[carouselIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }); 
    }
    
    setInterval(autoScroll, 3500);

    fetchProducts();
});
