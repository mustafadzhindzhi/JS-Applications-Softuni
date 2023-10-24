function solution() {
    const mainElement = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/articles';

    fetch(`${url}/list`)
        .then(response => {
            if (response.ok === false) {
                throw new Error();
            }

            return response.json();
        })
        .then(data => {
            data.forEach(element => {
                const accordionDivElement = document.createElement('div');
                accordionDivElement.classList = 'accordion';

                const headDivElement = document.createElement('div');
                headDivElement.classList = 'head';

                const spanElement = document.createElement('span');
                spanElement.textContent = element.title;
                headDivElement.appendChild(spanElement);

                const moreButton = document.createElement('button');
                moreButton.classList = 'button';
                moreButton.id = element._id;
                moreButton.textContent = 'More';
                headDivElement.appendChild(moreButton);

                accordionDivElement.appendChild(headDivElement);
                mainElement.appendChild(accordionDivElement);

                fetch(`${url}/details/${element._id}`)
                    .then(response => {
                        if (response.ok === false) {
                            throw new Error();
                        }

                        return response.json();
                    })
                    .then(data => {
                        const extraDivElement = document.createElement('div');
                        extraDivElement.classList = 'extra';

                        const pElement = document.createElement('p');
                        pElement.textContent = data.content;

                        extraDivElement.appendChild(pElement);
                        accordionDivElement.appendChild(extraDivElement);
                    })
                    .catch(err => console.log(err));

                moreButton.addEventListener('click', onClick);

                function onClick(e) {
                    console.log(e.target.parentElement.parentElement);

                    const extraInfo = accordionDivElement.querySelector('.extra');

                    if (moreButton.textContent === 'More') {
                        moreButton.textContent = 'Less';
                        extraInfo.style.display = 'block';
                    } else {
                        moreButton.textContent = 'More';
                        extraInfo.style.display = 'none';
                    }

                }
            });
        })
        .catch(err => console.log(err));
}

solution();