import React, { Component } from 'react'
import ListItem from './ListItem.js'
import { getAnime, getFavorites, addFavorite, removeFavorite } from '../utils/api-utils.js'

export default class List extends Component {
    state = {
        anime: [],
        favorites: [],
        search: '',
        page: 0,
        perPage: 10,
        max: 0

    }
    async componentDidMount() {
        const anime = await this.fetchAnime()
        await this.fetchFavorites()
        this.setState({max: Math.floor(anime.meta.count/this.state.perPage)})
    }
    fetchAnime = async () => {
        let animeData = await getAnime(this.props.token, '', this.state.page * 10, this.state.perPage)
        let anime = animeData.data
        await this.setState({anime})
        return animeData
    }
    fetchFavorites = async () => {
        const favorites = await getFavorites(this.props.token)
        this.setState({favorites})
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
    handleAddFavorite = async (anime) => {
        const favorite = {
            title: anime.attributes.titles.en? anime.attributes.titles.en : anime.attributes.titles.ja_jp || '',
            episodes: anime.attributes.episodeCount || 0,
            status: anime.attributes.status || '',
            synopsis: anime.attributes.synopsis || '',
            rating: anime.attributes.ratingRank || 0, 
            poster: anime.attributes.posterImage.large || '',
            db_id: anime.id
        }
        await addFavorite( this.props.token, favorite)
        await this.fetchFavorites(this.props.token)
    }
    handleRemoveFavorite = async (anime, id) => {
        const fav = this.state.favorites.find(favorite => favorite.db_id === Number(id))
        await removeFavorite(this.props.token, fav)
        await this.fetchFavorites()
    }
    isFavorite = (anime) => {
        for (const fav of this.state.favorites) {
            if (fav.db_id === Number(anime.id)) return fav
        }
        return false;
    }
    render() {
        return (
            <>
                <div className = 'anime-list'>
                    {this.state.anime.map(animeObj => {
                        const favorite = this.isFavorite(animeObj)
                        return <ListItem anime = {animeObj} handleAddFavorite = {this.handleAddFavorite} handleRemoveFavorite = {this.handleRemoveFavorite}favorite = {favorite}/>
                    })}
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
