import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



export default function DialogForm(props) {
    const [open, setOpen] = React.useState(false);
    const [taskName, setTaskName] = React.useState('');
    const [taskDesc, setTaskDesc] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTaskName('');
        setTaskDesc('');
        if (props.open) {
            props.closeEdit();
        }

    };

    const handleChange = (type, value) => {

        if (type === 'taskName') {
            setTaskName(value)
        } else {
            setTaskDesc(value)
        }

    }

    useEffect(() => {
        if (props.open && props.selectedItemIndex != null) {
            setOpen(true);
            setTaskName(props.selectedItem.task);
            setTaskDesc(props.selectedItem.desc);
        }
    }, [props.open])


    const handleKeypress = e => {
        console.log(e)
        if (e.charCode === 13) {
            handleAdd();
        }
    };




    const handleAdd = () => {

        if (taskName.length > 0 && taskDesc.length > 0) {
            let newTask = {
                task: taskName,
                desc: taskDesc,
                done: false
            }

            if (props.open && props.selectedItemIndex != null) {
                props.editListItem(props.selectedItemIndex, newTask);
                alert('Done');
            } else {
                props.addToList(newTask);
                alert('Done');
            }

            setTaskName('');
            setTaskDesc('');
            handleClose();


        } else {
            alert('Fill all fields');
        }

    }



    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Task
            </Button>

            <Dialog className="dialogHeight" fullWidth open={open} onClose={handleClose}>
                <DialogTitle>{props.open && props.selectedItemIndex != null ? 'Edit Task' : 'Add New Task'}</DialogTitle>
                <DialogContent>
                    <p style={{fontStyle: 'italic'}}>NOTE: You can press enter while filling to submit the data</p>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Task Name"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={taskName}
                        onChange={(e) => handleChange('taskName', e.target.value)}
                        onKeyPress={handleKeypress}
                    />
                    <br />
                    <br />

                    <TextField

                        label="Task Description"
                        value={taskDesc}
                        multiline
                        fullWidth
                        rows={25}
                        rowsMax={50}
                        onKeyPress={handleKeypress}
                        onChange={(e) => handleChange('taskDesc', e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleAdd}>{props.open & props.selectedItemIndex != null ? 'Update' : 'Add'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
