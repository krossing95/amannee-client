export const FetchNews = (newlist) => (dispatch, getState) =>{
    const {
        News: { news }
    } = getState();
    dispatch({
        type: "FETCH",
        payload: [ ...news, ...newlist ]
    })
}
export const SearchNews = (news) => (dispatch) =>{
    dispatch({
        type: "SEARCH",
        payload: [ ...news ]
    })
}