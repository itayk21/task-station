import React from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';



const DropList = ({ list, defaultValue, callback }) => {

    const [state, setState] = React.useState(defaultValue);

    const handleChange = (event) => {
        callback(event.target.value);
        setState(event.target.value);
    };

    return (
        <div>
            <TextField
                id="outlined-select-currency"
                select
                label="Status"
                value={state}
                onChange={handleChange}

            >
                {list.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div >
    )
}

export default DropList