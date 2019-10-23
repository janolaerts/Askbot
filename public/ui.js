//server
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

//nav
const ul = document.querySelector('ul');
const askLinks = document.querySelectorAll('.bot-ask');
const postLinks = document.querySelectorAll('.bot-post');
const info = document.querySelector('.info');

const createInfo = (e) => {
    info.style.display = 'block';
    info.style.left = `${e.pageX - 220}px`;
    info.style.top = `${e.pageY}px`;
    console.log(info);
    if(e.target.classList.contains('bot-ask')){
        info.textContent = 'Click to ask chatbot a question';
        info.style.width = '220px';
    }
    if(e.target.classList.contains('bot-post')){
        info.textContent = 'Click to post to the cloud';
        info.style.width = '180px';
    }
}

askLinks.forEach(link => {
    link.addEventListener('mouseenter', e => {
        askLinks[0].style.background = 'limegreen';
        createInfo(e);
    })
})

askLinks.forEach(link => {
    link.addEventListener('mouseout', e => {
        askLinks[0].style.background = 'orange';
        info.style.display = 'none';
    })
})

postLinks.forEach(link => {
    link.addEventListener('mouseenter', e => {
        postLinks[0].style.background = 'limegreen';
        createInfo(e);
    })
})

postLinks.forEach(link => {
    link.addEventListener('mouseout', e => {
        postLinks[0].style.background = 'darkblue';
        info.style.display = 'none';
    })
})