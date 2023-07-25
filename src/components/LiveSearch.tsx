'use client'

import { TextField, Stack, Autocomplete } from "@mui/material";

type Props = {
  list: string[]
  label: string
  onChange: any
}


export function LiveSearch({ list, label, onChange }: Props){
  return (
    <div>
      <Stack sx={{ width: 300, margin: 'auto' }}>
        <Autocomplete 
          id={`autocomplete_list`}
          options={list}
          sx={{width: 150}}
          renderInput={(params) => <TextField {...params} label={label} />}
          size="small"
          onChange={onChange}
        />
      </Stack>
    </div>
  )

}