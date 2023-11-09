import { render } from '../node_modules/lit-html/lit-html.js';
import { getAllBooks, createBook, updateBook, deleteBook } from './src/api.js';
import { mainTemplates } from './src/templates/mainTemp.js';
import { tableRowsTemplete } from './src/templates/tableRowsTemp.js';
import { editButtonHandler } from './src/actions.js';

const documentBoby = document.querySelector('body');
render(mainTemplates(), documentBoby);

documentBoby.querySelector('#loadBooks').addEventListener('click', async () => {
    const booksData = await getAllBooks();
    const section = documentBoby.querySelector('table tbody');
    const books = [];

    for (const id in booksData) {
        books.push({
            author: booksData[id].author,
            title: booksData[id].title,
            _id: id,
        });
    }

    const ctx = {
        books,
        deleteFunction,
        editButtonHandler
    };

    render(tableRowsTemplete(ctx), section);
});

const addFormEl = document.querySelector('#add-form');
addFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addFormEl);
    const author = formData.get('author');
    const title = formData.get('title');

    if (author == '' || title == '') {
        return alert('All fields are required!');
    }

    const book = {
        author,
        title
    };

    await createBook(book).then(data => {
        addFormEl.reset();
        documentBoby.querySelector('#loadBooks').click();
    });
});

const editFormEl = documentBoby.querySelector('#edit-form');
editFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(editFormEl);
    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    if (author == '' || title == '') {
        return alert('All fields are required!');
    }

    const book = {
        author,
        title
    };

    updateBook(id, book).then(() => {
        documentBoby.querySelector('#loadBooks').click();

        editFormEl.style.display = 'none';
        editFormEl.reset();
        addFormEl.style.display = 'block';
    });
});

function deleteFunction(id) {
    deleteBook(id);
    documentBoby.querySelector('#loadBooks').click();
}