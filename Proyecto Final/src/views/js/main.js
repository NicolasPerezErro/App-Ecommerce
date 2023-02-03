// CHAT

const socket = io.connect();

const inputUsername = document.getElementById('inputUsername');
const inputMensaje = document.getElementById('inputMensaje');
const inputType = document.getElementById('inputType');
const btnEnviar = document.getElementById('btnEnviar');

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const hoy = new Date();

    const mensaje = {
        email: inputUsername.value,
        dateTime: `[${hoy.toLocaleString()}]`,
        type: inputType.value,
        body: inputMensaje.value
    };

    formPublicarMensaje.reset();
    inputMensaje.focus();
    socket.emit('nuevo-mensaje', mensaje);
});

socket.on('mensajes', mensajes => {
    const html = mensajes.map(elem => {
        if(elem.type == 'system'){
            elem.email = 'admin';
        }
        return (`<div><strong style="color:blue">${elem.email}</strong> <font style="color:brown">${elem.dateTime}:</font> <em style="color:green">${elem.body}</em></div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
});

inputUsername.addEventListener('input', () => {
    const hayEmail = 1
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
});

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
});