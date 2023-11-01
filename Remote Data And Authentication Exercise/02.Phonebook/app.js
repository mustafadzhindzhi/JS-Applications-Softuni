function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const loadButtonElement = document.getElementById('btnLoad');
    const createButtonElement = document.getElementById('btnCreate');

    loadButtonElement.addEventListener('click', onLoad);
    createButtonElement.addEventListener('click', onCreate);

    async function onLoad() {
        const ulElement = document.getElementById('phonebook');
        ulElement.textContent = 'Loading...';

        try {
            const response = await fetch(url);
            if (response.ok === false) {
                throw new Error;
            }

            const data = await response.json();

            ulElement.replaceChildren();

            Object.values(data).forEach(el => {
                const liElement = createElement('li', `${el.person}: ${el.phone}`, ulElement);
                liElement.id = el._id;

                const deleteButton = createElement('button', 'Delete', liElement);
                deleteButton.addEventListener('click', onDelete);
            });
        } catch (error) {
            return alert(error.message);
        }
    }

    async function onCreate() {
        const personInputElement = document.getElementById('person');
        const phoneInputElement = document.getElementById('phone');

        const person = personInputElement.value;
        const phone = phoneInputElement.value;

        const data = { person, phone };

        try {
            if (person === '' && phone === '') {
                throw new Error('All fields must be filled');
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok === false) {
                throw new Error();
            }

            loadButtonElement.click();
            personInputElement.value = '';
            phoneInputElement.value = '';

        } catch (error) {
            return alert(error.message);
        }
    }

    async function onDelete(e) {
        if (e.currentTarget.nodeName !== 'BUTTON' || e.currentTarget.textContent !== 'Delete') {
            return;
        }

        const confirmation = window.confirm('You are going to delete this phonenumber! Are you sure?');

        if (confirmation === false) {
            return;
        }

        const id = e.currentTarget.parentElement.id;
        const [person, phone] = e.currentTarget.parentElement.innerText
            .slice(0, -6)
            .split(':');

        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: { person, phone } })
            });

            if (response.ok === false) {
                throw new Error();
            }

            loadButtonElement.click();

        } catch (error) {
            return alert(error.message);
        }
    }

    function createElement(type, content, appender) {
        const result = document.createElement(type);
        result.textContent = content;
        appender.appendChild(result);

        return result;
    }
}

attachEvents();