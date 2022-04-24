import { makeStyles } from "@material-ui/styles";
import React from "react";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import {format} from 'date-fns'
import { Avatar } from "@material-ui/core";
const drawerWith = 240;
const useStyles = makeStyles((theme) => {
    return {
        page:{
            background:'#f9f9f9',
            width:'100%',
            padding: theme.spacing(3)
        },
        draw:{
            width: drawerWith,
    
        },
        drawPaper:{
            width:drawerWith
        },
        root:{
            display:'flex'
        },
        active:{
            background: '#f4f4f4'
        },
        title:{
            padding: theme.spacing(2)
        },
        appbar:{
            width: `calc(100% - ${drawerWith}px)`
        },
        toolbar: theme.mixins.toolbar,
        date:{
            flexGrow: 1
        },
        avatar:{
            marginLeft: theme.spacing(2),
        }
    }
})

const Layout = ({children}) => {
    const classes = useStyles();
    const history = useHistory()
    const location = useLocation();
    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color='secondary' />,
            path: '/'
        },
        {
            text: 'Create Notes',
            icon: <AddCircleOutlined color='secondary' />,
            path: '/create'
        }
    ]
    return (
        <div className={classes.root}>

            <AppBar
                className={classes.appbar}
                elevation = {0}
                >
                <Toolbar>
                    <Typography className={classes.date}>
                        CS:GO app for stats! Date {format(new Date(), 'do MMMM Y')}
                    </Typography>

                    <Typography>
                        Mario
                    </Typography>
                    <Avatar src="/denyo.png" className={classes.avatar}/>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.draw}
                variant = 'permanent'
                anchor="left"
                classes={{ paper: classes.drawPaper}}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                       AYP CSGO STATS
                    </Typography>
                </div>
                {/* list/ links */}

                <List>
                    {menuItems.map(item => (
                        <ListItem
                         key={item.text} 
                         button
                         onClick={()=> history.push(item.path) }
                         className={location.pathname === item.path ? classes.active : null}
                         >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}>

                </div>
                {children}
            </div>
        </div>
      );
}
 
export default Layout;