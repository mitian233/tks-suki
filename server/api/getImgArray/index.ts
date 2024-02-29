import axios from "axios"

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
    const char29data = await getChar29Data()
    return char29data
})

export default returnJs
