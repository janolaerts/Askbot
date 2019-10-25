const socket = io.connect('http://localhost:5000');

const questionForm = document.querySelector('.questionForm');
const chatContainer = document.querySelector('.chat-container');
const typing = document.querySelector('.typing');

questionForm.addEventListener('submit', e => {
    e.preventDefault();

    let user = questionForm['user'].value;
    let question = questionForm['question'].value;
    socket.emit('chat', { user: user, question: question });
    questionForm['question'].value = '';
})

questionForm['question'].addEventListener('keypress', e => {
    let user = questionForm['user'].value;
    socket.emit('typing', { user: user });
})

socket.on('chat', data => {
    chatContainer.innerHTML += `<div class="message"><strong>${data.user}:</strong> ${data.question}</div>`;
    typing.innerHTML = '';
})

socket.on('typing', data => {
    typing.innerHTML = `<p><strong>${data.user} is typing</strong></p>`;
})

socket.on('messages', data => {
    console.log('data received', data);
})