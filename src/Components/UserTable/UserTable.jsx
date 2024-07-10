import { useEffect, useState } from 'react'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  Button
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { activeDeactiveUser } from '../../Configs/axios'
import ActiveDeactiveDialog from './ActiveDeactiveDialog'
import UpdateRoleDialog from './UpdateRoleDialog'


function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}
const UserTable = ({ users }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [openRoleDialog, setOpenRoleDialog] = useState(false)

  const handleOpenDialog = (userId) => {
    setSelectedUser(userId)
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedUser(null)
  }
  const handleActiveDeactive = async () => {
    if (selectedUser) {
      try {
        const result = await activeDeactiveUser(selectedUser)
        console.log(result)
      } catch (error) {
        console.error('Error active/deactive user', error)
      } finally {
        handleCloseDialog()
      }
    }
  }
  const handleOpenRoleDialog = (user) => {
    setSelectedUser(user)
    setOpenRoleDialog(true)
  }

  const handleCloseRoleDialog = () => {
    setOpenRoleDialog(false)
    setSelectedUser(null)
  }
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const formatStatus = (status) => (status ? 'Active' : 'Inactive');

  // Ensure products is an array
  const userList = Array.isArray(users) ? users : []
  useEffect(() => {
    activeDeactiveUser()
  }, [])
  return (
    <>
      <ActiveDeactiveDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onConfirm={handleActiveDeactive}
      />

      <UpdateRoleDialog
        open={openRoleDialog}
        onClose={handleCloseRoleDialog}
        user={selectedUser}
      />

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 440, display: 'flex', flexDirection: 'column' }}
      >
        <Table stickyHeader aria-label="UserTable">
          <TableHead>
            <TableRow>
              <TableCell align="right">User Id</TableCell>
              <TableCell align="right">User Name</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Full Name</TableCell>
              <TableCell align="right">Date of birth</TableCell>
              <TableCell align="right">Phone number</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
            {(rowsPerPage > 0
              ? userList.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              : userList
            ).map((user) => (
              <TableRow key={user.userId}>
                <TableCell component="th" scope="row">
                  {user.userId}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {user.username}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {user.role}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {user.fullName}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {user.doB}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {user.phone}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {user.address}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {formatStatus(user.status)}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  <Button onClick={() => handleOpenRoleDialog(user)}>Update Role</Button>
                  <Button onClick={() => handleOpenDialog(user.userId)}>Active/Deactive</Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={11} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={11}
                count={userList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true
                  }
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

    </>
  )
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
}

export default UserTable
