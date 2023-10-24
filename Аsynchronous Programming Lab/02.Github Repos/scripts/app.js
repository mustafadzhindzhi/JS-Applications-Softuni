function loadRepos() {
	const username = document.getElementById('username').value;
	const ulReposElement = document.getElementById('repos');
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(response => {
			if (response.ok === false) {
				throw new Error(`${response.status} ${response.statusText}`);
			}

			return response.json();
		})
		.then(data => {
			ulReposElement.innerHTML = '';
			
			Object
				.values(data)
				.forEach(repo => {
					const liElement = document.createElement('li');
					const aElement = document.createElement('a');

					aElement.href = url;
					aElement.textContent = repo['full_name'];

					liElement.appendChild(aElement);
					ulReposElement.appendChild(liElement);
				});
		})
		.catch(error => {
			ulReposElement.innerHTML = '';

			const errorLiElement = document.createElement('li');
			errorLiElement.textContent = error.message;
			ulReposElement.appendChild(errorLiElement);
		});
}