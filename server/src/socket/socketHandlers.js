import { Message } from '../models/Message.js';

const connectedUsers = new Map();

export const handleConnection = (io, socket) => {
  console.log('🟢 Nueva conexión:', socket.id);
 
  socket.on('register', (username) => {
    connectedUsers.set(socket.id, username);    
    
    io.emit('users', Array.from(connectedUsers.values()));    
    
    socket.broadcast.emit('userJoined', username);
  });

  // Manejar mensajes nuevos
  socket.on('message', async (messageData) => {
    try {
      const { content, sender } = messageData;
      
      // Crear y guardar el mensaje en la base de datos
      const message = new Message({
        content,
        sender,
        createdAt: new Date()
      });
      
      await message.save();
      
      // Emitir el mensaje a todos los clientes
      io.emit('message', {
        content,
        sender,
        createdAt: message.createdAt
      });
    } catch (error) {
      console.error('Error al guardar mensaje:', error);
      socket.emit('error', 'Error al enviar mensaje');
    }
  });

  // Manejar desconexión
  socket.on('disconnect', () => {
    const username = connectedUsers.get(socket.id);
    if (username) {
      connectedUsers.delete(socket.id);
      io.emit('users', Array.from(connectedUsers.values()));
      socket.broadcast.emit('userLeft', username);
    }
    console.log('🔴 Usuario desconectado:', socket.id);
  });
}; 