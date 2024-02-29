const generateDataBaseUrl = (resourceSetName: string, afterTraining: string) => {
    const boolOutput = (afterTraining === "true");
    if (boolOutput) {
        return 'https://bestdori.com/assets/jp/characters/resourceset/'+resourceSetName+'_rip/card_after_training.png'
    } else {
        return 'https://bestdori.com/assets/jp/characters/resourceset/'+resourceSetName+'_rip/card_normal.png'
    }
}

export default defineEventHandler((event) => {
    const query = getQuery(event)
    if(query.resourceSetName === undefined || query.afterTraining === undefined) {
        throw createError({
            status: 400,
            message: `Need to provide 'resourceSetName' and 'afterTraining' in query string.`,
        })
    } else {
        return sendRedirect(event, generateDataBaseUrl(query.resourceSetName as string, query.afterTraining as string))
        // return {
        //     resourceSetName: query.resourceSetName as string,
        //     afterTraining: query.afterTraining as boolean,
        //     ref: generateDataBaseUrl(query.resourceSetName as string, query.afterTraining as string)
        // }
    }
})
