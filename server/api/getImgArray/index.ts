import axios from "axios"
import dataStorage from "~/server/api/getImgArray/dataStorage";

export const getChar29Data = async () => {
    const response = await axios.get('https://bestdori.com/api/cards/all.5.json')
    let char29data = []
    const responseKeys = Object.keys(response.data)
    for (let i = 0; i < responseKeys.length; i++) {
        if(response.data[responseKeys[i]].characterId === 29) {
            let cache = response.data[responseKeys[i]]
            cache.cardId = responseKeys[i]
            char29data.push(cache)
        }
    }
    return char29data
}

const returnJs = defineEventHandler(async (event) => {
    const kvStorage = await useStorage('vercelKV')
    const checkData = await kvStorage.getItem<{ generatedDate: number, char29Data: any }>('char29Data')
    const time = Date.now()
    if(dataStorage.generatedDate !== 0 ){
        return dataStorage
    } else if (!checkData){
        const data = await getChar29Data()
        const cache = {generatedDate: time, char29Data: data}
        await kvStorage.setItem('char29Data', JSON.stringify(cache))
        return cache
    } else if (time - checkData.generatedDate > 86400000) {
        const data = await getChar29Data()
        const cache = {generatedDate: time, char29Data: data}
        await kvStorage.setItem('char29Data', JSON.stringify(cache))
        return cache
    } else {
        return checkData
    }
    // const char29data = await getChar29Data()
    // return char29data
})

export default returnJs
