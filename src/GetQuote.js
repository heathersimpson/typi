const fetchQuote = () => {
    fetch('https://api.quotable.io/random')
    .then(response => { return response.json() })
}