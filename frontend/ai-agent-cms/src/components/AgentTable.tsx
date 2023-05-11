import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AgentForm from './AgentForm';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 30 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 30, sortable: false },
  {
    field: 'traits',
    headerName: 'Traits',
    width: 400,
    sortable: false
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 400,
    sortable: false
  },
];

export default function AgentTable() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/agents/${params.id}`);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5001/agents');
      console.log(response.data);
      setRows(response.data["agentList"]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={{ page: 0, pageSize: 5 }}
          onRowClick={handleRowClick}
        />
      )}
      <Button variant="contained" color="primary" onClick={handleClick}>
        作成
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>作成</DialogTitle>
        <DialogContent>
          <AgentForm onClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}