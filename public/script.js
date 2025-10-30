// Wacht tot de DOM volledig is geladen
document.addEventListener('DOMContentLoaded', () => {
    const addressForm = document.getElementById('addressForm'); // Haal het formulier op
    const addressList = document.getElementById('addressList'); // Haal de lijst op waar adressen worden weergegeven

    // Functie om alle adressen op te halen en weer te geven
    const fetchAddresses = async () => {
        try {
            const response = await fetch('http://localhost:3000/adressen'); // Haal adressen op van de server
            const addresses = await response.json(); // Parse het antwoord als JSON

            // Maak de lijst leeg voordat we nieuwe adressen toevoegen
            addressList.innerHTML = '';

            // Voeg elk adres toe aan de lijst
            addresses.forEach(address => {
                const li = document.createElement('li');
                li.textContent = `${address.Adres}, ${address.Woonplaats}`;
                addressList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    // Event listener voor het formulier
    addressForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Voorkom dat het formulier de pagina herlaadt

        // Haal de waarden uit het formulier
        const adres = document.getElementById('adres').value;
        const woonplaats = document.getElementById('woonplaats').value;

        try {
            // Stuur een POST request naar de server om het adres toe te voegen
            const response = await fetch('http://localhost:3000/adres', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ adres, woonplaats }), // Converteer de data naar JSON
            });

            if (response.ok) {
                // Als het succesvol is, haal de adressen opnieuw op om de lijst te updaten
                fetchAddresses();
                // Reset het formulier
                addressForm.reset();
            } else {
                console.error('Error adding address');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Haal de adressen op wanneer de pagina laadt
    fetchAddresses();
});