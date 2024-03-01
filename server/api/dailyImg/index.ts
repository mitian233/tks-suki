import dataStorage from "~/server/api/dailyImg/dataStorage"
import {randData} from "~/server/api/randImg"

export const useKV = async () => {
    const kvStorage = await useStorage('vercelKV')
    const checkData = await kvStorage.getItem<{ generatedDate: number, todayImgData: any }>('dailyImgData')
    const time = Date.now()
    if (!checkData) {
        const data = await randData()
        const cache = {generatedDate: time, todayImgData: data}
        await kvStorage.setItem('dailyImgData', JSON.stringify(cache))
        return cache
    } else if (time - checkData.generatedDate > 86400000) {
        const data = await randData()
        const cache = {generatedDate: time, todayImgData: data}
        await kvStorage.setItem('dailyImgData', JSON.stringify(cache))
        return cache
    } else {
        return checkData
    }
}

export default defineEventHandler(async (event) => {
    let result = {}
    if (dataStorage.generatedDate !== 0 && Date.now() - dataStorage.generatedDate < 600000) {
        result = dataStorage
    } else {
        const data = await useKV()
        if(dataStorage.generatedDate !== data.generatedDate) {
            dataStorage.generatedDate = data.generatedDate
            dataStorage.todayImgData = data.todayImgData
        }
        result = dataStorage
    }
    return result
})
