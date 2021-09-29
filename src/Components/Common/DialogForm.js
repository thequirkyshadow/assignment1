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
        if (props.open) {
            setOpen(true);
            setTaskName(props.selectedItem.task);
            setTaskDesc(props.selectedItem.desc);
        }
    }, [props.open])

    // useEffect(() => {

    //     const listener = event => {
    //         if (event.code === "Enter" || event.code === "NumpadEnter") {
    //             event.preventDefault();
    //             console.log('!!!!!!!!!!!!!!!!');
    //             if (taskName.length > 0 && taskName.length > 0) {
    //                 console.log('bruh');
    //                 handleAdd();
    //             }

    //         }
    //     };
    //     document.addEventListener("keydown", listener);
    //     return () => {
    //         document.removeEventListener("keydown", listener);
    //     };
    // }, []);

    const handleAdd = () => {
        let newTask = {
            task: taskName,
            desc: taskDesc,
            done: false
        }

        if (props.open) {
            props.editListItem(props.selectedItemIndex, newTask);
            alert('Done');
        } else {
            props.addToList(newTask);
            alert('Done');
        }

        setTaskName('');
        setTaskDesc('');
        handleClose();
        
    }



    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Task
            </Button>

            <Dialog class="dialogHeight"  fullWidth open={open} onClose={handleClose}>
                <DialogTitle>{props.open ? 'Edit Task' : 'Add New Task'}</DialogTitle>
                <DialogContent>
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
                        onChange={(e) => handleChange('taskDesc', e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleAdd}>{props.open ? 'Update' : 'Add'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
