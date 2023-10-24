function solve() {
    const arriveButtonElement = document.getElementById('arrive');
    const departButtonElement = document.getElementById('depart');
    const spanInfoElement = document.querySelector('.info');

    const stop = {
        next: 'depot'
    };

    function depart() {
        departButtonElement.disabled = true;

        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        fetch(url)
            .then(response => {
                if (response.ok === false) {
                    throw new Error('Error');
                }

                return response.json();
            })
            .then(data => {
                console.log(stop);
                stop.next = data.next;
                stop.name = data.name;
                spanInfoElement.textContent = `Next stop ${data.name}`;
            })
            .catch(() => spanInfoElement.textContent = 'Error');

        arriveButtonElement.disabled = false;
    }

    function arrive() {
        arriveButtonElement.disabled = true;
        departButtonElement.disabled = false;

        spanInfoElement.textContent = `Arriving at ${stop.name}`;

    }

    return {
        depart,
        arrive
    };
}

let result = solve();