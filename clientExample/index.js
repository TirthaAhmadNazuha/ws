const webSocketEventHandler = (roomName) => {
  const ws = new WebSocket(`ws://localhost:8081/addMedia?${roomName}`);//
  ws.onopen = () => {
    console.log('Connected WebSocket');
  };
  ws.onmessage = (message) => {
    console.log(message.data);
  };
  document.forms.fill?.addEventListener('submit', (e) => {
    e.preventDefault();
    ws.send(`submited ${roomName}`);//
    setTimeout(() => {
      ws?.close();
      console.log('webSocket closed');
    }, 400);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document.forms.media?.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.target.classList.add('off');
    e.target.previousElementSibling.innerText = 'Fill Require';
    document.forms.fill?.classList.remove('off');
    webSocketEventHandler(e.target[0].value.replace(' ', ''));
  });
});
