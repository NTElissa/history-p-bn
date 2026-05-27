import Message from '../models/messageModule.js';

export const createMessage = async (req, res) => {
  try {
    const { recipient, content } = req.body;
    const newMessage = new Message({
      sender: req.user._id,
      recipient,
      content
    });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ $or: [{ sender: req.user._id }, { recipient: req.user._id }] }).populate('sender recipient', 'name email');
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate('sender recipient', 'name email');
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    if (!message.sender.equals(req.user._id) && !message.recipient.equals(req.user._id)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    if (!message.sender.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    await message.remove();
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
