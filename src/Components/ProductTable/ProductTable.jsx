import { useEffect, useState } from 'react'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import EditProductDialog from './EditProductDialog'
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
  Button,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { editProduct } from '../../Configs/axios'

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

const initialFormData = {
  productName: '',
  category: '',
  material: '',
  weight: '',
  machiningCost: '',
  size: '',
  amount: '',
  desc: '',
  image: '',
  gem: {
    additionalProp1: 0,
    additionalProp2: 0,
    additionalProp3: 0,
  },
  markupRate: '',
}

const ProductTable = ({ products }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openDialog, setOpenDialog] = useState(false)
  const [editData, setEditData] = useState(initialFormData)

  const handleEdit = (product) => {
    handleOpenDialog()

    setEditData({
      ...initialFormData,
      ...product,
    })
  }
  const handleOpenDialog = () => {
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleEditProduct = async (formData) => {
    const requiredFields = [
      'productName',
      'category',
      'material',
      'weight',
      'machiningCost',
      'size',
      'amount',
      'desc',
      'image',
    ]
    const isAnyFieldEmpty = requiredFields.some((field) => !formData[field])
    if (isAnyFieldEmpty) {
      window.alert('Please fill out all required fields.')
      return
    }
    try {
      const result = await editProduct(formData) // Pass formData to the editProduct function
      console.log(result.data)
      // Close the dialog
      handleCloseDialog()
    } catch (error) {
      console.error('Error editing product:', error)
      // Handle error state or display error message to user
    }
  }

  // Ensure products is an array
  const productList = Array.isArray(products) ? products : []

  useEffect(() => {
    editProduct()
  }, [])

  return (
    <>
      <EditProductDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onEditProduct={handleEditProduct}
        formData={editData}
        setFormData={setEditData}
      />

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 440, display: 'flex', flexDirection: 'column' }}
      >
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Material</TableCell>
              <TableCell align="right">Weight</TableCell>
              <TableCell align="right">Machining Cost</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
            {(rowsPerPage > 0
              ? productList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : productList
            ).map((product) => (
              <TableRow key={product.productId}>
                <TableCell component="th" scope="row">
                  {product.productId}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {product.productName}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {product.category}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {product.material}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {product.weight}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {product.price}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {product.size}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {product.amount}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {product.desc}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {product.image}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  <Button onClick={() => handleEdit(product)}>Edit</Button>
                  <Button>Delete</Button>
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
                count={productList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
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

ProductTable.propTypes = {
  products: PropTypes.array.isRequired,
}

export default ProductTable
