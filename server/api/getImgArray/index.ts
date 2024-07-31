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

export const forceUpdate = async () => {
    const kvStorage = await useStorage('vercelKV')
    const char29data = await getChar29Data()
    dataStorage.generatedDate = Date.now()
    dataStorage.char29Data = char29data
    await kvStorage.setItem('char29Data', JSON.stringify(dataStorage))
    return dataStorage
}

const getData = (data: any, resourceSetNameQuery: string) => {
    const cache: any[] = []
    data.char29Data.forEach((element: any) => cache.push(element.resourceSetName))
    const index = cache.indexOf(resourceSetNameQuery)
    if (index === -1) {
        return {}
    } else {
        return {
            generatedDate: 0,
            todayImgData: data.char29Data[index]
        }
    }
}

const returnJs = defineEventHandler(async (event) => {
    const query = getQuery(event)
    const kvStorage = await useStorage('vercelKV')
    const checkData = await kvStorage.getItem<{ generatedDate: number, char29Data: any }>('char29Data')
    const time = Date.now()
    let returnData = {}
    if(dataStorage.generatedDate !== 0 ){
        return dataStorage
    } else if (!checkData){
        const data = await getChar29Data()
        const cache = {generatedDate: time, char29Data: data}
        await kvStorage.setItem('char29Data', JSON.stringify(cache))
        returnData = cache
    } else if (time - checkData.generatedDate > 86400000) {
        const data = await getChar29Data()
        const cache = {generatedDate: time, char29Data: data}
        await kvStorage.setItem('char29Data', JSON.stringify(cache))
        returnData = cache
    } else {
        returnData = checkData
    }
    if(query.resourceSetName === undefined) {
        return returnData
    } else {
        return getData(returnData, query.resourceSetName as string)
    }
    // const char29data = await getChar29Data()
    // return char29data
})

export default returnJs
