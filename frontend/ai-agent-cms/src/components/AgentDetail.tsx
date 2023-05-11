import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";
import Chat from "./Chat";

type AgentDetail = {
  name: string;
  age: number;
  traits: string;
  status: string;
  summary: string;
};

function AgentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<AgentDetail>();
  const [memory, setMemory] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchAgent(id: string): Promise<AgentDetail> {
    const response = await axios.get(`http://localhost:5001/agents/${id}`);
    return response.data;
  }

  useEffect(() => {
    fetchAgent(id!).then((data) => setAgent(data)).catch((error) => console.error(error));
  }, [id]);

  const handleMemoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemory(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5001/agents/${id}/memories`,
        { memory }
      );
      console.log(response);
      fetchAgent(id!).then((data) => setAgent(data)).catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setMemory("")
  };

  return (
    <Box p={2}>
      {agent ? (
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h5">{agent.name}</Typography>
          <Typography variant="subtitle1">Age: {agent.age}</Typography>
          <Typography variant="subtitle1">Traits: {agent.traits}</Typography>
          <Typography variant="subtitle1">Status: {agent.status}</Typography>
          <Typography variant="subtitle1">Summary: {agent.summary}</Typography>
          <form onSubmit={handleSubmit}>
              <TextField
                label="Create Memory"
                variant="outlined"
                fullWidth
                margin="normal"
                value={memory}
                onChange={handleMemoryChange}
                disabled={loading}
              />
              <Button variant="contained" color="primary" type="submit" disabled={loading}>
                { loading ? "Sending..." : "Submit" }
              </Button>
          </form>
          <Chat agentId={id!} />
        </Box>
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
}

export default AgentDetailPage;
