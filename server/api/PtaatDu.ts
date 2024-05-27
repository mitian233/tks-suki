import {forceUpdate} from "~/server/api/dailyImg";
import { forceUpdate as arrayForceUpdate } from "~/server/api/getImgArray";
import dataStorage from "~/server/api/dailyImg/dataStorage";
import arrayDataStorage from "~/server/api/getImgArray/dataStorage";

export default defineEventHandler(async (event) => {
    dataStorage.generatedDate = 0
    dataStorage.todayImgData = {}
    arrayDataStorage.generatedDate = 0
    arrayDataStorage.char29Data = []
    let result = {}
    try {
        await arrayForceUpdate()
        result = await forceUpdate()
    } catch (e) {
        throw createError({status: 500, message: 'Something went wrong'})
    }
    return result
})
