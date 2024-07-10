import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DiscountTable from '../Components/ManageDiscount/DiscountTable';
import { addDiscount, getDiscount } from '../Configs/axios';
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar';
import AddDiscountDialog from '../Components/ManageDiscount/AddDiscountDialog';

const ManageDiscount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('id');
  const [statusFilter, setStatusFilter] = useState('all'); // New state for status filter
  const [inputValue, setInputValue] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const transformedSearchParams = {
      [searchCriteria]: inputValue,
      status: statusFilter === 'all' ? undefined : statusFilter, // Include status filter if not 'all'
    };

    try {
      const response = await getDiscount(transformedSearchParams); // Ensure correct function name
      console.log('Search response data:', response.data);
      setDiscounts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const initialFormData = {
    discountId: '',
    createdBy: '',
    expiredDay: '',
    publishDay: '',
    amount: 0,
    cost: 0,
  };

  const loadDiscounts = async () => {
    setLoading(true);
    try {
      const result = await getDiscount(); // Ensure correct function name
      console.log('Load discounts data:', result.data);
      setDiscounts(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error('Error loading discounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewDiscount = async (formData) => {
    try {
      await addDiscount(formData);
      if(formData=== undefined){
        await loadDiscounts(); 
      handleCloseDialog();}
      console.log('New discount added successfully:', formData);
    } catch (error) {
      console.error('Error adding new discount:', error);
    }
  };

  useEffect(() => {
    loadDiscounts();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <ManagerSideBar />
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Paper>
          <AddDiscountDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            onAddDiscount={handleAddNewDiscount}
            initialFormData={initialFormData}
          />
          <Box sx={{ p: 2 }}>
            <Button variant="contained" onClick={handleOpenDialog}>
              Add New Discount
            </Button>
            <FormControl fullWidth margin="normal">
              <InputLabel>Search By</InputLabel>
              <Select
                value={searchCriteria}
                onChange={(e) => setSearchCriteria(e.target.value)}
                label="Search By"
              >
                <MenuItem value="id">Discount ID</MenuItem>
                <MenuItem value="productId">product Id</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Search Discount"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Box>
          <DiscountTable discounts={discounts} reload={loadDiscounts} />
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageDiscount;
