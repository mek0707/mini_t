import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'your_mongodb_connection_string';

// เชื่อมต่อ MongoDB (ถ้ายังไม่ได้เชื่อม)
if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const MessageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const messages = await Message.find().sort({ timestamp: 1 });
    return res.status(200).json(messages);
  }

  if (req.method === 'POST') {
    const { username, message } = req.body;
    if (!username || !message) return res.status(400).json({ error: 'Missing fields' });

    const newMessage = await Message.create({ username, message });
    return res.status(201).json(newMessage);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body; // รับ `_id` ที่ต้องการลบ
    if (!id) return res.status(400).json({ error: 'Missing message ID' });

    await Message.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Deleted successfully' });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
