import { useEffect } from 'react'
import { Container, Typography } from '@material-ui/core'
import { useAuthContext } from '../hooks/useAuthContext'
import { handleGetAccountData } from '../ayb-requests/requestHandlers'

export default function Home() {
  const { jwtToken, dispatch } = useAuthContext()

  useEffect(() => {
    if (jwtToken) {
      handleGetAccountData().then((resp) => {
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
          Create account, provide your private "Steam ID" and have a look at your / yours friends performance or even look for players at your similar level of skills !
        </Typography>
      </div>
    </Container>
  )
}
