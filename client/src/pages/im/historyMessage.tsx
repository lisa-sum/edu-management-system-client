import {useState} from 'react'

import type {MessageBasic} from '@/type'

const getHistoryMessage = () => {
  // 获取消息列表
  fetch('http://127.0.0.1:4000/historyMessage', {
    method: 'GET',
  })
    .then(async (res) => {
      const result = await res.json()
      // 判断服务器返回的状态码, ok即200
      if (result.code === 200) {
        return result
      }
      throw new Error('请求失败')
    })
    .then((res) => {
      console.log(JSON.parse(res.body))
      //			setMessageList(JSON.parse(res.body))
    })
    // 异常处理
    .catch((err) => {
      window.alert(err)
      console.error(err)
    })
}

export default function HistoryMessage() {
	const [historyMessage] = useState<MessageBasic[]>([
    {
      userIdentity: '用户id', // 用户id 一对一
      roomIdentity: '群聊/房间id', // 群聊/房间id 一对多
      data: '消息数据', // 消息数据
      createdTime: new Date().toLocaleString() as string, // 创建时间
      updatedTime: new Date().toLocaleString() as string, // 更新时间
    },
  ])
  return (
    <section>
      <button onClick={getHistoryMessage}>getHistoryMessage</button>
      <ol>
        {historyMessage?.map((item, index) => {
          return (
            <li key={index}>
              <span>用户ID:{item.userIdentity}</span>
              <p>房间ID:{item.roomIdentity}</p>
              <p>消息:{item.data}</p>
              <p>创建时间:{new Date(item.createdTime).toLocaleString()}</p>
              <p>
                更新时间:
                {item.updatedTime &&
                  new Date(item.updatedTime).toLocaleString()}
              </p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
