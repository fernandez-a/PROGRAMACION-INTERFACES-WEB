var input = document.querySelector('input')
var button = document.querySelector('button')
var Character = document.querySelector(".character")
var page = 0;
var results;
button.addEventListener('click', (e) => {
    e.preventDefault();
    fetchData(input.value);
})


function fetchData(character) {
    fetch(`https://rickandmortyapi.com/api/character/?name=${character}`)
        .then(res => res.json())
        .then(data => {
            results = data;
            characterInit(results)
        });
    page = 0;
}


function characterInit(data) {
    document.getElementById('characters-container').innerHTML = " ";
    document.getElementById('numPagina').innerHTML = `${page + 1}`;
    let lastNeeded = (((page * 6) + 6) < data.results.length) ? ((page * 6) + 6) : data.results.length - 1;
    for (let i = page * 6; i < lastNeeded; i++) {
        document.getElementById('characters-container').innerHTML +=
        `
        <div class =  "character-card">
            <div class="imgs">
                <img class="img" src="${data.results[i].image}" alt="">
            </div>
            <div class = "character-data">
                <h1> ${data.results[i].name}</h1>
                <div id = "data">Staus: ${data.results[i].status}</div>
                <div id = "data">Gender: ${data.results[i].gender}</div>
            </div>
        </div>
        `;
    }

}

function nextPage() {
    if (((page * 6) + 6) < results.results.length) page++;
    characterInit(results)
}

function prevPage() {
    if (page > 0) page--
    else page = 0
    characterInit(results)
}

