import {get as _get, post as _post} from '../utils/http'

const baseURL = process.env.API_BASE_URL || '/api/v1/'

const httpOptions = () => ({
  baseURL,
  responseType: 'json',
  withCredentials: true,
  headers: sessionStorage.getItem('jwtToken')
    ? {Authorization: `Bearer ${sessionStorage.getItem('jwtToken')}`}
    : {},
})

// eslint-disable-next-line no-unused-vars
const get = (url, params = {}) => _get(url, {...httpOptions(), params})

const post = (url, body = '') => _post(url, body, {...httpOptions()})

const handleTokenAndProfileResponse = ({token, profile}) => {
  sessionStorage.setItem('jwtToken', token)
  sessionStorage.setItem('profile', JSON.stringify(profile))
  return profile
}

const clearStorage = () => {
  sessionStorage.removeItem('jwtToken')
  sessionStorage.removeItem('profile')
}

export const loadProfile = () => {
  const profile = sessionStorage.getItem('profile')
  if (!profile) {
    return undefined
  }
  return JSON.parse(profile)
}

export const signin = ({email, password}) =>
  post('signin', {email, password}).then(handleTokenAndProfileResponse)

export const signup = ({email, password, nickname, recaptcha}) =>
  post('signup', {
    email,
    password,
    nickname,
    recaptcha,
  }).then(handleTokenAndProfileResponse)

export const signout = async () => clearStorage()
