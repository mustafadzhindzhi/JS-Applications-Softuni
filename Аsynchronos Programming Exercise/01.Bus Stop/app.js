function getInfo() {
    const busNumber = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const ulElement = document.getElementById('buses');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${busNumber}`;

    stopName.textContent = 'Loading...';
    ulElement.replaceChildren();

    document.getElementById('stopId').value = '';
    fetch(url)
        .then(response => {
            if (response.ok === false) {
                throw new Error('Invalid ID');
            }

            return response.json();
        })
        .then(data => {
            stopName.textContent = data.name;

            Object
                .entries(data.buses)
                .forEach(busData => {
                    const liElement = document.createElement('li');
                    liElement.textContent = `Bus ${busData[0]} arrives in ${busData[1]} minutes`;
                    ulElement.appendChild(liElement);
                });
        })
        .catch(() => {
            ulElement.replaceChildren();
            stopName.textContent = 'Error';
        });
}