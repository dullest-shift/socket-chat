const socket = io();
const chatform = document.getElementById('chat-form');
const chatmsg = document.querySelector('.chat-messages');

const { username } = Qs.parse(location.search, { ignoreQueryPrefix: true });
console.log(username + '10');

socket.emit('lists', { username });

console.log(username + username);

socket.on('message', message => {
    console.log(message);
    output(message)
    console.log(username + 'u9')

})

chatform.addEventListener('submit', e => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chats', msg);

    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();


    chatmsg.scrollTop = chatmsg.scrollHeight;

})

function output(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}