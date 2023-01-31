import 'rc-time-picker/assets/index.css';

import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import './TimePicker.css';


export const PickTime = ({ setValue }) => {
    return <TimePicker
        style={{ width: 150 }}
        showSecond={false}
        defaultValue={moment()}
        className="xxx"
        onChange={(val) => setValue(val.format('HH:mm'))}
    />
}