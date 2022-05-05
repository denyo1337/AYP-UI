import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ProfileStats from "../../components/ProfileStats";
import useAxios from "../../hooks/useAxios";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Divider, Grid, Typography } from "@material-ui/core";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Label } from "@material-ui/icons";


const playerStatsViewError = "Player has blocked stats view or has private account.";
const better = "#b5e7a0";
const worse = "#d64161";


const useStyles = makeStyles((theme) => ({
    avatarImg: {
        textAlign: 'center',
        marginLeft: theme.spacing(35),
        marginBottom: theme.spacing(2),
        height: theme.spacing(10),
        width: theme.spacing(10)
    }
}));
const StatsComparer = () => {
    const classes = useStyles();
    const { pOne, pTwo } = useParams()
    const [playerOne, setPlayerOne] = useState(null);
    const [playerOneError, setPlayerOneError] = useState("");
    const [playerTwo, setPlayerTwo] = useState(null);
    const [playerTwoError, setPlayerTwoError] = useState("");
    const [playerTwoProfile, setPlayerTwoProfile] = useState(null);
    const { user } = useAuthContext();

    const { handlePlayerStats, handleSearchPlayer } = useAxios();
    
    const compareStats = (sectionName, statName) => {
        debugger;
        if(!playerOne || !playerTwo) return 'none'; 
        switch (sectionName) {
            case 'heavyGuns': {
                return playerTwo?.heavyGuns?.find(x => x.name === statName).value < playerOne?.heavyGuns?.find(x => x.name === statName).value ? better : worse;
            }
            case 'pistols': {
                return playerTwo?.pistols?.find(x => x.name === statName).value < playerOne?.pistols?.find(x => x.name === statName).value ? better : worse;
            }
            case 'rifles': {
                return playerTwo?.rifles?.find(x => x.name === statName).value < playerOne?.rifles?.find(x => x.name === statName).value ? better : worse;
            }
            case 'smgs': {
                return playerTwo?.smgs?.find(x => x.name === statName).value < playerOne?.smgs?.find(x => x.name === statName).value ? better : worse;
            }
            case 'snipers': {
                return playerTwo?.snipers?.find(x => x.name === statName).value < playerOne?.snipers?.find(x => x.name === statName).value ? better : worse;
            }
        }
    }

    useEffect(() => {
        setPlayerTwo(null)
        handlePlayerStats(pOne).then(data => {
            if (data) {
                setPlayerOne(data)
            } else {
                setPlayerOneError(playerStatsViewError);
            };
        }, err => {
            console.log(err);
        })

        handleSearchPlayer(pTwo).then(data => {
            setPlayerTwoProfile(data)
        }, err => {
            setPlayerTwoProfile(err)
        })

        handlePlayerStats(pTwo).then(data => {
            if (data) {
                setPlayerTwo(data)
            } else {
                setPlayerTwoError(playerStatsViewError);
            }
        }, err => {
            console.log(err);
        })
    }, [pOne, pTwo])

    return (

        <Grid container className={classes.root}>
            <Grid item xs={6} >
                <Avatar
                    className={classes.avatarImg}
                    src={user?.avatarImage}
                >
                </Avatar>
                <Typography
                    variant="h5"
                    style={{
                        textAlign: 'center',
                        marginBottom: "10px"
                    }}
                >
                    {user.steamNickName}
                </Typography>

                {playerOne &&
                    <ProfileStats
                        stats={playerOne}
                        compareStats={compareStats}
                    />}
                {playerOneError && <p>{playerOneError}</p>}
                <Divider
                    orientation="vertical"
                    variant='fullWidth'
                />
            </Grid>

            <Grid item xs={6}>
                <Avatar
                    src={playerTwoProfile?.avatarfullUrl}
                    className={classes.avatarImg}
                >
                </Avatar>
                <Typography
                    variant="h5"
                    style={{
                        textAlign: 'center',
                        marginBottom: "10px"
                    }}
                >
                    {playerTwoProfile?.steamNickName ?? "NotFound"}
                </Typography>
                {playerTwo && <ProfileStats
                    stats={playerTwo}
                    compareStats={false} />}
                {!playerTwo &&
                    <Typography
                        variant='h4'
                        color='error'
                        style={{
                            marginLeft: '25px',
                            textAlign: 'center',
                            marginTop: "400px"
                        }}
                    >
                        {`Player ${playerTwoProfile?.steamNickName} has blocked stats view.`}
                    </Typography>}
            </Grid>
        </Grid>
    );
}

export default StatsComparer;