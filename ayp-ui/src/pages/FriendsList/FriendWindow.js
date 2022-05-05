import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button, ButtonGroup, Divider, Tooltip } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CompareIcon from '@material-ui/icons/Compare';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useAuthContext } from '../../hooks/useAuthContext';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
    maxWidth: 300,
    border: '1px solid black',
    marginBottom: theme.spacing(1)

  },
  image: {
    width: 48,
    height: 48,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  img: {
    margin: 'auto',
    maxWidth: '48px',
    maxHeight: '48px',
    borderImage: 'inherit',
    borderRadius: '5px',
    cursor: "pointer"
  },
}));
const playerStatsDisabled = "Players stats are disabled because player account is set to private."
const FriendWindow = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();
  const {user: mainUser} = useAuthContext();
  return (
    <div className={classes.root} key={user?.steamId}>
      <Paper className={classes.paper} >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <a href={user.profileUrl} target="_blank" style={{
                textDecoration: 'none',
                cursor: 'pointer'
              }} >
                <img className={classes.img} src={user?.avatarFull} style={{
                  border: user.isOnline ? "2px solid #adff2f" : "2px solid gray",
                  img: {
                    height: 'auto',
                    width: 'auto'
                  },
                }} />
              </a>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {user?.nickName}
                </Typography>
                {/* <Divider variant='fullWidth' textAlign='center' light={false}/> */}
                <Typography variant="body2" gutterBottom>
                  Real name: {user?.realName ?? "Not specified"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  SteamID: {user?.steamId}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" >
                  <ButtonGroup style={{
                    padding: '5px'
                  }}>
                    <Tooltip
                      placement="top"
                      arrow={true}
                      title={`See ${user?.nickName} profile.`}
                    >
                      <Button variant='outlined' style={{
                        margin: 'auto'
                      }}
                        onClick={() => history.push(`/profile/${user?.steamId}`)}
                      >
                        <AccountCircleIcon></AccountCircleIcon>
                      </Button>
                    </Tooltip>
                    <Tooltip
                      placement="top"
                      arrow={true}
                      title={user?.communityvisibilitystate !== 3 ?
                        playerStatsDisabled.toString() :
                        `Compare stats with ${user?.nickName} `}
                    >
                      <div>
                        <Button
                          variant='outlined'
                          style={{
                            margin: 'auto'
                          }}
                          onClick={() => history.push(`/profile/${mainUser?.steamId}/compareWith/${user?.steamId}`)}
                          disabled={user?.communityvisibilitystate !== 3}
                        >
                          <CompareIcon></CompareIcon>
                        </Button>
                      </div>
                    </Tooltip>
                    <Button variant='outlined' style={{
                      margin: 'auto'
                    }}>
                      <AccountCircleIcon></AccountCircleIcon>
                    </Button>
                  </ButtonGroup>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{user?.loccountrycode}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default FriendWindow;