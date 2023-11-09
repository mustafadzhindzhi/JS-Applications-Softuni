import { towns } from './towns.js';
import { html, render } from '../node_modules/lit-html/lit-html.js';

const townsDivElement = document.getElementById('towns');
const searchInputElement = document.getElementById('searchText');

document.querySelector('button').addEventListener('click', onSearch);

const townTemplate = (data) => html`
    <ul>
        ${data.map(town => html`<li id=${town}>${town}</li>`)}
    </ul>
`;

render(townTemplate(towns), townsDivElement);

function onSearch() {
    let counter = 0;
    towns.forEach(town => {
        if (town.includes(searchInputElement.value)) {
            counter++;
            document.getElementById(`${town}`).setAttribute('class', 'active');
        } else {
            document.getElementById(`${town}`).removeAttribute('class', 'active');
        }
    });

    searchInputElement.value = '';
    document.getElementById('result').textContent = `${counter} matches found`;
}