const url = 'http://localhost:3030/jsonstore/collections/students';
const tbodyElement = document.querySelector('#results tbody');
const formElement = document.querySelector('#form');

window.addEventListener('load', onLoad);
formElement.addEventListener('submit', onSumbit);

async function onLoad() {
    try {
        const response = await fetch(url);

        if (response.ok === false) {
            throw new Error('Error');
        }

        const data = await response.json();

        Object.values(data).forEach(student => {
            console.log(student);

            const trElement = createElement('tr', '', tbodyElement);
            createElement('td', student.firstName, trElement);
            createElement('td', student.lastName, trElement);
            createElement('td', student.facultyNumber, trElement);
            createElement('td', student.grade, trElement);
        });
    } catch (error) {
        return alert(error.message);
    }
}

async function onSumbit(e) {
    e.preventDefault();

    const formData = new FormData(formElement);
    const [firstName, lastName, facultyNumber, grade] = formData.values();
    grade.trim();

    if (firstName === ''
        || lastName === ''
        || facultyNumber === ''
        || grade === '') {
        return alert('All fields must be filled');
    }

    const data = {
        firstName,
        lastName,
        facultyNumber,
        grade,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok === false) {
            throw new Error('New student can not be added');
        }

        formElement.reset();
        tbodyElement.replaceChildren();
        onLoad();
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