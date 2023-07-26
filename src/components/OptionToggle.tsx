import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box } from '@mui/material';
type Props = {
    options: string[],
    onChange: Function
}

export default function OptionToggle({ options, onChange }: Props){
    const [levels, setLevels] = React.useState(() => ['']);
    let optionComponents = [];

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newLevels: string[],
      ) => {
        onChange(event, newLevels);
        setLevels(newLevels);
      };

    for(let i = 0; i < options.length; i++){
        optionComponents.push(<ToggleButton value={options[i]} aria-label={`${options[i]}`}>
            <p>{options[i]}</p>
        </ToggleButton>);
    }
    return (
        <ToggleButtonGroup  
            className="class-search"
            size="small"
            value={levels}
            onChange={handleChange}
            aria-label="text alignment"
            >
                {optionComponents}
        </ToggleButtonGroup>
        
      );
}