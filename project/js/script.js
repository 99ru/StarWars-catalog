
// character data
let charactersInfo = document.querySelector('.characters-info')
let detailsInfo = document.querySelector('.details-info')
let planetsInfo = document.querySelector('.planets-info')

//pages 
let page = 1;
let forward = document.querySelector('.forward')
let backward = document.querySelector('.backward')
let pageNumber = document.querySelector('.page-number')

 let spinner = document.querySelector('.spinner')
 let spinner2 = document.querySelector('.spinnerPlanet')



// 1. fetch
// 2. get data in json
// 3. loop data and append data to a new element
 function renderCharacters() { 
  fetch(`https://swapi.dev/api/people/?page=${page}`)   
  .then(response => response.json()) 
  .then(data =>{
    stopSpin()
    for (let characters of data.results) {  
      const charName = document.createElement("p")
      charName.innerText = `${characters.name}`       
      charactersInfo.append(charName);    
      
      
      charName.addEventListener("click", () => { 
        startSpinner()
       detailsInfo.innerHTML = // details info
      `<div>
        <h3>${characters.name}</h3>
        <p>Height: ${characters.height}cm</p>
        <p>Mass: ${characters.mass}kg</p>
        <p>Hair color: ${characters.hair_color}</p> 
        <p>Skin color: ${characters.skin_color}</p> 
        <p>Eye color: ${characters.eye_color}</p> 
        <p>Birth year: ${characters.birth_year}</p> 
        <p>Gender: ${characters.gender}</p> 
       </div>`;
       
       
        let planetsUrl = `${characters.homeworld}`; // home planet 
        renderPlanets(planetsUrl) 
      })
    } 
  }).catch((error) => {
    console.log("AN ERROR OCCURED!");
    console.log(error);
  })
  pageNumber.innerText = page; 
  clearList();
 }
  
  
  
function clearList(){

  const items = document.querySelectorAll("p");
  const items2 = document.querySelectorAll("h3") 
  if (items.length > 0) {
    items.forEach((item) => item.remove()); 
    items2.forEach((item) => item.remove()); 
  } 
}


async function renderPlanets(planetsUrl) {
  const resolve = await fetch(planetsUrl)
  const homePlanet = await resolve.json()
  spin()
  startSpinner() 
  planetsInfo.innerHTML =
      `<div>
      <h3>${homePlanet.name}</h3>
      <p>Rotation Period: ${homePlanet.rotation_period}</p>
      <p>Orbital Period: ${homePlanet.orbital_period}</p>
      <p>Diameter: ${homePlanet.diameter}</p>
      <p>Climate: ${homePlanet.climate} </p>
      <p>Gravity: ${homePlanet.gravity}</p>
      <p>Terrain: ${homePlanet.terrain} </p>
      </div>`
      
      stopSpin()
      hideSpinner()
      
}

// pages and updates characters 
function loadPrevious() {
  if (page > 1) {
    page--;
  }
  startSpinner()
   renderCharacters();  
   spin()
   
}

function loadNext() {
  if (page < 9) {
    page++;
  }
  startSpinner()
  spin()
  renderCharacters(); 
}

// arrow buttons
  forward.addEventListener("click", loadNext,);
  backward.addEventListener("click", loadPrevious); 


function spin(){
  spinner.style.display = "block";
}
function stopSpin(){
  spinner.style.display = "none";
}

function hideSpinner() {
  spinner2.style.display = "none";
}

function startSpinner(){
  spinner2.style.display = "block";
}

function main(){
renderCharacters()
hideSpinner()
}
main()

