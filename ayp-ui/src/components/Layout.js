import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { Divider, Grid, List, ListItem, ListItemIcon, ListItemText, TextField } from "@material-ui/core";
import { Pages, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { format } from 'date-fns'
import { Avatar } from "@material-ui/core";
import { useAuthContext } from "../hooks/useAuthContext";
import InputIcon from '@material-ui/icons/Input';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PollIcon from '@material-ui/icons/Poll';
import FriendsList from "../pages/FriendsList/FriendsList";
import useAxios from '../hooks/useAxios'


const drawerWith = 370;
const menuItems = [
    {
        text: 'Home',
        icon: <SubjectOutlined color='primary' />,
        path: '/'
    },
    {
        text: 'My Stats',
        icon: <PollIcon color="primary" />,
        path: '/my-stats'
    },
    {
        text: 'Account',
        icon: <AccountBoxIcon color='primary' />,
        path: '/my-account'
    },
]
const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9', //'#f9f9f9'
            width: '100%',
            padding: theme.spacing(3)
        },
        draw: {
            width: drawerWith,

        },
        drawPaper: {
            width: drawerWith,

        },
        root: {
            display: 'flex',

        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWith}px)`,
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2),
        },
        logout: {
            marginLeft: theme.spacing(2)
        },
        searchInputs:{
            width:'30%',
            marginRight:'5px',
            display: "inline-block",
            height:'41px'
        },
        searchDiv:{
            marginTop:'30px',
            marginBottom:"-10px"
        }
    }
})

const Layout = ({ children }) => {
    const classes = useStyles();
    const history = useHistory()
    const location = useLocation();
    const {axiosInstance : axios, handleGetFriendsQuery} = useAxios();

    const { user, dispatch } = useAuthContext();
    
    const [friendList, setFriendList] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [sortBy, setSortBy] = useState("isonline");
    const [sortDirection, setSortDirection] = useState(0);
    const [searchPhrase, setSearchPhrase] = useState('');
    

    const handleSortBy = (e) => {
      setSortBy(e.target.value);
    };
    const handleSortDirection = (e) =>{
        setSortDirection(e.target.value)
    }
    const handleChangePage = (newPage) => {
        setPageNumber(newPage);
    };
    const handleChangeRowsPerPage = (e) => {
        setPageSize(parseInt(e.target.value, 10));
        setPageNumber(0);
    };

    const handleSearchPhrase = (e) => {
        setSearchPhrase(e.target.value);
    }


    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
        history.push("/");
    }
    useEffect(() => {
        debugger;
        if (user) {
            const queryParams = {
                pageSize,
                pageNumber,
                sortBy,
                sortDirection,
                searchPhrase
            }
            handleGetFriendsQuery(user.steamId, queryParams)
                .then(data => {
                    setFriendList(data);
                }, err => {
                    console.log(err);
                });
        }else{
            setFriendList(null);
        }
        console.log(sortBy, searchPhrase, sortDirection, pageNumber, pageSize);
    }, [user, pageSize, pageNumber, searchPhrase, sortBy, sortDirection])


    return (
        <div className={classes.root}>

            <AppBar
                className={classes.appbar}
                style={{
                    background: 'white',
                    color: 'black'
                }}

                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                        CS:GO app for stats! Date {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    {user && (
                        <Typography>
                            Welcome {!user.nickName ? user.email : user.nickName} !
                        </Typography>
                    )}
                    {user &&
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            className={classes.logout}
                            endIcon={<MeetingRoomIcon />}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>}
                    {!user &&
                        <List style={{ display: "flex" }}>
                            <ListItem
                                onClick={() => history.push("/login")}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    startIcon={<VpnKeyIcon />}
                                >
                                    Sign In
                                </Button>
                            </ListItem>
                            <ListItem

                                onClick={() => history.push("/register")}
                            >
                                <Button
                                    color='secondary'
                                    variant="contained"
                                    startIcon={<InputIcon />}
                                >
                                    Register
                                </Button>
                            </ListItem>
                        </List>
                    }
                    {/* <Typography>
                        Mario
                    </Typography> */}
                    <Avatar src={user?.avatarImage ?? '/Account-icon.svg'} className={classes.avatar} />


                </Toolbar>
                <Divider/>
            </AppBar>

            <Drawer
                className={classes.draw}
                variant='permanent'
                anchor="left"
                classes={{ paper: classes.drawPaper }}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        AYP CSGO STATS
                    </Typography>
                </div>
                <Divider/>
                {/* list/ links */}

                <List>
                    {menuItems.map(item => (
                        <ListItem
                            key={item.text}
                            button
                            onClick={() => history.push(item.path)}
                            className={location.pathname === item.path ? classes.active : null}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                
                {/* Friend list goes here */}
                <Divider/>
              
               <Divider/>
                    {user &&
                    <Grid >
                        <FriendsList
                            friends={friendList}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage = {handleChangeRowsPerPage}
                            handleSortBy = {handleSortBy}
                            handleSortDirection={handleSortDirection}
                            handleSearchPhrase = {handleSearchPhrase}
                            sortBy = {sortBy}
                            pageNumber = {pageNumber}
                            pageSize = {pageSize}
                            sortDirection = {sortDirection}
                            searchPhrase = {searchPhrase}
                        />
                    </Grid>
                    }
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