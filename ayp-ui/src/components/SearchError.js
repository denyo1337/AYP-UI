import { Container, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const SeachError = () => {
    const { steamId } = useParams()
    return (
        <Container style={{
            width: "100%",
            height: "100%"
        }}>
            <Typography variant='h6' color='primary'>
               {`Gracz o id lub nicku "${steamId}" nie został znaleziony.`}
            </Typography>
           
                
        </Container>);
}

export default SeachError;