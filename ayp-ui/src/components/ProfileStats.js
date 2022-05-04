
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: 'gray',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  const useStyles = makeStyles({
    table: {
      
    },
  });
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
const ProfileStats = ({stats}) => {
    const classes = useStyles();
    const {rifles, snipers, smgs, heavyGuns, pistols} = stats;
    return (
      <TableContainer 
      component={Paper}
      sx={{
        height:200
      }}
      >
        <Table stickyHeader className={classes.table} aria-label="customized table" sx={{
      height: "max-content"
    }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Weapons</StyledTableCell>
              <StyledTableCell align="right">Kils</StyledTableCell>
              <StyledTableCell align="right">HS%</StyledTableCell>
              <StyledTableCell align="right">Shots fired</StyledTableCell>
              <StyledTableCell align="right">Accuracy%</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableHead >
          
          </TableHead>
          <TableBody>
            {rifles.map((rifle) => (
              <StyledTableRow key={rifle.name}>
                <StyledTableCell component="th" scope="row">
                  {rifle.name}
                </StyledTableCell>
                <StyledTableCell align="right">{rifle.value}</StyledTableCell>
                <StyledTableCell align="right">{`${getRandomInt(0,90)},${getRandomInt(0,99)}`}</StyledTableCell>
                <StyledTableCell align="right">{rifle.value * getRandomInt(1,30)}</StyledTableCell>
                <StyledTableCell align="right">{getRandomInt(1,100)}</StyledTableCell>
              </StyledTableRow>
            ))}
            {snipers.map((sniper) => (
              <StyledTableRow key={sniper.name}>
                <StyledTableCell component="th" scope="row">
                  {sniper.name}
                </StyledTableCell>
                <StyledTableCell align="right">{sniper.value}</StyledTableCell>
                <StyledTableCell align="right">{`${getRandomInt(0,90)},${getRandomInt(0,99)}`}</StyledTableCell>
                <StyledTableCell align="right">{sniper.value * getRandomInt(1,30)}</StyledTableCell>
                <StyledTableCell align="right">{getRandomInt(1,100)}</StyledTableCell>
              </StyledTableRow>
            ))}
            {smgs.map((smg) => (
              <StyledTableRow key={smg.name}>
                <StyledTableCell component="th" scope="row">
                  {smg.name}
                </StyledTableCell>
                <StyledTableCell align="right">{smg.value}</StyledTableCell>
                <StyledTableCell align="right">{`${getRandomInt(0,90)},${getRandomInt(0,99)}`}</StyledTableCell>
                <StyledTableCell align="right">{smg.value * getRandomInt(1,30)}</StyledTableCell>
                <StyledTableCell align="right">{getRandomInt(1,100)}</StyledTableCell>
              </StyledTableRow>
            ))}
            {heavyGuns.map((heavyGun) => (
              <StyledTableRow key={heavyGun.name}>
                <StyledTableCell component="th" scope="row">
                  {heavyGun.name}
                </StyledTableCell>
                <StyledTableCell align="right">{heavyGun.value}</StyledTableCell>
                <StyledTableCell align="right">{`${getRandomInt(0,90)},${getRandomInt(0,99)}`}</StyledTableCell>
                <StyledTableCell align="right">{heavyGun.value * getRandomInt(1,30)}</StyledTableCell>
                <StyledTableCell align="right">{getRandomInt(1,100)}</StyledTableCell>
              </StyledTableRow>
            ))}
            {pistols.map((pistol) => (
              <StyledTableRow key={pistol.name}>
                <StyledTableCell component="th" scope="row">
                  {pistol.name}
                </StyledTableCell>
                <StyledTableCell align="right">{pistol.value}</StyledTableCell>
                <StyledTableCell align="right">{`${getRandomInt(0,90)},${getRandomInt(0,99)}`}</StyledTableCell>
                <StyledTableCell align="right">{pistol.value * getRandomInt(1,30)}</StyledTableCell>
                <StyledTableCell align="right">{getRandomInt(1,100)}</StyledTableCell>
              </StyledTableRow>
            ))}

          </TableBody>

        </Table>
      </TableContainer>
    );
}
 
export default ProfileStats;