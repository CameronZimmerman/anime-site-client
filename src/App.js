import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from 'react-router-dom'
import SearchPage from '.Search/SearchPage.js'
import FavoritesPage from '.Favorites/FavoritesPage.js'
import AuthPage from './Auth/AuthPage.js'
import HomePage from './Home/HomePage.js'
import PrivateRoute from './Components/PrivateRoute.js'
import { getToken } from './utils/local-storage-utils.js'

export default class App extends Component {
    state = {
        token : getToken()
    }
    componentDidMount() {
      this.setState({token: getToken()})
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
                            path="/favorites" 
                            exact
                            token={this.state.token}
                            render={(routerProps) => <FavoritesPage {...routerProps} />} 
                        />
                        <Route 
                          path="/auth" 
                          exact
                          render={(routerProps) => <AuthPage {...routerProps} />} 
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}