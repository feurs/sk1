// Update timezones
function updateTimezones() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const bratislava = now.toLocaleTimeString('sk-SK', { ...options, timeZone: 'Europe/Bratislava' });
    const newYork = now.toLocaleTimeString('en-US', { ...options, timeZone: 'America/New_York' });
    const tokyo = now.toLocaleTimeString('ja-JP', { ...options, timeZone: 'Asia/Tokyo' });

    document.getElementById('timezones').innerHTML = `
        <p>Bratislava: ${bratislava}</p>
        <p>New York: ${newYork}</p>
        <p>Tokyo: ${tokyo}</p>
    `;
}
setInterval(updateTimezones, 1000);
updateTimezones();

// Update date
function updateDate() {
    const today = new Date();
    document.getElementById('date').innerText = today.toLocaleDateString();
}
updateDate();

// Fetch visits
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

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
}
