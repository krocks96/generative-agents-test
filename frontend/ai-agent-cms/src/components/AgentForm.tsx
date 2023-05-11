import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

type Props = {
  onClose: () => void;
};

const AgentForm: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    traits: '',
    status: '',
    memory: ''
  });

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/agents', formData);
      console.log(res.data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <TextField
        required
        fullWidth
        margin="normal"
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleInputChange}
      />
      <TextField
        required
        fullWidth
        margin="normal"
        label="Traits"
        name="traits"
        value={formData.traits}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Init Memory"
        name="memory"
        value={formData.memory}
        onChange={handleInputChange}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AgentForm;
