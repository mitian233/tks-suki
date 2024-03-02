import {forceUpdate} from "~/server/api/dailyImg";
import dataStorage from "~/server/api/dailyImg/dataStorage";

export default defineEventHandler(async (event) => {
    dataStorage.generatedDate = 0
    dataStorage.todayImgData = {}
    let result = {}
    try {
        result = await forceUpdate()
    } catch (e) {
        throw createError({status: 500, message: 'Something went wrong'})
    }
    return result
})
