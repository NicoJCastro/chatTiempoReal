import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import toast, { Toaster } from 'react-hot-toast'

const SOCKET_URL = 'http://localhost:3000'

function App() {
  const [socket, setSocket] = useState(null)
  const [username, setUsername] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

  // Cargar historial de mensajes
  const loadMessageHistory = async () => {
    try {
      const response = await fetch(`${SOCKET_URL}/api/messages`);
      const data = await response.json();
      setMessages(data.reverse()); // Revertimos para mostrar los más antiguos primero
    } catch (error) {
      console.error('Error al cargar el historial:', error);
      toast.error('Error al cargar el historial de mensajes');
    }
  };

  useEffect(() => {
    const newSocket = io(SOCKET_URL)
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    socket.on('users', (users) => {
      setUsers(users)
    })

    socket.on('userJoined', (username) => {
      toast.success(`${username} se ha unido al chat`, {
        icon: '👋',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    })

    socket.on('userLeft', (username) => {
      toast.error(`${username} ha abandonado el chat`, {
        icon: '👋',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    })

    return () => {
      socket.off('message')
      socket.off('users')
      socket.off('userJoined')
      socket.off('userLeft')
    }
  }, [socket])

  const handleConnect = async (e) => {
    e.preventDefault()
    if (!username.trim()) return
    
    socket.emit('register', username)
    setIsConnected(true)
    await loadMessageHistory() // Cargar historial al conectarse
    toast.success('¡Conectado al chat!', {
      icon: '🎉',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    socket.emit('message', {
      content: message,
      sender: username
    })
    setMessage('')
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Toaster position="top-right" />
        <form onSubmit={handleConnect} className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Unirse al Chat</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu nombre"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Conectar
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <div className="p-4 h-[500px] overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 p-3 rounded-lg ${
                    msg.sender === username 
                      ? 'bg-blue-500 text-white ml-auto' 
                      : 'bg-gray-200'
                  } max-w-[70%]`}
                >
                  <div className="font-bold">{msg.sender}</div>
                  <div>{msg.content}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
          <div className="p-4 border-l border-gray-200">
            <h2 className="font-bold mb-4">Usuarios en línea</h2>
            {users.map((user, index) => (
              <div key={index} className="flex items-center space-x-2 p-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{user}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
