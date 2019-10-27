const questionForm = document.querySelector('.questionForm');
const socket = io.connect('http://localhost:5000');
const chatContainer = document.querySelector('.chat-container');
const thinking = document.querySelector('.thinking');
const feedback = questionForm.querySelector('div');

socket.on('message', data => {
    if(data.user && data.question != 'Select the question you want to ask'){
        thinking.innerHTML = 'Askbot is thinking';
        chatContainer.innerHTML += `<div class="message"><strong>${data.user}:</strong> ${data.question}</div>`;
        feedback.textContent = '';
    }
    else{
        feedback.textContent = 'Please fill in all the input fields';
    }

})

socket.on('question', data => {
        chatContainer.innerHTML += `<div class="message"><strong>Askbot:</strong> ${data.answer}</div>`;
        thinking.innerHTML = '';
        feedback.innerHTML = '';
})