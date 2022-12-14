import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

/*
    1. Get all workers from firebase
    2. Add it to the DropDown component
    3. When clicking 1+ workers, add the ID of worker to the list
    4. When showing, retrieve data from workers ID
    5. When removing, removing from the list
*/

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

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelection({ names = names, selectedParticipants = [], setSelectedParticipants, label }) {
    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedParticipants(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    error={!selectedParticipants.length}
                    helperText={!selectedParticipants.length && 'You must enter atleast one worker'}
                    multiple
                    value={selectedParticipants}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label={label} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map((item) => (
                        <MenuItem
                            key={item.id}
                            value={item.name + "-" + item.email}
                            style={getStyles(item, selectedParticipants, theme)}
                        >
                            {item.name + "-" + item.email}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
