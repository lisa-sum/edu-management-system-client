import {
  Alert,
  AlertTitle,
  alpha,
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputBase,
  InputLabel,
  styled,
  TextField,
  Theme,
  Typography,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import {useQuery} from '@tanstack/react-query'
import {ChangeEvent, useState} from 'react'

import {updateSpecialtyOne} from '@/api/specialty'
import type {BootstrapInputProps, Specialty as SpecialtyType} from '@/type'
import {fetcher} from '@/utils/fether'

const GridBox = styled(Grid2)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
}))

const BootstrapInput = styled(InputBase)<BootstrapInputProps>(
  ({theme, mode}: {theme: Theme; mode: string}) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === mode ? '#FCFCFB' : '#2B2B2B',
      border: '1px solid #ced4da',
      width: '275px',
      fontSize: 18,
      [theme.breakpoints.down('lg')]: {
        width: '374px',
        fontSize: 18,
      },
      [theme.breakpoints.up('lg')]: {
        width: 'auto',
        minWidth: '300px',
        fontSize: 17,
      },
      [theme.breakpoints.up('xl')]: {
        width: '550px',
        fontSize: 24,
      },
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }),
)

export default function Specialty() {
  const [oldName, setOldName] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [info, setInfo] = useState<string>('')
  const {data, isLoading, error} = useQuery<SpecialtyType[]>(
    ['specialty'],
    async () => {
      return await fetcher<SpecialtyType[]>(import.meta.env.VITE_APP_SPECIALTY)(
        'all',
      ).then((res) => res.body)
    },
  )

  if (isLoading && !error) {
    return <Typography>等待数据加载中...</Typography>
  }

  if (error) {
    return <Typography>数据请求失败...</Typography>
  }

  // TODO 待修改
  const updateSpecialtyData = async (
    oldName: string,
    name: string,
    info: string,
  ) => {
    await updateSpecialtyOne(oldName, name, info)
      .then((res) => {
        console.log(res.body)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <Box>
      {isLoading && !error ? (
        <Alert
          severity="info"
          variant="filled"
        >
          <AlertTitle>数据加载中...</AlertTitle>
        </Alert>
      ) : (
        <Alert
          severity="error"
          variant="filled"
        >
          数据加载失败...
        </Alert>
      )}

      <Box>
        <GridBox
          container
          spacing={3}
        >
          <Grid2
            lg={6}
            md={12}
          >
            <Autocomplete
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.college}
              id="specialtyGroup"
              options={data as SpecialtyType[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="选择一个专业"
                />
              )}
              sx={{
                width: '400px',
              }}
              onChange={(_, value: SpecialtyType | null) =>
                setOldName(value?.name || '')
              }
            />
          </Grid2>

          <Grid2
            lg={6}
            md={12}
          >
            <FormControl variant="standard">
              <InputLabel
                shrink
                htmlFor="input"
              >
                修改专业名称
              </InputLabel>
              <BootstrapInput
                id="input"
                mode="light"
                placeholder="输入新的专业名称"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setName(event.target.value)
                }
              />
            </FormControl>
          </Grid2>
          <Grid2
            lg={6}
            md={12}
          >
            <FormControl variant="standard">
              <InputLabel
                shrink
                htmlFor="input"
              >
                修改专业介绍
              </InputLabel>
              <BootstrapInput
                id="input"
                mode="light"
                placeholder="输入专业介绍"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setInfo(event.target.value)
                }
              />
            </FormControl>
          </Grid2>
          <Grid2
            lg={6}
            md={12}
          >
            <Button
              sx={{
                width: '325px',
                height: '46px',
                fontSize: 18,
              }}
              variant="contained"
              onClick={() => updateSpecialtyData(oldName, name, info)}
            >
              提交修改
            </Button>
          </Grid2>
        </GridBox>
      </Box>
    </Box>
  )
}
