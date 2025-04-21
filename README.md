Chat App
A real-time chat application that enables direct messaging between users, including user authentication, message history, typing indicators, and support for both text and image messages. 

Key Features:
User Authentication: Secure login and registration using JWT & Cookies for persistent sessions.

Direct Messaging: Real-time communication between users with one-on-one chat support.

Message History: Each user’s chat history is stored and accessible.

Text and Image Messages: Send and receive both text and image messages seamlessly.

Typing Indicators: Real-time typing status to indicate when a user is typing.

Skeleton Loaders: Smooth UX with skeleton loaders while waiting for messages to load.

Tech Stack:
Frontend:

React.js

Vite (for fast development and bundling)

Material UI (for responsive UI components)

Axios (for API requests)

Zustand (for global state management)

React Router (for navigation)

Backend:

Node.js

Express.js

JWT (for authentication)

Socket.io (for real-time communication)

MongoDB (for storing user and message data)

Authentication:

JWT (JSON Web Tokens) for secure user login

Cookies for session persistence
