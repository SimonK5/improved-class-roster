import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box } from '@mui/material';
type Props = {
    options: string[],
    onChange: Function,
    exclusive: boolean
}

export default function OptionToggle({ options, onChange, exclusive }: Props){
    const [levels, setLevels] = React.useState<string[]>(() => []);
    let optionComponents = [];

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newLevels: string[],
      ) => {
        onChange(event, newLevels);
        setLevels(newLevels);
      };

    for(const element of options){
        optionComponents.push(<ToggleButton key={element} value={element} aria-label={`${element}`}>
            <p>{element}</p>
        </ToggleButton>);
    }
    return (
        <ToggleButtonGroup
            exclusive={exclusive}
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