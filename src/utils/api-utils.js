import request from 'superagent'
const baseUrl = 'https://favorite-anime-be.herokuapp.com'

export async function loginUser(user) {
    let jwt = await request.post(`${baseUrl}/auth/signin`).send(user)
    return jwt.body.token
}

export async function signUpUser(user) {
    console.log(user)
    let jwt = await request.post(`${baseUrl}/auth/signup`).send(user)
    return jwt.body.token
}