import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

type Props = {
    selectOptions: string[],
    onChange: Function,
    name: string
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ selectOptions, onChange, name }: Props) {
  const theme = useTheme();
  const [optionName, setOptionName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof optionName>) => {
    const {
      target: { value },
    } = event;
    setOptionName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    onChange(value);
  };

  return (
    <div className="class-search">
      <FormControl sx={{ m: 1, width: 300 }} size="small">
        <InputLabel id="demo-multiple-chip-label">{name}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={optionName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {selectOptions.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, optionName, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}