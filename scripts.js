const gifsGridEl = document.querySelector("#gifs-grid")
const searchInput = document.getElementById("search-input").value
const LIMIT = 10
const OFFSET = 0
const RATING = 'g'
const LANG = "en"


const fetchGifs = async searchInput => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=0fAcQIzMiwcmaoDm2Ze3XNiowq3l1R0X&q=${searchInput}&${OFFSET}=10&${OFFSET}=0&${RATING}=g&${LANG}=en`)
    const data = await response.json()
    return data
}

const fetchTrending = async () => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=0fAcQIzMiwcmaoDm2Ze3XNiowq3l1R0X&limit=${LIMIT}&rating=${RATING}`)
    const data = await response.json()
    return data
}

const checkInputVal = async (searchInput) => {
    gifsGridEl.innerHTML = ""
    console.log(searchInput)
    if (searchInput === "") {
        const fetch_trending = await fetchTrending()
        await renderGifs(fetch_trending.data)
    } else {
        const fetch_gifs = await fetchGifs(searchInput)
        await renderGifs(fetch_gifs.data)
    }
}

const renderGifs = async gifs => {
    gifs.forEach(gif => {
        gifsGridEl.innerHTML = gifsGridEl.innerHTML + `
        <div id="gif-container">
            <div class="gif-title">${gif.title}</div>
            <img src=${gif.images.original.url} alt="Some GIF Image">
        </div>
        `
    })
}
