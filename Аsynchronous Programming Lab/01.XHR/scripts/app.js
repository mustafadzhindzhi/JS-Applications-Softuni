function loadRepos() {
    const request = new XMLHttpRequest();
    const url = 'https://api.github.com/users/testnakov/repos';

    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            const data = JSON.parse(request.responseText);

            document.getElementById('res').textContent = data
                .map(x => x.name)
                .join(', ');
        }
    });

    request.open('GET', url);
    request.send();
}