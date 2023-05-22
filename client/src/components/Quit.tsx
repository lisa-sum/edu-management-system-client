import CloseIcon from '@mui/icons-material/Close'
import {Box} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import * as React from 'react'

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export type DialogTitleProps = {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const {children, onClose, ...other} = props

  return (
    <DialogTitle
      sx={{m: 0, p: 2}}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default function Quit() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleQuit = () => {
    localStorage.removeItem('state')
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    location.reload()
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        textDecoration: 'none',
        textAlign: 'center',
      }}
    >
      <span onClick={handleClickOpen}>退出</span>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={handleClose}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          退出
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>确定退出吗?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
          >
            不
          </Button>
          <Button
            autoFocus
            onClick={handleQuit}
          >
            是
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  )
}
