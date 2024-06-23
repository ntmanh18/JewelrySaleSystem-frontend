/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import { addUser, getAllUsers } from '../Configs/axios'
import UserTable from '../Components/UserTable/UserTable';
import AddUserDialog from '../Components/UserTable/AddUserDialog';
const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  };
  const handleCloseDialog = () => {
    setOpenDialog(false)
  };
  const initialFormData = {
    role: '',
    fullName: '',
    doB: '',
    phone: '',
    address: ''
  };
  const roleMapping = [
    { id: 1, label: 'Staff' },
    { id: 2, label: 'Manager' },
    { id: 3, label: 'Admin' }
  ]
  const loadAllUsers = async () => {
    setLoading(true)
    const result = await getAllUsers()
    setUsers(result.data.data)
    setLoading(false)
  }
  const handleAddUser = async (formData) => {
    try {
      const result = await addUser(formData);
      if (result.code === 400) {
        window.alert(result.message);
      } else {
        console.log(result.data);
        handleCloseDialog();
        loadAllUsers();
      }
    }
    catch (error) {
      window.alert(error)
      console.error('Error adding user:', error)
    }
  }
  useEffect(() => {
    loadAllUsers()
  }, [])
  if (loading) return <div>Loading....</div>;
  return (
    <>
      <Button onClick={handleOpenDialog}>
        Add User
      </Button>
      <AddUserDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onAddUser={handleAddUser}
        initialFormData={initialFormData}
        roleMapping={roleMapping} // Pass roleMapping to AddUserDialog

      />
      <UserTable users={users} />
    </>
  )
}
export default ManageUsers