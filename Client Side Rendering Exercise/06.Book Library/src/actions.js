import { render } from '../../node_modules/lit-html/lit-html.js';
import { editFormTemplate } from './templates/formTemp.js';
import { getBookById } from './api.js';


export async function editButtonHandler(id) {
    document.querySelector('#add-form').style.display = 'none';
    const currentBook = await getBookById(id);
    const formEl = document.querySelector('#edit-form');
    formEl.style.display = 'block';
    render(editFormTemplate(currentBook, id), formEl);
}