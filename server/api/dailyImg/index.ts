import dataStorage from "~/server/api/dailyImg/dataStorage";
import { randData } from "~/server/api/randImg";

export default defineEventHandler(async (event) => {
    const time = Date.now();
    if (time - parseInt(dataStorage.generatedDate) > 86400000 || dataStorage.generatedDate === '') {
        dataStorage.generatedDate = time.toString();
        dataStorage.todayImgData = await randData();
    }
    return dataStorage
})
