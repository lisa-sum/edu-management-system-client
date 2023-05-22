import { alpha, Box, Button, FormControl, InputBase, InputLabel, styled, Theme, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'

import SelectCollege from '@/components/selectCollege'
import { RootState } from '@/store'
import { BootstrapInputProps } from '@/type'
import { fetcher } from '@/utils/fether'
import { useAppSelector } from '@/utils/hooks'

// 布局组件
const GridBox = styled(Grid2)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
}))

// 输入框组件
const BootstrapInput = styled(InputBase)<BootstrapInputProps>(
  ({theme, mode}: {theme: Theme; mode: string}) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === mode ? '#fcfcfb' : '#2b2b2b',
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

export default function College() {
  const {mode} = useAppSelector((state: RootState) => state.theme.value)
  const [oldCollegeName, setOldCollegeName] = useState<string>('')
  const [collegeDescription, setCollegeInfo] = useState<string>('')
  const [newCollegeName, setNewCollegeName] = useState<string>('')

  const addCollegeInfo = useMutation({
    mutationFn: ({
      collegeDescription,
      newCollegeName,
    }: {
      collegeDescription: string
      newCollegeName: string
    }) => {
      return fetcher(
        import.meta.env.VITE_APP_COLLEGE,
        'PUT',
      )({
        newName: collegeDescription,
        description: newCollegeName,
      }).then((res) => {
        console.log(res)
      })
    },
  })

  const updateCollege = (newValue: string) => {
    setOldCollegeName(newValue)
  }

  const updateCollegeData = useMutation({
    mutationFn: ({
      oldCollegeName,
      newCollegeName,
      collegeDescription,
    }: {
      oldCollegeName: string
      newCollegeName: string
      collegeDescription: string
    }) => {
      return fetcher(
        import.meta.env.VITE_APP_COLLEGE,
        'POST',
      )({
        oldName: oldCollegeName,
        newName: newCollegeName,
        description: collegeDescription,
      })
        .then((res) => {
          console.log(res)
          return res.body
        })
        .catch((error) => {
          console.error(error)
        })
    },
  })

  return (
    <Box>
      <GridBox
        container
        spacing={3}
      >
        <Grid2
          lg={6}
          md={12}
        >
          <Typography>更新学院</Typography>
        </Grid2>
        <Grid2
          lg={6}
          md={12}
        >
          <SelectCollege updateCollege={setOldCollegeName} />
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
              学院名称
            </InputLabel>
            <BootstrapInput
              id="input"
              mode={mode}
              placeholder="输入新学院名称"
              // value={}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewCollegeName(event.target.value)
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
              学院介绍
            </InputLabel>
            <BootstrapInput
              id="input"
              mode={mode}
              placeholder="输入新学院介绍"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setCollegeInfo(event.target.value)
              }
            />
          </FormControl>

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
              onClick={() =>
                updateCollegeData.mutate({
                  oldCollegeName,
                  newCollegeName,
                  collegeDescription,
                })
              }
            >
              更新
            </Button>
          </Grid2>
        </Grid2>

        <Grid2
          lg={6}
          md={12}
        >
          <Typography>添加学院</Typography>
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
              学院名称
            </InputLabel>
            <BootstrapInput
              id="input"
              mode={mode}
              placeholder="输入新学院名称"
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
              学院介绍
            </InputLabel>
            <BootstrapInput
              id="input"
              mode={mode}
              placeholder="输入新学院介绍"
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
            onClick={() =>
              addCollegeInfo.mutate({
                collegeDescription,
                newCollegeName,
              })
            }
          >
            添加
          </Button>
        </Grid2>

        <Grid2
          lg={6}
          md={12}
        >
          <Typography>添加学院</Typography>
        </Grid2>

        <Grid2
          lg={6}
          md={12}
        >
          <SelectCollege updateCollege={updateCollege} />
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
            // onClick={() => deleteCollegeData(oldCollegeName)}
          >
            删除
          </Button>
        </Grid2>
      </GridBox>
    </Box>
  )
}
