import {useKV} from "~/server/api/dailyImg";
import dataStorage from "~/server/api/dailyImg/dataStorage";

export default defineEventHandler(async (event) => {
    try {
        dataStorage.generatedDate = 0
        await useKV()
    } catch (e) {
        throw createError({status: 500, message: 'Something went wrong'})
    }
    return {status: 200, body: 'OK'}
})
