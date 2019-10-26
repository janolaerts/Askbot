/*const socket = io.connect('http://localhost:5000');

const postForm = document.querySelector('.post-form');
postForm.addEventListener('submit', e => {
    e.preventDefault();

    const question = e.target['question'].value;
    const answer = e.target['answer'].value;

    socket.emit('answer', { question: question, answer: answer });

    postForm.question.value = '';
    postForm.answer.value = '';
})*/