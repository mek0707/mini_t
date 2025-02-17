// // import { createRequire } from 'module';
// // const require = createRequire(import.meta.url);
// // const WebSocket = require('ws');

// // const wss = new WebSocket.Server({ port: 8080 });

// // wss.on('connection', ws => {
// //   console.log('Client connected');
// //   ws.on('message', message => {
// //     console.log(`Received: ${message}`);
// //     ws.send(`Echo: ${message}`);e
// //   });
// // });

// // console.log('WebSocket server is running on ws://localhost:8080');

// const express = require('express');
// const WebSocket = require('ws');
// const mongoose = require('mongoose');

// // สร้าง Express app
// const app = express();
// const port = 5000;

// // เชื่อมต่อ MongoDB (ใช้ URI ที่เหมาะสม)
// mongoose.connect('mongodb://localhost:27017/chatDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const MessageSchema = new mongoose.Schema({
//   username: String,
//   message: String,
//   timestamp: { type: Date, default: Date.now },
// });

// const Message = mongoose.model('Message', MessageSchema);

// // สร้าง WebSocket Server
// const wss = new WebSocket.Server({ noServer: true });

// wss.on('connection', (ws) => {
//   console.log('User connected');

//   // ส่งข้อความที่เก็บใน MongoDB ไปให้ผู้ใช้
//   Message.find().then((messages) => {
//     ws.send(JSON.stringify(messages));
//   });

//   // รับข้อความจาก client และบันทึกลง MongoDB
//   ws.on('message', (data) => {
//     const { username, message } = JSON.parse(data);
//     const newMessage = new Message({ username, message });
//     newMessage.save().then(() => {
//       // ส่งข้อความไปยัง client ทั้งหมด
//       wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//           client.send(JSON.stringify([{ username, message }]));
//         }
//       });
//     });
//   });
// });

// // ใช้ express ให้รับการเชื่อมต่อ HTTP
// app.server = app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// // แยก WebSocket ให้ทำงานร่วมกับ HTTP server
// app.server.on('upgrade', (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit('connection', ws, request);
//   });
// });

const mongoose = require("mongoose");

// เชื่อมต่อกับ MongoDB Atlas
mongoose
  .connect("mongodb+srv://wongsatorn0987279538:<db_password>@cluster0.kknvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
