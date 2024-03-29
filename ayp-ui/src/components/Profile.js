import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useAuthContext } from "../hooks/useAuthContext";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider, Grid, Paper, Typography, Tooltip} from "@material-ui/core";
import { ButtonBase } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { handleSearchPlayer, handlePlayerStats } from "../ayb-requests/requestHandlers";
import Loader from "./Loader";
import ProfileStats from "./ProfileStats";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginLeft: theme.spacing(60),
        marginTop: theme.spacing(30)
    },
    container: {
        width: '100%',
        height: '800px'
    },
    profileContainer: {
        width: '100%',
        height: "800px"
    },
    avatar: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(-8),
        width: theme.spacing(30),
        height: theme.spacing(30)
    },
    profieInfo: {
        display: 'inline',
        gridColumn: 2
    }
}));

const Profile = () => {
    const { steamId } = useParams();
    const { user } = useAuthContext();
    const [profileData, setProfileData] = useState(null);
    const [profileStats, setProfileStats] = useState(null);
    const [loader, setLoader] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        setLoader(true);
        handleSearchPlayer(steamId ?? user.steamId).then(data => {
            setProfileData(data);
            handlePlayerStats(data.steamId).then(data => {
                setProfileStats(data);
            }, err => {
                setProfileStats(null);   
            })
        }, err => {
            history.push(`/searchErr/${steamId}`)
            console.log(err);
        });
        setLoader(false);
    }, [steamId, user])
    return (
        <Container className={classes.container}  >
            {loader && <Loader />}
            {profileData &&
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.profileContainer}>
                            <div>
                                <ButtonBase className={classes.avatar}>
                                    <a href={profileData.profileUrl} target="_blank" style={{
                                        textDecoration: 'none',
                                        cursor: 'pointer'
                                    }} >
                                        <img className={classes.avatar} src={profileData?.avatarfullUrl}
                                            style={{
                                                border: profileData.isOnline ? "4px solid #adff2f" : "4px solid gray",
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </a>
                                    <Divider />
                                </ButtonBase>
                                <div style={{
                                    marginLeft: "40px",
                                    marginBottom: '70px',
                                    marginTop: '10px',
                                    display: "inline-block"
                                }}>
                                    <Typography
                                        variant='h2'
                                        color="primary"
                                    >
                                        {profileData.steamNickName}
                                    </Typography>
                                    <Typography
                                        variant='h6'
                                        color="primary"
                                    >
                                        {profileData.realName ?? "No information about real name"}
                                    </Typography>
                                    <Typography
                                        variant='h6'
                                        color="primary"
                                    >
                                        Creation Date: {profileData.accountCreated ?? "No info "}
                                    </Typography>
                                    {profileStats && (
                                        <div>
                                            <Typography
                                                variant='h6'
                                                color="primary"
                                            >
                                                HS%: {profileStats?.hsPercentage} | KD ratio: {profileStats?.kd} | Played Hours (in matches): <strong>{profileStats.realTimeGamePlayed} </strong> hours.
                                            </Typography>
                                            <Tooltip
                                                arrow={true}
                                                placement='right-start'
                                                title={`Compare with ${profileData.steamNickName}`}
                                            >
                                                <span>
                                                    <Button
                                                        variant='outlined'
                                                        style={{
                                                            marginTop: '10px'
                                                        }}
                                                        disabled={!profileStats || profileData.steamId === user?.steamId || !user}
                                                        onClick={() => history.push(`/profile/${user?.steamId}/comparewith/${steamId}`)}
                                                    >
                                                        Compare stats
                                                    </Button>
                                                </span>

                                            </Tooltip>
                                        </div>
                                    )
                                    }
                                </div>
                                <Typography
                                    variant='h6'
                                    color="primary"
                                    style={{
                                        marginLeft: "65px",
                                        marginTop: "20px"
                                    }}
                                >
                                    Nationality: {profileData.steamNationality ?? "Not provided"}
                                </Typography>
                                <Divider />
                                {profileStats
                                    &&
                                    <ProfileStats stats={profileStats} compareStats ={ (p, e) => p > e } />
                                }
                                {!profileStats && <Typography
                                    variant='h6'
                                    color='error'
                                > {`Player '${profileData.steamNickName}' has private account / hidden stats / has not played CS:GO yet.`}</Typography>}
                            </div>
                        </Paper>
                    </Grid >
                </Grid>}
        </Container>
    );
}

export default Profile;