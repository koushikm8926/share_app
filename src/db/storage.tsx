import {MMKV} from 'react-native-mmkv';
export const storage = new mmkv({
    id:'my-app-storage',
    encryptioKey:'some-secret-key'
})



export const mmkvStorage={
    setItem(key:string, value:string )=>{
        storage.set(key,value)
    },
     setItem(key:string)=>{
        const value= storage.getString(key)
        return value ?? null
     },
      setItem(key:string)=>{
        storage.delete(key)
      },
}