import { getChar29Data } from '../getImgArray';

export const randData = async () => {
    const char29Data = await getChar29Data()
    const data = char29Data[Math.floor(Math.random() * char29Data.length)]
    return data
}
export default defineEventHandler(async (event) => {
    const data = await randData()
    return data
})
