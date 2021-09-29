import ToDoCard from '../Common/ToDoCard';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DialogForm from '../Common/DialogForm';


const ToDoList = props => {
    const [open, setOpen] = React.useState(false);

    const [selectedItem, setSelectedItem] = React.useState(null);
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(null);
    const [list, setList] = React.useState([]);
    
    const onComplete = (index) => { // Code for when we click on task complete
        let copyList = Array.from(list);
        copyList[index]['done'] = true;
        setList(copyList);

        localStorage.setItem('list', JSON.stringify(copyList));
        alert('Done');
    }

    const onDelete = (index) => { // Code for when we click on delete
        let copyList = Array.from(list);
        copyList.splice(index, 1);
        setList(copyList);
        localStorage.setItem('list', JSON.stringify(copyList));
        alert('Done');

    }


    const onEdit = (index) => { // Code for when we click on edit button on card to open dialog
        setSelectedItem(list[index]);
        setSelectedItemIndex(index);
        setOpen(true);
    }

    const editListItem = (index, item) => { //Code for edit functionality
        let copyList = Array.from(list);
        copyList.splice(index, 1, item);
        setList(copyList);
        localStorage.setItem('list', JSON.stringify(copyList));

    }

    const closeEdit = () => { //code for closing edit dialog
        setOpen(false);
    }
    const addToList = (item) => { //code for add functionality
        let copyList = Array.from(list);
        copyList.push(item);
        setList(copyList);
        console.log('setting', copyList);
        localStorage.setItem('list', JSON.stringify(copyList));
    }


    useEffect(() => {
      
        if (open === false) {
            setSelectedItem(null);
            setSelectedItemIndex(null);
        }
    }, [open])

    useEffect(() => {

        //code for getting list from storage on page load
        let savedList = localStorage.getItem('list', list);
        
        if (savedList && savedList.length > 0) {

            setList(JSON.parse(savedList));

        }

    }, [])

    









    return (

        <Box >
            <DialogForm selectedItemIndex={selectedItemIndex} selectedItem={selectedItem} open={open} closeEdit={closeEdit} addToList={addToList} editListItem={editListItem} />
            <br />
            <br />
            <Grid container spacing={2}>


                {list && list.length > 0 && list.map((el, i) => {

                    if (el.done === false) {
                        return (<Grid key={i} item xs={12} md={6} lg={3}>
                            <ToDoCard  onEdit={onEdit} onDelete={onDelete} onComplete={onComplete} index={i} header={el.task} desc={el.desc} status={el.done} id={i} />
                        </Grid>)

                    } else return null



                })}

            </Grid>
            <br />
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Completed</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>

                        {list.length > 0 && list.map((el, i) => {
                            if (el.done === true) {
                                return (<Grid key={i} item xs={12} md={6} lg={3}>
                                    <ToDoCard onDelete={onDelete} onComplete={onComplete} index={i} header={el.task} desc={el.desc} status={el.done} id={i} />

                                </Grid>)

                            } else return null

                        })}

                    </Grid>
                </AccordionDetails>
            </Accordion>


        </Box>


    )
};



export default ToDoList
