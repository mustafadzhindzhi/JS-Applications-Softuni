import { html, render } from '../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
const selectElement = document.getElementById('menu');

async function getData() {
    try {
        const response = await fetch(url);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();
    } catch (error) {
        return alert(error.message);
    }
}

const options = Object.values(await getData());

const optionTemplate = (data) => html`
    ${data.map(town => html`<option value=${town._id}>${town.text}</option>`)}
`;

function update() {
    render(optionTemplate(options), selectElement);
}

update();

const formElement = document.querySelector('form');
formElement.addEventListener('submit', onSubmit);
const itemTextElement = document.getElementById('itemText');

async function onSubmit(e) {
    e.preventDefault();

    const text = itemTextElement.value;

    if (text != '') {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            })

            if (response.ok == false) {
                const error = await response.json();
                throw new Error(error.message);
            }

            options.push(await response.json());
        } catch (error) {
            return alert(error.message);
        }

        update();
        formElement.reset();
    }
}