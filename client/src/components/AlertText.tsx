import {Alert, AlertColor, AlertTitle} from '@mui/material'
import {ReactNode, useState} from 'react'

import {toggleShow} from '@/features/feedback/alert'
import {useAppDispatch} from '@/utils/hooks'

export default function AlertText({
  state,
  text,
  children,
}: {
  state: AlertColor
  text?: string
  children?: ReactNode
}) {
  const [show, setShow] = useState<boolean>(false) // 关闭按钮
  const dispatch = useAppDispatch()
  if (show) return null
  return (
    <Alert
      severity={state || 'success'}
      onClose={() => {
        setShow(true)
        dispatch(toggleShow(!show))
      }}
    >
      <AlertTitle>{text || 'Success'}</AlertTitle>
      {children && null}
    </Alert>
  )
}
