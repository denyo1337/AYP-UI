import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Create from './pages/Create'
import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import { useAuthContext } from './hooks/useAuthContext'
import Register from './pages/Register'
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(101, 98, 98)'
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
            <Route path="/create">
              <Create />
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
              {user && <Home />}
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
