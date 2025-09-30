import React from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';



const DropList = ({ list, defaultValue, callback, label = "dropdown" }) => {

    const [state, setState] = React.useState(defaultValue || list[0].value);

    const handleChange = (event) => {
        callback(event.target.value);
        setState(event.target.value);
    };

    return (
        <div>
            <TextField
                id="outlined-select-currency"
                select
                label={label}
                value={state || null}
                onChange={handleChange}
                sx={{
                    width: 200,
                }}
                defaultValue={'All'}

            >
                {list.map((option, idx) => (
                    <MenuItem key={idx} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div >
    )
}

export default DropList