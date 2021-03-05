import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
export default class Header extends Component {
    render() {
        console.log(this.props.token)
        return (
            <div>
                <NavLink to="/home">Home</NavLink>
                {this.props.token && <NavLink to="/search">Anime</NavLink>}
                {this.props.token && <NavLink to="/favorites">Favorites</NavLink>}
                <NavLink to="/login">Login</NavLink>
            </div>
        )
    }
}
