import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import styles from '../React-menu/ReactMenu.module.scss'
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

export default function CustomizedMenus({ handleCategory }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          backgroundColor: '#333',
          '&:hover': {
            backgroundColor: '#ffdbf0',
            color: 'black',
          },
        }}
      >
        Products
      </Button>
      <div style={{ backgroundColor: '#333' }}>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleClose}
            sx={{
              background: 'white',
              '&:hover': {
                background: '#ececec',
              },
            }}
            disableRipple
          >
            <button
              value="Ring"
              style={{
                width: '100%',
                textAlign: 'left',
                '&:hover': {
                  background: '#ececec',
                },
              }}
              onClick={handleCategory}
            >
              All
            </button>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              background: 'white',
              '&:hover': {
                background: '#ececec',
              },
            }}
            disableRipple
          >
            <button
              value="Ring"
              style={{
                width: '100%',
                textAlign: 'left',
                '&:hover': {
                  background: '#ececec',
                },
              }}
              onClick={handleCategory}
            >
              Ring
            </button>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              background: 'white',
              '&:hover': {
                background: '#ececec',
              },
            }}
            disableRipple
          >
            <button
              value="Ring"
              style={{
                width: '100%',
                textAlign: 'left',
                '&:hover': {
                  background: '#ececec',
                },
              }}
              onClick={handleCategory}
            >
              Necklace
            </button>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              background: 'white',
              '&:hover': {
                background: '#ececec',
              },
            }}
            disableRipple
          >
            <button
              value="Ring"
              style={{
                width: '100%',
                textAlign: 'left',
              }}
              onClick={handleCategory}
            >
              Charm
            </button>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              background: 'white',
              '&:hover': {
                background: '#ececec',
              },
            }}
            disableRipple
          >
            <button
              value="Ring"
              style={{
                width: '100%',
                textAlign: 'left',
              }}
              onClick={handleCategory}
            >
              Earing
            </button>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              background: 'white',
              '&:hover': {
                background: '#ececec',
              },
            }}
            disableRipple
          >
            <button
              value="Ring"
              style={{
                width: '100%',
                textAlign: 'left',
              }}
              onClick={handleCategory}
            >
              Bracelet
            </button>
          </MenuItem>
        </StyledMenu>
      </div>
    </div>
  )
}
