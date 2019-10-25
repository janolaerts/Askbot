const socket = io.connect('http://localhost:5000');

const messageForm = document.querySelector('.messageForm');
const chatContainer = document.querySelector('.chat-container');
const typing = document.querySelector('.typing');

messageForm.addEventListener('submit', e => {
    e.preventDefault();

    let user = messageForm['user'].value;
    let message = messageForm['message'].value;
    socket.emit('chat', { user: user, message: message });
    messageForm['message'].value = '';
})

messageForm['message'].addEventListener('keypress', e => {
    let user = messageForm['user'].value;
    socket.emit('typing', { user: user });
})

socket.on('chat', data => {
    chatContainer.innerHTML += `<div class="message"><strong>${data.user}:</strong> ${data.message}</div>`;
    typing.innerHTML = '';
})

socket.on('typing', data => {
    typing.innerHTML = `<p><strong>${data.user} is typing</strong></p>`;
})

socket.on('messages', data => {
    console.log('data received', data);
})