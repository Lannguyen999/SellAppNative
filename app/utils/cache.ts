import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

const prefix = 'cache'
const expiredTime = 5

const store = async (key: any, value: any) => {
  try {
    const item = {
      ...value,
      timeStamp: Date.now(),
    }
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item))
  } catch (error) {
    console.log(error)
  }
}

const isExpired = (item: any) => {
  const now = moment(Date.now())
  const storeTime = moment(item.timeStamp)
  return now.diff(storeTime, 'minutes') > expiredTime
}

const get = async (key: any) => {
  try {
    const value: any = await AsyncStorage.getItem(prefix + key)
    const item = JSON.parse(value)

    if (!item) return null

    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key)
      return null
    }

    return item.value
  } catch (error) {
    console.log(error)
  }
}

export default { store, get }
