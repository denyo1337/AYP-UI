
import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import useAxios from '../hooks/useAxios';

const Search = () => {

    const [phrase, setPhrase] = useState('');
    const history = useHistory();
    const {user} = useAuthContext();

    //some dumb logic
    const handleSumbit = (e) =>{
        e.preventDefault();
        if(phrase){
            history.push(`/profile/${phrase}`)
        }else{
            history.push(`/profile/${user.steamId}`)
        }
    }

    return (
        <div className="searchbar">
        <form onSubmit={handleSumbit}>
            <TextField
                 type="text" 
                 variant='outlined'
                 size='small'
                 style={{
                     width:'400px',
                     marginRight:'20px',
                     marginLeft:'5px',
                     padding:'none'
                 }}
                 placeholder="Search player by steamId, name, or steam acc link"
                id="search"
                onChange={(e)=> setPhrase(e.target.value)}
                value = {phrase}
            />
        </form>
    </div>
      );
}
 
export default Search;