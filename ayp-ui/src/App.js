import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core'
import Layout from './components/Layout'
import Login from './pages/Login'
import { useAuthContext } from './hooks/useAuthContext'
import Register from './pages/Register'
const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    }
  }
});

function App() {
  const { user } = useAuthContext();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/login">
              {!user && <Login />}
              {user && <Notes />}
            </Route>
            <Route path="/register">
              {!user && <Register />}
              {user && <Notes />}
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
