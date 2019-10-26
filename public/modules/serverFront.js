const socket = io.connect('http://localhost:5000');

const questionForm = document.querySelector('.questionForm');
const chatContainer = document.querySelector('.chat-container');
const typing = document.querySelector('.typing');

questionForm.addEventListener('submit', e => {
    e.preventDefault();

    let user = questionForm['user'].value;
    let question = questionForm['question'].value;
    socket.emit('message', { user: user, question: question });
    socket.emit('question', { question: question });
    questionForm['question'].innerHTML = '<option>Select the question you want to ask</option>';
})

socket.on('message', data => {
    chatContainer.innerHTML += `<div class="message"><strong>${data.user}:</strong> ${data.question}</div>`;
    typing.innerHTML = '';
})

socket.on('question', data => {
    chatContainer.innerHTML += `<div class="message"><strong>Askbot:</strong> ${data.answer}</div>`;
})