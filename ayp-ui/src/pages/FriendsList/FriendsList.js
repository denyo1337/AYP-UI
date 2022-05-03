import { makeStyles } from "@material-ui/styles";
import { FormControl, List, ListItem, TextField } from "@material-ui/core";
import TablePagination from '@material-ui/core/TablePagination';
import MenuItem from '@material-ui/core/MenuItem';
import FriendWindow from './FriendWindow';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => {
    return {
        searchInputs: {
            width: '30%',
            marginRight: '5px',
            display: "inline-block",
            height: '41px'
        },
        searchDiv: {
            marginTop: '30px',
            marginBottom: "-10px"
        }
    }
})
const FriendsList = (props) => {

    const classes = useStyles();

    return (
        <div>
            <div className={classes.searchDiv}>
                <TextField
                    style={{
                        marginLeft: '15px'
                    }}
                    type='string'
                    variant="outlined"
                    size='small'
                    className={classes.searchInputs}
                    label="Phrase"
                    value={props.searchPhrase}
                    onChange={props.handleSearchPhrase}
                />
                <Select
                    className={classes.searchInputs}
                    value={props.sortBy}
                    onChange={props.handleSortBy}
                    variant='outlined'
                    placeholder="Sort By"
                    label="Sort By"
                >
                    <MenuItem value='isonline'>Online</MenuItem>
                    <MenuItem value='nickname'>Nick name</MenuItem>
                    <MenuItem value='timecreated'>Created account time</MenuItem>
                </Select>

                <Select
                    className={classes.searchInputs}
                    value={props.sortDirection}
                    onChange={props.handleSortDirection}
                    variant='outlined'
                >
                    <MenuItem value={0}>ASC</MenuItem>
                    <MenuItem value={1}>DESC</MenuItem>
                </Select>

            </div>
            <div>
                <TablePagination
                    component="div"
                    count={props.friends?.totalPages ?? 100}
                    page={props.pageNumber}
                    onPageChange={props.handleChangePage}
                    rowsPerPage={props.pageSize}
                    labelRowsPerPage={"rows"}
                    onRowsPerPageChange={props.handleChangeRowsPerPage}
                />
            </div>

            {props.friends?.items && props.friends.items.map(user => (
                <FriendWindow
                    user
                />
            ))}
        </div>
    );
}

export default FriendsList;