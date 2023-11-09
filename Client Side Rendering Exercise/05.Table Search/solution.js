import { html, render } from '../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/table';
const tbodyElement = document.querySelector('tbody');
document.querySelector('#searchBtn').addEventListener('click', onClick);

async function getData() {
    try {
        const reseponse = await fetch(url);

        if (reseponse.ok == false) {
            const error = await reseponse.json();
            throw new Error(reseponse.message);
        }

        return reseponse.json();
    } catch (error) {
        return alert(error.message);
    }
}

const serverData = Object.values(await getData());
console.log(serverData);

const studentRowTemplate = (data) => html`
${data.map(student => html`
    <tr id=${student._id}>
        <td>${student.firstName} ${student.lastName}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
    </tr>
`)}
`

render(studentRowTemplate(serverData), tbodyElement);

const searchInputElement = document.getElementById('searchField');

function onClick() {
    if (searchInputElement.value == '') {
        alert('The input field can not be empty!');
        clearClass();
    }

    if (searchInputElement.value != '') {
        clearClass();

        for (const student of serverData) {
            const email = student['email'].toLowerCase();
            const firstName = student['firstName'].toLowerCase();
            const lastName = student['lastName'].toLowerCase();
            const course = student['course'].toLowerCase()
            const searchText = searchInputElement.value.toLowerCase();

            if (email.includes(searchText)
                || firstName.includes(searchText)
                || lastName.includes(searchText)
                || course.includes(searchText)) {
                document.getElementById(`${student._id}`).setAttribute('class', 'select');
            }
        }
    }
}

function clearClass() {
    document.querySelectorAll('tr').forEach(tr => {
        tr.removeAttribute('class');
    })
}


