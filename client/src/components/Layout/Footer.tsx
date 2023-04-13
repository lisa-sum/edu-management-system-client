import {Box, Link, Typography} from '@mui/material'

import beianIco from '@/assets/icons/beian.png'

export default function Footer() {
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100vw',
        height: '52px',
        mx: 'auto',
        lineHeight: '52px',
        color: '#646a73',
        bottom: 0,
        columnCount: 3,
        bgcolor: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      <Typography
        sx={{
          display: 'inline-block',
          color: '#646a73',
          lineHeight: '52px',
        }}
      >
        桂ICP备2022004535号
      </Typography>
      <Box>
        <Box
          alt="备案图标"
          component="img"
          src={beianIco}
          sx={{
            width: 'auto',
            height: 'auto',
          }}
        />
        <Link
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45062102000015"
          sx={{
            display: 'inline-block',
            color: '#646a73',
          }}
          target="_blank"
        >
          桂公网安备45062102000015号
        </Link>
      </Box>

      <Link
        href="https://beian.miit.gov.cn/"
        sx={{
          display: 'inline-block',
          color: '#646a73',
        }}
        target="_blank"
      >
        桂ICP备2022004535号-2
      </Link>
    </Box>
  )
}
