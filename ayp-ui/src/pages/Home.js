import { useEffect } from 'react'
import { Container, Typography } from '@material-ui/core'
import useAxios from '../hooks/useAxios'
import { useAuthContext } from '../hooks/useAuthContext'
import FriendWindow from './FriendsList/FriendWindow'

export default function Home() {
  const { jwtToken, dispatch } = useAuthContext()
  const { axiosInstance: axios } = useAxios();

  useEffect(() => {
    if (jwtToken) {
      axios.get("Account").then((resp) => {
        dispatch({ type: "UPDATE_USER_STEAMDATA", payload: resp.data })
      }, (err) => {
        console.log(err);
      })
    }
  }, [jwtToken])

  return (

    <Container style={{
      width:"100%",
      height:"100%"
    }}>
      <Typography variant='h1' color='primary'>
        WELCOME TO AYP CS GO!
      </Typography>
      <div style={{
        marginTop: '150px'
      }}>
        <Typography variant='h4' color='textSecondary' style={{
          margin: 'auto'
        }}>
         App is made for simplified view of your skills performance.
          Create account, provide your private "Steam ID" and have a look at your / yours friends performance !
        </Typography>
      </div>
    </Container>
  )
}
