import { html, render } from '../node_modules//lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const rootElement = document.getElementById('allCats');

const catTemplate = (data) => html`
    <ul>
        ${data.map(cat => html`
        <li>
            <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button class="showBtn" @click=${showInfo}>Show status code</button>
                <div class="status" style="display: none" id=${cat.id}>
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>
            </div>
        </li>
        `)}
    </ul>
`;

render(catTemplate(cats), rootElement);

function showInfo(e) {
    if (e.target.textContent == 'Show status code') {
        e.target.parentElement.querySelector('.status').style.display = 'block';
        e.target.textContent = 'Hide status code';
    } else {
        e.target.parentElement.querySelector('.status').style.display = 'none';
        e.target.textContent = 'Show status code';
    }
}
