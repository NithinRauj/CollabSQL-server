const ws = require('ws');
const setupWSConnection = require('y-websocket/bin/utils').setupWSConnection;

const SOCKET_PORT = 3000;

const initConnection = () => {
    const socket = new ws.WebSocketServer({ port: SOCKET_PORT });

    socket.on('connection', (conn, req) => {
        setupWSConnection(conn, req, { docName: 'sql-content', gc: true });
    });
}

module.exports = { initConnection };
