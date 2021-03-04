import React, { Component } from 'react'
export default class ListItem extends Component {
    state = {
        hidden: true
    }
    handleShow = () => {
        this.setState({hidden: false})
    }
    handleHide = () => {
        this.setState({hidden: true})
    }
    render() {
        const {anime} = this.props
        return (
            
            <div onMouseEnter = {this.handleShow} onMouseLeave = {this.handleHide} className = 'anime-item' style={{backgroundImage: `url(${anime.attributes['posterImage'].small})`}}>
                <p>{anime.attributes.titles.en? anime.attributes.titles.en : anime.attributes.titles.ja_jp}</p>
                {!this.state.hidden && <h3>Add to favorites?</h3>}
            </div>
        )
    }
}
