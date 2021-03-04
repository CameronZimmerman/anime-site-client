import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from 'react-router-dom'
import SearchPage from './Search/SearchPage.js'
import FavoritesPage from './Favorites/FavoritesPage.js'
import AuthPage from './Auth/AuthPage.js'
import HomePage from './Home/HomePage.js'
import PrivateRoute from './Components/PrivateRoute.js'
import { getToken, setToken } from './utils/local-storage-utils.js'
import './App.css'

export default class App extends Component {
    state = {
        token : getToken()
    }
    componentDidMount() {
      this.setState({token: getToken()})
    }
    handleTokenChange = (token) => {
        this.setState({token})
        setToken(token)
    }
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route 
                          path="/home" 
                          exact
                          render={(routerProps) => <HomePage {...routerProps} />} 
                        />
                        <PrivateRoute 
                            path="/search" 
                            exact
                            token={this.state.token}
                            render={(routerProps) => <SearchPage {...routerProps} />} 
                        />
                        <PrivateRoute 
                            path="/favorites/:id" 
                            exact
                            token={this.state.token}
                            render={(routerProps) => <FavoritesPage {...routerProps} />} 
                        />
                        <Route 
                          path="/login" 
                          exact
                          render={(routerProps) => <AuthPage {...routerProps} tokenHandler={this.handleTokenChange}/>} 
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}