import React, { Component } from 'react'
import { getFavorites } from '../utils/api-utils.js'
import Favorite from './Favorite.js'
export default class FavoritesPage extends Component {
    state = {
        favorites: []
    }
    fetchFavorites = async () => {
        const favorites = await getFavorites(this.props.token)
        this.setState({favorites})
    }
    componentDidMount = async () => {
        await this.fetchFavorites()
    }
    render() {
        return (
            <div>
                {!this.state.favorites.length && <h2>No favorites</h2>}
                {this.state.favorites.map(favorite => {
                    return <Favorite favorite = {favorite}/>
                })}
            </div>
        )
    }
}
