import React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { DeleteOutlined } from "@material-ui/icons";
import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { blue, green, pink, yellow } from "@material-ui/core/colors";


const useStyles = makeStyles({
    avatar: {
        background: (note) => {
            if (note.category === 'Work') {
                return yellow[700]
            }
            if (note.category === 'Money') {
                return green[500]
            }
            if (note.category === 'Todos') {
                return pink[500]
            }
            return blue[500]
        }
    }
})
const Notecard = ({note, handleDelete}) => {

    const classes = useStyles(note);
    return (  
        <div>
            <Card elevation={1} >
                <CardHeader 
                avatar = {
                    <Avatar className={classes.avatar}>
                        {note.category[0].toUpperCase()}
                    </Avatar>
                }
                     action={
                        <IconButton onClick={()=> handleDelete(note.id)}>
                            <DeleteOutlined/>
                        </IconButton>
                      }
                      title = {note.title}
                      subheader={note.category}
                />
                <CardContent>
                    <Typography 
                        variant='body2'
                        color='textsecondary'
                    >
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
 
export default Notecard;