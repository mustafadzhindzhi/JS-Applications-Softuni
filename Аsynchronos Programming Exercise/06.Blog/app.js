function attachEvents() {
    const loadButtonElement = document.getElementById('btnLoadPosts');
    const viewButtonElement = document.getElementById('btnViewPost');
    const selectPostsElement = document.getElementById('posts');
    const postTitleElement = document.getElementById('post-title');
    const pBodyElement = document.getElementById('post-body');
    const postUlElement = document.getElementById('post-comments');
    const url = 'http://localhost:3030/jsonstore/blog';

    let posts = [];

    loadButtonElement.addEventListener('click', onLoad);
    viewButtonElement.addEventListener('click', onView);

    async function fetchAndHandle(url, successCallback) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error();
            }
            const data = await response.json();
            successCallback(data);
        } catch (err) {
            console.error(err);
        }
    }

    function onLoad() {
        fetchAndHandle(`${url}/posts`, data => {
            selectPostsElement.innerHTML = '';
            posts = Object.values(data).map(post => {
                const optionElement = document.createElement('option');
                optionElement.value = post.id;
                optionElement.textContent = post.title;
                selectPostsElement.appendChild(optionElement);
                return {
                    title: post.title,
                    body: post.body
                };
            });
        });
    }

    function onView() {
        const selectedOption = selectPostsElement.selectedOptions[0];
        if (!selectedOption) {
            return;
        }
        const postId = selectedOption.value;
        const post = posts.find(p => p.title === selectedOption.textContent);

        postTitleElement.textContent = selectedOption.textContent;
        pBodyElement.textContent = post.body;

        fetchAndHandle(`${url}/comments`, data => {
            postUlElement.innerHTML = '';
            const comments = Object.values(data).filter(comment => comment.postId === postId);
            comments.forEach(comment => {
                const liElement = document.createElement('li');
                liElement.textContent = comment.text;
                postUlElement.appendChild(liElement);
            });
        });
    }
}

attachEvents();
