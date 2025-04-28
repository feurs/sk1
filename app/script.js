// Živý čas
function updateClock() {
    const now = new Date();
    document.getElementById('time').innerText = "Aktuálny čas: " + now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Návštevy
fetch('/visits')
    .then(response => response.json())
    .then(data => {
        document.getElementById('visits').innerText = data.count;
    })
    .catch(error => {
        document.getElementById('visits').innerText = "Chyba";
        console.error('Chyba pri načítaní návštev:', error);
    });

