import * as SecureStore from 'expo-secure-store'

const key = 'authToken'

const storeToken = async (authToken: string) => {
  try {
    await SecureStore.setItemAsync(key, authToken)
  } catch (error) {
    console.log('Error storing auth token', error)
  }
}

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key)
  } catch (error) {
    console.log('Error getting auth token', error)
  }
}

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key)
  } catch (error) {
    console.log('Error removing auth token', error)
  }
}

export default { storeToken, getToken, removeToken }
