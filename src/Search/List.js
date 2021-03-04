import React, { Component } from 'react'
import ListItem from './ListItem.js'
import { getAnime } from '../utils/api-utils.js'

export default class List extends Component {
    state = {
        anime: [],
        search: '',
        page: 0,
        perPage: 10,
        max: 0

    }
    async componentDidMount() {
        const anime = await this.fetchAnime()
        this.setState({max: Math.floor(anime.meta.count/this.state.perPage)})
    }
    fetchAnime = async() => {
        let animeData = await getAnime(this.props.token, '', this.state.page * 10, this.state.perPage)
        let anime = animeData.data
        await this.setState({anime})
        return animeData
    }
    handleNextPage = async () => {
        if (this.state.page < this.state.max) {
            await this.setState({page: this.state.page + 1})
        }
        await this.fetchAnime()
    }
    handlePrevPage = async () => {
        if(this.state.page > 0) {
            await this.setState({page: this.state.page - 1})
        }
        await this.fetchAnime()
    }
    render() {
        return (
            <>
                <div className = 'anime-list'>
                    {this.state.anime.map(animeObj => <ListItem anime = {animeObj}/>)}
                </div>
                <div className = 'buttons'>
                    <button onClick={this.handlePrevPage}>Prev</button>
                    {this.state.page}
                    <button onClick={this.handleNextPage}>Next</button>
                </div>
                
            </>
        )
    }
}
