document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://your-api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Login successful, redirect to dashboard page
            window.location.href = '/dashboard.html';
        } else {
            // Login failed, display error message
            document.getElementById('error-message').textContent = data.message;
        }
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('error-message').textContent = 'An error occurred during login. Please try again later.';
    }
});
