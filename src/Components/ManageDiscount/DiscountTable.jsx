import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
  Snackbar,
  Alert
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { updateDiscount, deleteDiscount } from '../../Configs/axios';
import { Discount } from '@mui/icons-material';
import UpdateDiscountDialog from './UpdateDiscountDialog'

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

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
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const initialFormData = {
  discountId: '',
  createdBy: '',
  expiredDay: '',
  publishDay: '',
  amount: 0,
  cost: 0,
};

const DiscountTable = ({ discounts, reload }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(initialFormData);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleUpdateDiscount = (discount) => {
    setOpenDialog(true);
    setEditData({ ...initialFormData, ...discount});
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditData(initialFormData); 
  };

  const handleEditDiscount = async (formData) => {
    const requiredFields = ['name', 'type', 'price', 'rate'];
    const isFormValid = requiredFields.every((field) => formData[field] !== '' && formData[field] !== undefined);

    if (!isFormValid) {
      setSnackbarMessage('Please fill in all required fields.');
      setOpenSnackbar(true);
      return;
    }

    try {
      await updateDiscount(formData); 
      setSnackbarMessage('Discount updated successfully!');
      setOpenSnackbar(true);
      handleCloseDialog();
      reload();
    } catch (error) {
      console.error('Error updating discount:', error);
      setSnackbarMessage('Error updating discount.');
      setOpenSnackbar(true);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const discountList = Array.isArray(discounts) && discounts.length > 0 ? discounts : [];

  const emptyRows = rowsPerPage > 0 ? Math.max(0, (1 + page) * rowsPerPage - discountList.length) : 0;

  const displayRows = rowsPerPage > 0 ? discountList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : discountList;

  return (
    <>
      <UpdateDiscountDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onUdateDiscount={handleEditDiscount}
        formData={editData}
        setFormData={setEditData}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <TableContainer component={Paper} sx={{ maxHeight: 440, display: 'flex', flexDirection: 'column' }}>
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Discount ID</TableCell>
              <TableCell align="right">Created By</TableCell>
              <TableCell align="right">Expired Day</TableCell>
              <TableCell align="right">Publish Day</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.map((discount) => (
              <TableRow key={discount.discountId}>
                <TableCell>{discount.discountId}</TableCell>
                <TableCell align="right">{discount.createdBy}</TableCell>
                <TableCell align="right">{discount.expiredDay}</TableCell>
                <TableCell align="right">{discount.publishDay}</TableCell>
                <TableCell align="right">{discount.amount}</TableCell>
                <TableCell align="right">{discount.cost}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleUpdateDiscount(Discount)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
            {discountList.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No discounts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={discountList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
};

DiscountTable.propTypes = {
  discounts: PropTypes.array.isRequired,
  reload: PropTypes.func.isRequired,
};

export default DiscountTable;
