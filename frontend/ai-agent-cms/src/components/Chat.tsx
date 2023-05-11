import axios from "axios";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
} from "@mui/material";

type ChatProps = {
  agentId: string;
};

type ChatMessage = {
  message: string;
  timestamp: string;
};

export default function Chat({ agentId }: ChatProps) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleChatSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // 自分のメッセージの送信
    const sendMessage: ChatMessage = {
      message: message,
      timestamp: new Date().toISOString(),
    };
    setChatMessages((prevChatMessages) => [...prevChatMessages, sendMessage]);
    try {
      const response = await axios.post(`http://localhost:5001/agents/${agentId}/messages`, {
        message: message,
      });
      const receiveMessage: ChatMessage = {
        message: response.data.reply,
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prevChatMessages) => [...prevChatMessages, receiveMessage]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setMessage("");
  };

  return (
    <Box>
      <Typography variant="h6">Chat</Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        width="100%"
        height="300px"
        border="1px solid grey"
        p={2}
        overflow="scroll"
      >
        {chatMessages.map((chatMessage, index) => (
          <Box key={index}>
            <Typography variant="body1">{chatMessage.message}</Typography>
            <Typography variant="caption">{chatMessage.timestamp}</Typography>
          </Box>
        ))}
      </Box>
      <form onSubmit={handleChatSubmit}>
        <Box display="flex" alignItems="flex-end">
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            margin="normal"
            value={message}
            onChange={handleMessageChange}
            disabled={loading}
          />
          <Box ml={2}>
            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
