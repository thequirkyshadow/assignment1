import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';


export default function ToDoCard(props) {
    return (
        <Card sx={{ width: 'auto', margin: '1px' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.header}
                </Typography>

                <Typography style={{ overflowWrap: 'break-word' }} variant="body2">
                    {props.desc.slice(0, 160) + '.....'}
                </Typography>
            </CardContent>
            <CardActions sx={{ flexDirection: 'row-reverse' }}>
                {props.status ? null : <Button onClick={() => { props.onComplete(props.index) }}>  <DoneIcon /> </Button>}
                {props.status ? null : <Button onClick={() => { props.onEdit(props.index) }}>  <EditIcon /> </Button>}
                <Button> <DeleteIcon onClick={() => { props.onDelete(props.index) }} /></Button>

            </CardActions>
        </Card>
    );
}