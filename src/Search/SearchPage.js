import React, { Component } from 'react'
import List from './List.js'
export default class SearchPage extends Component {
    render() {
        return (
            <div>
                <h1>Anime</h1>
                <List token = {this.props.token}/>
            </div>
        )
    }
}
