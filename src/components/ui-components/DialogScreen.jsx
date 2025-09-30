import React from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DialogScreen = ({ onSuccessCallback, open, setOpen, title, message, agreeLabel = 'Yes', disagreeLabel = 'No' }) => {
    const handleAgree = () => {
        onSuccessCallback();
        setOpen(false);
    };

    const handleDisagree = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleDisagree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree}>{disagreeLabel}</Button>
                    <Button onClick={handleAgree} autoFocus>
                        {agreeLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default DialogScreen