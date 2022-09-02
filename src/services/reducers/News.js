const News = (state = { news: [] }, action) => {
    switch (action.type) {
        case "FETCH":
            return { news: action.payload }
        case "SEARCH":
            return { news: action.payload }
        default:
            return state;
    }
}
export default News;