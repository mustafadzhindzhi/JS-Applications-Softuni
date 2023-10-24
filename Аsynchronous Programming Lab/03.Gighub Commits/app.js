function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const ulElement = document.getElementById('commits');
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    fetch(url)
        .then(response => {
            if (response.ok === false) {
                throw new Error(`Error: ${response.status} (Not Found)`);
            }

            return response.json();
        })
        .then(data => {
            ulElement.textContent = '';

            data.forEach(element => {
                const liElement = document.createElement('li');
                liElement.textContent = `${element.commit.author.name}: ${element.commit.message}`;

                ulElement.appendChild(liElement);
            });
        })
        .catch(error => {
            ulElement.textContent = '';

            const liErrorElement = document.createElement('li');
            liErrorElement.textContent = error.message;
            ulElement.appendChild(liErrorElement);
        });
}