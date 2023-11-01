function attachEvents() {
    const refreshButtonElement = document.getElementById('refresh');
    const sendButtonElement = document.getElementById('submit');
    const url = 'http://localhost:3030/jsonstore/messenger';

    refreshButtonElement.addEventListener('click', onRefresh);
    sendButtonElement.addEventListener('click', onSend);

    async function onRefresh() {
        const textAreaElement = document.getElementById('messages');
        
        try {
            const response = await fetch(url);

            if (response.ok === false) {
                throw new Error();
            }

            const data = await response.json();
            const content = [];
            console.log(data);

            Object.values(data).forEach(x => {
                content.push(`${x.author}: ${x.content}`);
            });

            textAreaElement.value = content.join('\n');
        } catch (error) {
            window.alert(error.message);
        }
    }

    async function onSend() {
        const nameInputElement = document.querySelector('input[name="author"]');
        const messageInputElement = document.querySelector('input[name="content"]');

        try {
            if (nameInputElement.value !== '' && messageInputElement.value !== '') {
                const data = {
                    author: nameInputElement.value,
                    content: messageInputElement.value,
                };

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            } else {
                window.alert('Invalid input');
            }
        } catch (error) {
            window.alert(error.message);
        }

        nameInputElement.value = '';
        messageInputElement.value = '';
    }
}

attachEvents();