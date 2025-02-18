// import React, {useState, useEffect} from "react";

// const ChatApp = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // โหลดข้อความจาก localStorage เมื่อโหลดหน้า
//     const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
//     setMessages(savedMessages);

//     // เปิดการเชื่อมต่อ WebSocket
//     const ws = new WebSocket("ws://localhost:8080");
//     // const ws = new WebSocket("wss://mini-proapp.vercel.app:8080");

//     ws.onopen = () => {
//       console.log("Connected to WebSocket server");
//     };

//     ws.onmessage = (event) => {
//       const newMessage = event.data;
//       const timestamp = new Date().toLocaleTimeString(); // สร้าง timestamp
//       setMessages((prevMessages) => [...prevMessages, {text: newMessage, time: timestamp}]);
//     };

//     ws.onclose = () => {
//       console.log("Disconnected from WebSocket server");
//     };

//     setSocket(ws);

//     // Clean up the WebSocket connection when component unmounts
//     return () => {
//       ws.close();
//     };
//   }, []);

//   const handleSendMessage = () => {
//     if (message.trim() && socket) {
//       const timestamp = new Date().toLocaleTimeString(); // สร้าง timestamp
//       socket.send(message);

//       const newMessage = {text: message, time: timestamp};
//       setMessages((prevMessages) => {
//         const updatedMessages = [...prevMessages, newMessage];
//         localStorage.setItem("messages", JSON.stringify(updatedMessages)); // บันทึกข้อความใน localStorage
//         return updatedMessages;
//       });

//       setMessage(""); // ลบข้อความใน input
//       alert("ส่งข้อความสำเร็จแล้ว!"); // แสดงข้อความแจ้งเตือนเมื่อส่งสำเร็จ
//     }
//   };

//   const handleClearMessages = () => {
//     setMessages([]);
//     localStorage.removeItem("messages"); // ลบข้อความทั้งหมดจาก localStorage
//   };

//   return (
//     <div className="w-full md:w-[1000px]  bg-white shadow-lg rounded-lg dark:dark:bg-slate-500 dark:text-white">
//       <span className="flex justify-center bg-gray-200 dark:bg-slate-500 p-4 rounded-t-xl">ข้อ 5 Real-Time Chat</span>
//       <div className="p-4 dark:bg-slate-700">
//         <div className="chat-container" style={{padding: "20px"}}>
//           <div className="grid">
//             <div className="">
//               <div className="messages" style={{marginBottom: "20px", maxHeight: "200px", overflowY: "scroll"}}>
//                 {messages.map((msg, index) => (
//                   <div key={index} className="message" style={{marginBottom: "10px", padding: "5px", border: "1px solid #ddd"}}>
//                     <strong>{msg.time}:</strong> {msg.text}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row gap-2">
//               <input className="w-full md:w-3/5 border px-2 rounded-md" type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="พิมข้อความ" />
//               <div className="flex w-full md:w-2/5 gap-2">
//                 <button onClick={handleSendMessage} className="p-4 rounded-md bg-green-500 w-1/2">
//                   ส่ง
//                 </button>
//                 <button onClick={handleClearMessages} className="p-4 rounded-md bg-red-500 w-1/2">
//                   ลบข้อความทั้งหมด
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatApp;

// // version offline
// // import React, {useState, useEffect} from "react";

// // const ChatApp = () => {
// //   const [user1Message, setUser1Message] = useState("");
// //   const [user2Message, setUser2Message] = useState("");
// //   const [messages, setMessages] = useState([]);

// //   // เมื่อโหลดหน้าเพจครั้งแรก ให้ดึงข้อมูลข้อความจาก LocalStorage
// //   useEffect(() => {
// //     const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
// //     setMessages(storedMessages);
// //   }, []);

// //   // ฟังก์ชันสำหรับการส่งข้อความ
// //   const sendMessage = (message, user) => {
// //     const newMessage = {sender: user, message};
// //     const newMessages = [...messages, newMessage];
// //     setMessages(newMessages);
// //     localStorage.setItem("messages", JSON.stringify(newMessages));

// //     // ล้างข้อความหลังจากส่ง
// //     if (user === "User 1") setUser1Message("");
// //     if (user === "User 2") setUser2Message("");
// //   };

// //   return (
// //     <div style={{display: "flex", justifyContent: "space-between", padding: "20px"}}>
// //       {/* ฝั่ง User 1 */}
// //       <div style={{flex: 1, borderRight: "1px solid #ccc", paddingRight: "10px"}}>
// //         <h2>User 1</h2>
// //         <div style={{marginBottom: "10px", maxHeight: "300px", overflowY: "auto"}}>
// //           {/* {messages.filter(msg => msg.sender === 'User 1').map((msg, index) => (
// //             <div key={index} style={{ textAlign: 'left', marginBottom: '10px' }}>
// //               <strong>{msg.sender}:</strong> {msg.message}
// //             </div>
// //           ))} */}
// //           {messages.map((msg, index) => (
// //             <div
// //               key={index}
// //               style={{
// //                 textAlign: msg.sender === "User 2" ? "right" : "left", // แสดงข้อความจาก User 2 ขวา, User 1 ซ้าย
// //                 marginBottom: "10px",
// //                 backgroundColor: msg.sender === "User 2" ? "#e6f7ff" : "#f7f7f7", // สีพื้นหลังแตกต่างกัน
// //                 padding: "5px",
// //                 borderRadius: "5px",
// //               }}
// //             >
// //               <strong>{msg.sender}:</strong> {msg.message}
// //             </div>
// //           ))}
// //         </div>
// //         <input type="text" value={user1Message} onChange={(e) => setUser1Message(e.target.value)} placeholder="Type a message" style={{width: "100%"}} />
// //         <button onClick={() => sendMessage(user1Message, "User 1")} style={{width: "100%", marginTop: "10px"}}>
// //           Send
// //         </button>
// //       </div>

// //       {/* ฝั่ง User 2 */}
// //       <div style={{flex: 1, paddingLeft: "10px"}}>
// //         <h2>User 2</h2>
// //         <div style={{marginBottom: "10px", maxHeight: "300px", overflowY: "auto"}}>
// //           {messages.map((msg, index) => (
// //             <div
// //               key={index}
// //               style={{
// //                 textAlign: msg.sender === "User 1" ? "right" : "left", // แสดงข้อความจาก User 2 ขวา, User 1 ซ้าย
// //                 marginBottom: "10px",
// //                 backgroundColor: msg.sender === "User 1" ? "#e6f7ff" : "#f7f7f7", // สีพื้นหลังแตกต่างกัน
// //                 padding: "5px",
// //                 borderRadius: "5px",
// //               }}
// //             >
// //               <strong>{msg.sender}:</strong> {msg.message}
// //             </div>
// //           ))}
// //         </div>
// //         <input type="text" value={user2Message} onChange={(e) => setUser2Message(e.target.value)} placeholder="Type a message" style={{width: "100%"}} />
// //         <button onClick={() => sendMessage(user2Message, "User 2")} style={{width: "100%", marginTop: "10px"}}>
// //           Send
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatApp;

import React, {useState, useEffect} from "react";

const ChatApp = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // ฟังก์ชันโหลดข้อความจาก API
  const fetchMessages = () => {
    fetch("/api/chat")
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  };

  // โหลดข้อความครั้งแรกเมื่อ Component โหลด
  useEffect(() => {
    fetchMessages();

    // ตั้ง interval ให้โหลดข้อความทุก 3 วินาที (อัปเดต real-time)
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
  }, []);

  // ฟังก์ชันส่งข้อความ
  const handleSendMessage = () => {
    if (username && message) {
      fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, message}),
      })
        .then((response) => response.json())
        .then((newMessage) => {
          setMessages((prevMessages) => [...prevMessages, newMessage]); // อัปเดต State
          setMessage(""); // ล้างข้อความใน input
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  const handleDeleteMessage = (id) => {
    fetch("/api/chat", {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id}),
    })
      .then((res) => res.json())
      .then(() => {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== id));
      })
      .catch((error) => console.error("Error deleting message:", error));
  };

  return (
    <div className="w-full md:w-[1000px]  bg-white shadow-lg rounded-lg dark:dark:bg-slate-500 dark:text-white grid grid-cols-1 md:grid-cols-2">
      <span className="md:col-span-2 flex justify-center bg-gray-200 dark:bg-slate-500 p-4 rounded-t-xl">ข้อ 5 Real-Time Chat</span>
      <div className="col-span-1 dark:bg-slate-700">
        <div className="flex flex-col p-4">
          <span className="text-[18px] p-4 text-center">UserName</span>
          <input className="dark:text-black p-2" type="text" placeholder="Enter your name" value={username} onChange={(e) => setUsername(e.target.value)} />

          <input className="dark:text-black p-2" type="text" placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} />
          <span className="pt-4">
            <button className="text-[18px] rounded-lg bg-green-500 p-2 w-full" onClick={handleSendMessage}>
              Send
            </button>
          </span>
        </div>
      </div>
      <div className="h-[30vh] overflow-auto col-span-1 dark:bg-slate-400 w-full">
        <span className="col-span-2 sticky top-0 dark:bg-white w-full dark:text-black flex justify-center p-4 bg-gray-200">Chat Messages</span>
        <div className="p-4">
          <ul>
            {messages.map((msg) => (
              <li key={msg._id} className="border-b-2 p-2">
                <strong>{msg.username}: </strong> {msg.message}
                <button className="pl-2" onClick={() => handleDeleteMessage(msg._id)}>❌</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
