import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import { useAuthContext } from './hooks/useAuthContext'
import Register from './pages/Register'
import MyAccountDetails from './components/MyAccountDetails'
import Profile from './components/Profile'
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(101, 98, 98)'
    },
    secondary:{
      main:'rgb(9, 69, 159)'
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
              <Home />
            </Route>
            <Route exact path="/profile/:steamId">
              <Profile />
            </Route>
            <Route exact path="/profile/">
              {user && <Profile />}
              {!user && <Login />}
            </Route>
            <Route path="/login">
              {!user && <Login />}
              {user && <Home />}
            </Route>
            <Route path="/register">
              {!user && <Register />}
              {user && <Home />}
            </Route>
            <Route path="/my-account">
              {!user && <Login />}
              {user && <MyAccountDetails />}
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
