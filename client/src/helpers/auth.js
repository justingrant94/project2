export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('sei-63-cheesebored')
}

export const getPayload = () => {
  const token = window.localStorage.getItem('sei-63-cheesebored')
  if (!token) return
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

// ? function that checks that user is authenticated
export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime < payload.exp
}

export const userIsOwner = (singleItem) => {
  const payload = getPayload()
  if (!payload) return
  return singleItem.addedBy._id === payload.sub
}