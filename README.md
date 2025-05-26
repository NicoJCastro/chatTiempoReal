# Chat en Tiempo Real

Aplicación de chat en tiempo real desarrollada con React, Node.js, Socket.IO y MongoDB.

## Características

- Chat en tiempo real con WebSockets
- Persistencia de mensajes en base de datos MongoDB
- Lista de usuarios conectados en tiempo real
- Historial de mensajes
- Interfaz moderna con Tailwind CSS

## Tecnologías Utilizadas

### Frontend
- React 18
- Tailwind CSS
- Socket.IO Client
- Vite

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB
- Mongoose

## Estructura del Proyecto

```
/
├── client/           # Frontend React
│   ├── src/         # Código fuente del cliente
│   ├── public/      # Archivos públicos
│   └── package.json # Dependencias del cliente
│
├── server/          # Backend Node.js
│   ├── src/        # Código fuente del servidor
│   │   ├── models/     # Modelos de MongoDB
│   │   ├── socket/     # Manejadores de Socket.IO
│   │   └── index.js    # Punto de entrada del servidor
│   └── package.json # Dependencias del servidor
│
└── README.md        # Este archivo
```

## Requisitos Previos

- Node.js (versión 14 o superior)
- MongoDB instalado y corriendo localmente
- npm o yarn

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd chat-tiempo-real
   ```

2. Instalar dependencias del servidor:
   ```bash
   cd server
   npm install
   ```

3. Instalar dependencias del cliente:
   ```bash
   cd ../client
   npm install
   ```

4. Configurar variables de entorno:
   - En la carpeta server, crear un archivo .env:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/chat-app
     CLIENT_URL=http://localhost:5173
     ```

## Ejecución

1. Iniciar el servidor (en una terminal):
   ```bash
   cd server
   npm run dev
   ```

2. Iniciar el cliente (en otra terminal):
   ```bash
   cd client
   npm run dev
   ```

3. Abrir el navegador en http://localhost:5173

## Uso

1. Ingresar un nombre de usuario para conectarse
2. Ver la lista de usuarios conectados en el panel derecho
3. Enviar y recibir mensajes en tiempo real
4. Los mensajes se guardan automáticamente en la base de datos

## Características Técnicas

- Comunicación bidireccional en tiempo real con Socket.IO
- Persistencia de mensajes en MongoDB
- Interfaz responsive con Tailwind CSS
- Estado manejado con React Hooks
- Arquitectura modular y escalable 