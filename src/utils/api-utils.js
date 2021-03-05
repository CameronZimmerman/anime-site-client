import request from 'superagent'
const baseUrl = 'https://favorite-anime-be.herokuapp.com'

export async function loginUser(user) {
    const jwt = await request.post(`${baseUrl}/auth/signin`).send(user)
    return jwt.body.token
}

export async function signUpUser(user) {
    console.log(user)
    const jwt = await request.post(`${baseUrl}/auth/signup`).send(user)
    return jwt.body.token
}

export async function getAnime(token, search, offset, count) {
    const data = await request.get(`${baseUrl}/api/anime?search=${search}&offset=${offset}&count=${count}`)
        .set('Authorization', token)
    return data.body
}

export async function addFavorite(token, favorite) {
    await request.post(`${baseUrl}/api/favorites`)
        .set('Authorization', token)
        .send(favorite)
}

export async function removeFavorite(token, favorite) {
    await request.delete(`${baseUrl}/api/favorites/${favorite.db_id}`)
        .set('Authorization', token)
}

export async function getFavorites(token) {
    let favorites = await request.get(`${baseUrl}/api/favorites`)
        .set('Authorization', token)
    return favorites.body
}