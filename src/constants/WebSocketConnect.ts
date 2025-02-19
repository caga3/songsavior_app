import {SOCKET_URL, WEBSOCKET_TOKEN} from '../../global';

const WebSocketConnect = (uid: number) => {
  // Connect to WebSocket server
  let socket = new WebSocket(
    `${SOCKET_URL}/?token=${WEBSOCKET_TOKEN}&uid=${uid}`,
  );

  socket.onopen = () => {
    console.log('WebSocket Connected');
  };

  // Handle incoming messages
  socket.onmessage = (json: any) => {
    console.log(json);
    if (json.data) {
      const dataMessage = JSON.parse(json.data);
      console.log('Message from server:', dataMessage);
      if (dataMessage.messages) {
        //this.formatPositionData(dataMessage.position);
      } else if (dataMessage.chat) {
        //this.formatLimitData(dataMessage.limit);
      }
    }
  };

  // Handle Disconnection
  socket.onclose = () => {
    console.log('Disconnected from server');
    setTimeout(() => {
      if (!socket || socket.readyState === WebSocket.CLOSED) {
        socket = new WebSocket(
          `${SOCKET_URL}/?token=${WEBSOCKET_TOKEN}&uid=${uid}`,
        );
      }
    }, 3000);
  };

  // Handle Errors
  socket.onerror = () => {
    // console.error('Socket error:', error);
    if (socket) {
      socket.close();
    }
  };

  return socket;
};

export default WebSocketConnect;
