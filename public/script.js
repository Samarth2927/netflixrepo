const x = document.getElementById("login");
const y = document.getElementById("register");
const z = document.getElementById("btn");
const formBox = document.getElementById("formBox");

function switchRegister() {
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
    formBox.style.height = "580px";
}

function switchLogin() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0";
    formBox.style.height = "520px";
}

// Signup Logic
document.getElementById('register').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('regUser').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPass').value;
    const msg = document.getElementById('regMsg');

    msg.innerText = "Processing...";
    msg.className = "message";

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, phone, password })
        });
        const data = await response.json();
        if (response.ok) {
            msg.innerText = "Registration successful! Redirecting to Netflix...";
            msg.className = "message success";
            setTimeout(() => {
                window.location.href = 'movies.html';
            }, 2000);
        } else {
            msg.innerText = data.error || "Signup failed";
            msg.className = "message error";
        }
    } catch (err) {
        msg.innerText = "Server error";
        msg.className = "message error";
    }
});

// Login Logic
document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUser').value;
    const password = document.getElementById('loginPass').value;
    const msg = document.getElementById('loginMsg');

    msg.innerText = "Logging in...";
    msg.className = "message";

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            msg.innerText = "Welcome, " + data.user.username + "! Redirecting...";
            msg.className = "message success";
            setTimeout(() => {
                window.location.href = 'movies.html';
            }, 1500);
        } else {
            msg.innerText = data.error || "Login failed";
            msg.className = "message error";
        }
    } catch (err) {
        msg.innerText = "Server error";
        msg.className = "message error";
    }
});
