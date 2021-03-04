import request from 'superagent'
const baseUrl = 'https://favorite-anime-be.herokuapp.com'
// const baseUrl = 'http://localhost:3000'


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