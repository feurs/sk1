// Funkcia na aktualizovanie časov v pásmach
function updateTimezones() {
    const tzElement = document.getElementById('timezones');
    if (!tzElement) return;

    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const bratislava = now.toLocaleTimeString('sk-SK', { ...options, timeZone: 'Europe/Bratislava' });
    const newYork = now.toLocaleTimeString('en-US', { ...options, timeZone: 'America/New_York' });
    const tokyo = now.toLocaleTimeString('ja-JP', { ...options, timeZone: 'Asia/Tokyo' });

    tzElement.innerHTML = `
        <p>Bratislava: ${bratislava}</p>
        <p>New York: ${newYork}</p>
        <p>Tokyo: ${tokyo}</p>
    `;
}
setInterval(updateTimezones, 1000);
updateTimezones();

// Funkcia na aktualizovanie dátumu
function updateDate() {
    const dateElement = document.getElementById('date');
    if (!dateElement) return;

    const today = new Date();
    dateElement.innerText = today.toLocaleDateString();
}
updateDate();

// Fetch návštev
if (document.getElementById('visits')) {
    fetch('/visits')
        .then(res => res.json())
        .then(data => {
            document.getElementById('visits').innerText = data.count;
        })
        .catch(() => {
            document.getElementById('visits').innerText = 'Chyba';
        });
}

// Spracovanie témy (svetlá / tmavá) cez localStorage
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    // Ak bola nastavená tmavá téma predtým, zapneme ju
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });
}

// Registrácia používateľa
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const country = document.getElementById('reg-country').value;
        const password = document.getElementById('reg-password').value;

        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, country, password })
            });
            const data = await response.json();
            document.getElementById('register-message').innerText = data.message || data.error;
        } catch (err) {
            document.getElementById('register-message').innerText = 'Chyba pri registrácii';
        }
    });
}


// Prihlásenie používateľa
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            document.getElementById('login-message').innerText = data.message || data.error;
        } catch (err) {
            document.getElementById('login-message').innerText = 'Chyba pri prihlasovaní';
        }
    });
}
