import {
  Autocomplete,
  Box,
  createTheme,
  Grid,
  InputAdornment,
  Link,
  List,
  ListItem,
  styled,
  TextField,
  Theme,
  ThemeProvider,
  Typography,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import * as echarts from 'echarts'
import {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import adminIco from '@/assets/icons/admin.svg' // 管理员默认头像
import emailIco from '@/assets/icons/email.svg'
import notificationIco from '@/assets/icons/notification.svg'
import searchIco from '@/assets/icons/search.svg'
import sendIco from '@/assets/icons/send.svg'
import studentIco from '@/assets/icons/student.svg'
import teacherIco from '@/assets/icons/teacher.svg'
import themeModeIco from '@/assets/icons/themeModeIco.svg'
import Footer from '@/components/Layout/Footer'
import {toggleThemeMode} from '@/features/theme/mode'
import Chat from '@/pages/im/chat'
import {RootState} from '@/store'
import type {RouteList} from '@/type'
import {useAppSelector} from '@/utils/hooks'

type ListIcons = {
  uri: string
  alt: string
  path: string
}

// 列表子项组件
const ListItemComp = ({item}: {item: {label: string; path: string}}) => {
  const location = useLocation()
  return (
    <ListItem
      sx={{
        mb: '10px',
        width: '200px',
        height: '50px',
        borderRadius: '7px',
        bgcolor: location.pathname === item.path ? '#f3f3f5' : 'transparent',
      }}
    >
      <Link
        component={RouterLink}
        sx={{
          width: '200px',
          height: '50px',
          lineHeight: '50px',
          textDecoration: 'none',
          ml: '20px',
        }}
        to={item.path}
      >
        {item.label}
      </Link>
    </ListItem>
  )
}

// 侧边栏组件
function Aside({routes}: {routes: RouteList[]}) {
  return (
    <Box
      component="section"
      sx={{
        gridArea: 'left',
        borderRight: '5px solid #f3f3f5',
      }}
    >
      {/* logo */}
      <Box
        sx={{
          pt: '90px',
        }}
      >
        <Typography
          sx={{
            color: '#4C4E88',
            fontSize: '32px',
            fontWeight: 'bold',
            // textAlign: 'center',
          }}
        >
          教务管理系统
        </Typography>
      </Box>

      {/* Router */}
      <Grid
        container
        alignItems="center"
        direction="column"
        justifyContent="center"
        sx={{
          xs: {
            width: '150px',
          },
        }}
      >
        <List>
          {routes.map((item) => (
            <ListItemComp
              key={item.label}
              item={item}
            />
          ))}
          <ListItemComp item={{label: '设置', path: '/settings'}} />
          <ListItemComp item={{label: '退出', path: '/quit'}} />
        </List>
      </Grid>
    </Box>
  )
}

// 搜索框组件
function Search({routes}: {routes: RouteList[]}) {
  return (
    <Autocomplete
      disableClearable
      freeSolo
      options={routes.map((option) => option.label)}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            type: 'search',
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  component="img"
                  src={searchIco}
                  sx={{
                    p: '15px',
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  )
}

// 主体内容组件
function Container({routes}: {routes: RouteList[]}) {
  const chartRef = useRef<HTMLElement | null>(null)
  const location = useLocation()
  let cite = '首页'
  routes.map((item) => {
    if (item.path === location.pathname) {
      cite = item.label
    }
    return undefined
  })
  useEffect(() => {
    const option: any = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
          itemStyle: {
            color: (params: any) => {
              const colors = [
                '#C23531',
                '#2F4554',
                '#61A0A8',
                '#D48265',
                '#91C7AE',
                '#749F83',
                '#CA8622',
              ]
              return colors[params.dataIndex]
            },
          },
        },
      ],
    }
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)
      chart.setOption(option)
    }
  }, [])
  return (
    <Box>
      <Box
        component="section"
        sx={{
          gridArea: 'content',
          height: '50vh',
          pt: '85px',
          pr: '75px',
          borderRight: '5px solid #f3f3f5',
        }}
      >
        {/* 标题 */}
        <Grid2 container>
          <Grid2
            md={5}
            xs={6}
          >
            <Typography
              sx={{
                ml: '70px',
                fontSize: '48px',
              }}
            >
              {cite}
            </Typography>
          </Grid2>
          <Grid2
            md={7}
            xs={6}
          >
            <Search routes={routes} />
          </Grid2>
        </Grid2>

        <Box
          sx={{
            ml: '70px',
          }}
        >
          <Routes>
            {routes.map((item: RouteList) => (
              <Route
                key={item.label}
                element={item.element}
                path={item.path}
              >
                {item.label}
              </Route>
            ))}
            <Route
              element={<Chat />}
              path="/ws/chat"
            />
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}

// 通知组件
const Notifications = ({toggleTheme}: {toggleTheme: () => void}) => {
  let avatarIco = studentIco // 用户对应默认头像
  const navigate = useNavigate()
  const {role, avatar} = useAppSelector(
    (state: RootState) => state.profile.value,
  ) // 用户角色
  if (avatar === '') {
    avatarIco = avatar
  } else {
    switch (role) {
      case 'admin': {
        avatarIco = adminIco
        break
      }
      case 'teacher':
        avatarIco = teacherIco
    }
  }
  const listIcons: ListIcons[] = [
    {path: '/', uri: notificationIco, alt: '通知列表'},
    {path: '/ws/chat', uri: sendIco, alt: '发送消息'},
    {path: '/', uri: emailIco, alt: '邮件列表'},
  ]

  const toggleUri = (path: string) => {
    navigate(path)
  }

  return (
    <Box
      component="section"
      sx={{
        gridArea: 'right',
        height: '50vh',
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: '85px',
            pl: '50px',
            width: '150px',
          }}
        >
          {listIcons.map((item) => (
            <Box
              key={item.alt}
              alt={item.alt}
              component="img"
              src={item.uri}
              sx={{
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                ':active': {
                  transform: 'scaleX(1.25)',
                  animation: '1.5s ease scaleX',
                },
                '@keyframes scaleX': {
                  '50%': {
                    bgcolor: '#BEEDC7',
                  },
                  '60%': {
                    borderRadius: '50%',
                    border: '1px solid #BEEDC7',
                  },
                  'to': {
                    borderRadius: '50%',
                    border: '1px solid #BEEDC7',
                  },
                },
              }}
              onClick={() => toggleUri(item.path)}
            />
          ))}
          <Box
            alt="切换模式"
            component="img"
            src={themeModeIco}
            onClick={toggleTheme}
          />
        </Box>
        {/* 用户头像 */}
        <Box
          sx={{
            width: '37px',
            height: '37px',
          }}
        >
          <Box
            alt="用户头像"
            component="img"
            src={avatarIco}
            sx={{
              ml: '60px',
              borderRadius: '50%',
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
// 页面总体布局排列组件
const StyledSlider = styled(Box)(({theme}) => ({
  display: 'grid',
  height: '100vh',
  backgroundColor: useAppSelector(
    (state: RootState) => state.theme.value.bgcolor,
  ),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '150px minmax(775px, 920px)',
    gridTemplateAreas: `'left content'
			'left right'`,
  },
  [theme.breakpoints.up('lg')]: {
    width: '100vw',
    gridTemplateColumns: `250px auto 415px`,
    gridTemplateAreas: `'left content right'`,
  },
}))

export default function Index({routes}: {routes: RouteList[]}) {
  // 切换主题模式
  const dispatch = useDispatch()
  const theme = useAppSelector((state: RootState) => state.theme.value)
  const themeReactive: Theme = createTheme({
    breakpoints: {
      values: {
        xs: 360,
        sm: 768,
        md: 1000,
        lg: 1400,
        xl: 2000,
      },
    },
    palette: {
      mode: theme.mode,
    },
  })
  const [flog, setFlog] = useState<boolean>(false)
  const toggleTheme = () => {
    if (flog) {
      dispatch(
        toggleThemeMode({
          mode: 'light',
          color: '#757575',
        }),
      )
      setFlog(false)
    } else {
      dispatch(
        toggleThemeMode({
          mode: 'dark',
          color: '#FAFAFA',
        }),
      )
      setFlog(true)
    }
  }

  return (
    <ThemeProvider theme={themeReactive}>
      <StyledSlider>
        <Aside routes={routes} />
        <Container routes={routes} />
        <Notifications toggleTheme={toggleTheme} />
        <Footer />
      </StyledSlider>
    </ThemeProvider>
  )
}
