import { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import useAxios from '../hooks/useAxios'
import { useAuthContext } from '../hooks/useAuthContext'
import MyAccountDetails from '../components/MyAccountDetails'

export default function Home() {

  const { jwtToken, dispatch } = useAuthContext()
  const {axiosInstance : axios} = useAxios();

  useEffect(() => {
    if(jwtToken){
      axios.get("Account").then((resp) => {
        dispatch({type:"UPDATE_USER_STEAMDATA", payload: resp.data})
      }, (err) => {
        console.log(err);
      })
    }
  }, [jwtToken])

  return (

    <Container>


    </Container>
  )
}
