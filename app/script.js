// Aktualizácia času a dátumu
function updateTimeAndDate() {
    const now = new Date();
    document.getElementById('time').innerText = "Aktuálny čas: " + now.toLocaleTimeString();
    document.getElementById('date').innerText = "Dátum: " + now.toLocaleDateString();
}
setInterval(updateTimeAndDate, 1000);
updateTimeAndDate();

// Načítanie počtu návštev
fetch('/visits')
    .then(response => response.json())
    .then(data => {
        document.getElementById('visits').innerText = data.count;
    })
    .catch(error => {
        document.getElementById('visits').innerText = "Chyba";
        console.error('Chyba načítania návštev:', error);
    });

// Načítanie IP adresy
fetch('/ip')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ip').innerText = data.ip;
    })
    .catch(error => {
        document.getElementById('ip').innerText = "Chyba";
        console.error('Chyba načítania IP:', error);
    });

// Prepínanie Dark / Light módu
document.getElementById('toggle-mode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
