import {Avatar, Box, List, ListItem, Typography} from '@mui/material'
import {Suspense, useEffect, useState} from 'react'

import Room from '@/components/Room'
import {activeRoom} from '@/features/im/room'
import {RootState} from '@/store'
import type {RoomBasic} from '@/type'
import {useAppDispatch, useAppSelector} from '@/utils/hooks'

export default function Chat() {
  const dispatch = useAppDispatch()
  const {name: roomName} = useAppSelector(
    (state: RootState) => state.room.value,
  )
  const [roomList, setRoomList] = useState<RoomBasic[]>([])
  // 进入房间
  const intoRoom = (name: string, number: string) => {
    dispatch(activeRoom({name, number}))
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_WS_Chat_RoomList}?number=all`)
      .then(async (response) => {
        const res = await response.json()
        if (res.code === 406) {
          throw new Error(res.message || '请求失败')
        }
        return res
      })
      .then((res) => {
        console.log(res)
        setRoomList(res.body)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])
  return (
    <Box
      sx={{
        width: '1440px',
        display: 'grid',
        bgcolor: '#ccc',
        gridTemplateRows: '60px 480px 200px',
        gridTemplateColumns: 'minmax(280px, 380px) minmax(740px, 1060px)',
        gridTemplateAreas: `"sidebar header"
				"sidebar main"
				"sidebar footer"`,
      }}
    >
      <Box
        component="section"
        sx={{
          gridArea: 'sidebar',
          bgcolor: '#000',
        }}
      >
        <List
          sx={{
            width: '380px',
          }}
        >
          <Suspense fallback="正在查询ing...">
            {roomList?.map((item: RoomBasic) => (
              <ListItem
                key={item.number}
                sx={{
                  position: 'relative',
                  width: '380px',
                  height: '90px',
                  py: '15px',
                  ':hover': {
                    bgcolor: '#555',
                  },
                }}
                onClick={() => intoRoom(item.name, item.number)}
              >
                <Avatar
                  alt={item.name}
                  src={item.avatar}
                  sx={{
                    width: '60px',
                    height: '60px',
                  }}
                />
                <Typography
                  sx={{
                    ml: '15px',
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    position: 'absolute',
                    right: '20px',
                  }}
                >{`${new Date(item.updatedTime).getHours()}:${new Date(
                  item.updatedTime,
                ).getMinutes()}`}</Typography>
              </ListItem>
            ))}
          </Suspense>
        </List>
      </Box>

      <Box
        component="section"
        sx={{
          gridArea: 'header',
          textAlign: 'center',
          bgcolor: '#000',
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            color: '#fff',
            lineHeight: '60px',
          }}
        >
          {roomName}
        </Typography>
      </Box>

      {roomName === '' ? null : <Room />}
    </Box>
  )
}
