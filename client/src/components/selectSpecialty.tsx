import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useQuery } from '@tanstack/react-query'
import { FC, SyntheticEvent } from 'react'

import type { Specialty as SpecialtyType } from '@/type'
import { Specialty } from '@/type'
import { CustomError, fetcher } from '@/utils/fether'

/** 根据college状态请求数据
 * @description
 * @since 2023/5/19 0:51
 * @param query {Record<string, any> | string } 对象或字符串的params形式
 * @return 专业列表数据
 *  */
const getSpecialty = async <T, > (query: Record<string, any> | string) => {
  let params: Record<string, any> | string = 'all'
  if (query !== 'all'){
    return await fetcher<T>(import.meta.env.VITE_APP_CLASS)({ 'college': query })
    .then(async(res) => {
      return res.body
    })
    .catch((err) => {
      console.error(err)
    })
  }
  return await fetcher<T>(import.meta.env.VITE_APP_CLASS)(params)
  .then(async(res) => {
    return res.body
  })
  .catch((err) => {
    console.error(err)
  })
}

type SpecialtyProps = {
  college: Record<string, any> | string
  updateSpecialty: (newValue: string) => void
}

const ShowSpecialty: FC<SpecialtyProps> = ({college, updateSpecialty}) => {
  const {data, isSuccess, isLoading} = useQuery<
    readonly SpecialtyType[],
    CustomError
  >(['getSpecialty', college], () =>
    getSpecialty<SpecialtyType[] | CustomError>(college)
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.error(err)
      }),
  )

  if (isLoading) {
    return <p>Loading</p>
  }

  if (isSuccess) {
    return (
      <Autocomplete
        disablePortal
        getOptionLabel={(option) => option.name}
        id="select-class"
        options={data}
        renderInput={(params) => (
          <TextField
            {...params}
            label="选择专业"
          />
        )}
        sx={{width: '400px'}}
        onChange={(
          _event: SyntheticEvent<Element, Event>,
          newValue: Specialty | null,
        ) => updateSpecialty(newValue?.name || '')}
      />
    )
  }
  return <p>Error</p>
}

export default function SelectSpecialty({
  college,
  updateSpecialty,
}: SpecialtyProps) {
  console.log('college1', college)
  if (college && college !== '') {
    return (
      <ShowSpecialty
        college={college}
        updateSpecialty={updateSpecialty}
      />
    )
  }
  return <p>请选择学院</p>
}
