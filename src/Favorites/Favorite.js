import React, { Component } from 'react'

export default class Favorite extends Component {
    render() {
        const {favorite} = this.props
        return (
            <div>
                        <h2>{favorite.title}</h2>
                        <p>Episodes: {favorite.episodes}</p>
                        <p>Status: {favorite.status}</p>
                        <p>Synopsis: {favorite.synopsis}</p>
                        <p>Rating: {favorite.rating}</p>
                        <img src ={favorite.poster} alt = 'poster'/>
                    </div>
        )
    }
}
