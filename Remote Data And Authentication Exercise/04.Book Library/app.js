const url = 'http://localhost:3030/jsonstore/collections/books';
const tbodyElement = document.querySelector('tbody');
const loadButtonElement = document.getElementById('loadBooks');
const formElement = document.querySelector('form');
const submitButtonElement = document.querySelector('form button');
const h3Element = document.querySelector('form h3');

loadButtonElement.addEventListener('click', onLoad);
formElement.addEventListener('submit', submitHandler);

function createElement(type, content, appender, cls) {
    const element = document.createElement(type);
    element.textContent = content;
    if (cls) {
        element.classList = cls;
    }
    appender.appendChild(element);
    return element;
}

async function onLoad() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error');
        }

        tbodyElement.innerHTML = '';

        const data = await response.json();
        for (const [id, bookData] of Object.entries(data)) {
            const trElement = createElement('tr', '', tbodyElement);
            trElement.id = id;

            createElement('td', bookData.title, trElement, 'title');
            createElement('td', bookData.author, trElement, 'author');
            const tdButtonsElement = createElement('td', '', trElement);
            const editButtonElement = createElement('button', 'Edit', tdButtonsElement);
            const deleteButtonElement = createElement('button', 'Delete', tdButtonsElement);
        }
    } catch (error) {
        alert(error.message);
    }
}

async function createBook(data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error');
        }

        formElement.reset();
        onLoad();
    } catch (error) {
        alert(error.message);
    }
}

function onEdit(e) {
    const trElement = e.target.closest('tr');
    h3Element.textContent = 'Edit Form';
    const titleElement = formElement.querySelector('input[placeholder="Title..."]');
    const authorElement = formElement.querySelector('input[placeholder="Author..."]');
    titleElement.value = trElement.querySelector('.title').textContent;
    authorElement.value = trElement.querySelector('.author').textContent;
    localStorage.setItem('id', trElement.id);
    submitButtonElement.textContent = 'Save';
}

async function onDelete(e) {
    const id = e.target.closest('tr').id;
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error');
        }

        onLoad();
    } catch (error) {
        alert(error.message);
    }
}

async function onSave() {
    const id = localStorage.getItem('id');
    localStorage.removeItem('id');

    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error');
        }

        submitButtonElement.textContent = 'Submit';
        h3Element.textContent = 'FORM';
        formElement.reset();
        onLoad();
    } catch (error) {
        alert(error.message);
    }
}

function submitHandler(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(formElement));

    if (submitButtonElement.textContent === 'Submit') {
        createBook(formData);
    } else {
        onSave(formData);
    }
}
