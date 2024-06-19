function togglePasswordVisibility(passwordId) {
    const passwordInput = document.getElementById(passwordId);
    const eyeIcon = passwordId === 'loginPassword' ? document.getElementById('login-eye-icon') : document.getElementById('register-eye-icon');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    eyeIcon.classList.toggle('fa-eye-slash');
    eyeIcon.classList.toggle('fa-eye');
}

function showRegisterForm() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'flex';
    document.getElementById('login-message').style.display = 'none';
}

function showLoginForm() {
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('register-message').style.display = 'none';
}

function login() {
    const loginEmail = document.getElementById('loginEmail').value.trim();
    const loginPassword = document.getElementById('loginPassword').value.trim();
    const loginMessageElement = document.getElementById('login-message');

    loginMessageElement.style.display = 'none';
    document.getElementById('login-email-error').style.display = 'none';
    document.getElementById('login-password-error').style.display = 'none';

    if (loginEmail === '' || loginPassword === '') {
        loginMessageElement.textContent = 'Please enter email and password.';
        loginMessageElement.style.color = 'red';
        loginMessageElement.style.display = 'block';
    } else if (!isValidEmail(loginEmail)) {
        document.getElementById('login-email-error').textContent = 'Please enter a valid email address.';
        document.getElementById('login-email-error').style.color = 'red';
        document.getElementById('login-email-error').style.display = 'block';
    } else if (!isAlphaNumeric(loginPassword)) {
        document.getElementById('login-password-error').textContent = 'Password should be alphanumeric.';
        document.getElementById('login-password-error').style.color = 'red';
        document.getElementById('login-password-error').style.display = 'block';
    } else {
        const storedUser = localStorage.getItem(loginEmail);
        if (!storedUser || storedUser !== loginPassword) {
            loginMessageElement.textContent = 'UserName Not Registered!';
            loginMessageElement.style.display = 'block';
            loginMessageElement.style.color = 'red';
        } else {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('securedDashboard').style.display = 'flex';
            const userName = loginEmail.split('@')[0]; 
            document.getElementById('loggedInUser').textContent = userName;
        }
    }
}

function logout() {
    document.getElementById('securedDashboard').style.display = 'none';
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}

function register() {
    const registerEmail = document.getElementById('registerEmail').value.trim();
    const registerPassword = document.getElementById('registerPassword').value.trim();
    const registerMessageElement = document.getElementById('register-message');
    const registerEmailError = document.getElementById('register-email-error');
    const registerPasswordError = document.getElementById('register-password-error');

    registerEmailError.style.display = 'none';
    registerPasswordError.style.display = 'none';
    registerMessageElement.style.display = 'none';

    if (registerEmail === '' || registerPassword === '') {
        registerMessageElement.textContent = 'Please enter email and password.';
        registerMessageElement.style.color = 'red';
        registerMessageElement.style.display = 'block';
    } else if (!isValidEmail(registerEmail)) {
        registerEmailError.textContent = 'Please enter a valid email address.';
        registerEmailError.style.color = 'red';
        registerEmailError.style.display = 'block';
    } else if (!isAlphaNumeric(registerPassword)) {
        registerPasswordError.textContent = 'Password should be alphanumeric.';
        registerPasswordError.style.color = 'red';
        registerPasswordError.style.display = 'block';
    } else {
        localStorage.setItem(registerEmail, registerPassword);
        registerMessageElement.textContent = 'Registration successful! You can now log in.';
        registerMessageElement.style.color = 'green';
        registerMessageElement.style.display = 'block';
        document.getElementById('registerEmail').value = '';
        document.getElementById('registerPassword').value = '';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isAlphaNumeric(password) {
    const alphaNumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    return alphaNumericRegex.test(password);
}


// Check data in localStorage

/*
for (let i = 0; i < localStorage.length; i++) { 
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
}
*/

// Clear data in localStorage
// localStorage.clear();
