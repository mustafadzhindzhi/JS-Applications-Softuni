import { html, render } from '../node_modules/lit-html/lit-html.js';

const rootElement = document.getElementById('root');
const townsInputElement = document.getElementById('towns');

document.getElementById('btnLoadTowns').addEventListener('click', getTowns);

const listTemplate = (data) => html`
    <ul>
        ${data.map(town => html`<li>${town}</li>`)}
    </ul>
`;

function getTowns(e) {
    e.preventDefault();

    if (townsInputElement.value != '') {
        const towns = document.getElementById('towns').value.split(', ');
        townsInputElement.value = '';
        render(listTemplate(towns), rootElement);
    }
}