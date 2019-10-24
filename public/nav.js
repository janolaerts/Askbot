const ul = document.querySelector('ul');
const askLinks = document.querySelectorAll('.bot-ask');
const postLinks = document.querySelectorAll('.bot-post');
const info = document.querySelector('.info');

const createInfo = (e) => {
    info.style.display = 'block';
    info.style.top = `${e.pageY}px`;
    if(e.target.classList.contains('bot-ask')){
        info.textContent = 'Click to ask chatbot a question';
        info.style.width = '220px';
        info.style.left = `${e.pageX - 250}px`;
    }
    if(e.target.classList.contains('bot-post')){
        info.textContent = 'Click to post to the cloud';
        info.style.width = '180px';
        info.style.left = `${e.pageX - 220}px`;
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