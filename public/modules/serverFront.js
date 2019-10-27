const socket = io.connect('http://localhost:5000');

const questionForm = document.querySelector('.questionForm');
const chatContainer = document.querySelector('.chat-container');
const thinking = document.querySelector('.thinking');
const feedback = questionForm.querySelector('div');

questionForm.addEventListener('submit', e => {
    e.preventDefault();

    let user = questionForm['user'].value;
    let question = questionForm['question'].value;
    if(user && question != 'Select the question you want to ask'){
        socket.emit('message', { user: user, question: question });
        socket.emit('question', { question: question });
    }
    else{
        feedback.textContent = 'Please fill in all the input fields';
    }
    questionForm['question'].innerHTML = '<option>Select the question you want to ask</option>';
})

socket.on('message', data => {
    chatContainer.innerHTML += `<div class="message"><strong>${data.user}:</strong> ${data.question}</div>`;
    thinking.innerHTML = 'Askbot is thinking';
})

socket.on('question', data => {
    chatContainer.innerHTML += `<div class="message"><strong>Askbot:</strong> ${data.answer}</div>`;
    thinking.innerHTML = '';
})