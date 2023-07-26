'use client'

import { TextField, Stack, Autocomplete } from "@mui/material";

type Props = {
  list: string[]
  label: string
  multiple: boolean
  onChange: any
}


export function LiveSearch({ list, label, multiple, onChange }: Props){
  return (
    <div>
      <Stack sx={{ width: 300, margin: 'auto' }}>
        <Autocomplete
          multiple={multiple}
          id={`autocomplete_list`}
          options={list}
          renderInput={(params) => <TextField {...params} label={label} />}
          size="small"
          onChange={onChange}
          className="class-search"
        />
      </Stack>
    </div>
  )
}