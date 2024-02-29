import dataStorage from "~/server/api/dailyImg/dataStorage";
import { randData } from "~/server/api/randImg";

export default defineEventHandler(async (event) => {
    const date = new Date();
    const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    if (dataStorage.generatedDate !== today) {
        dataStorage.generatedDate = today;
        dataStorage.todayImgData = await randData();
    }
    return dataStorage.todayImgData;
})
