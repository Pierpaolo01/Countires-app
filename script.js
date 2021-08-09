
const results = document.querySelector('.results');
const mainSection = document.querySelector('.main-section');
const detailedSection = document.querySelector('.detailed-info');

detailedSection.style.display = 'none';

const detailedImg = document.querySelector('#countryFlag');
const detailedCounryName = document.querySelector('#country-name');
const nativeNameP = document.querySelector('#native-name');
const populatonP = document.querySelector('#population');
const regionP = document.querySelector('#region');
const subRegionP = document.querySelector('#sub-region');
const capitalP = document.querySelector('#capital');
const topDomainP = document.querySelector('#top-level-domain');
const currencyP = document.querySelector('#currency');
const languageP = document.querySelector('#language');
const borderParent = document.querySelector('.border-country-parent');

const inputField = document.querySelector('input[type="search"]');
inputField.addEventListener('input', function(){
    results.innerHTML = "";
    
    
    if(inputField.value){
        getCountriesBySearch('input', inputField.value);
    }else if(!inputField.value){
        getCountries();
    }
});

const dropdownMenuItem = document.querySelectorAll('.dropdown-item');
dropdownMenuItem.forEach(el => {
    el.addEventListener('click', event =>{
        getCountriesBySearch('region', el.title);
        if(el.title === 'all' ){
            getCountries();
        }
        results.innerHTML = "";
    });
});

const changeTheme = document.querySelector('#colorTheme');
changeTheme.addEventListener('click', func =>{
    const currentMode = changeTheme.children[1];
    const modeImg = changeTheme.children[0];
    const lightTone = document.querySelectorAll('.theme-tone-light');
    const pageText = document.querySelectorAll('p, h5, h2');
    const body = document.querySelector('body');

    if(currentMode.innerHTML === "Dark-Mode"){

        
        lightTone.forEach(el =>{
            el.style.backgroundColor = 'hsl(0, 0%, 100%)';
        });
        pageText.forEach(el =>{
            el.style.color = 'hsl(200, 15%, 8%)';
        });

        body.style.backgroundColor = 'hsl(0, 0%, 98%)';
        
        modeImg.src = 'resources/icon-sun.svg';
        currentMode.innerHTML = "Light-Mode";

    }else if(currentMode.innerHTML === "Light-Mode"){

        lightTone.forEach(el =>{
            el.style.backgroundColor = 'hsl(209, 23%, 22%)';
        });

        pageText.forEach(el =>{
            el.style.color = 'hsl(0, 0%, 100%)';
        });

        body.style.backgroundColor = 'hsl(207, 26%, 17%)';

        modeImg.src = 'resources/icon-moon.svg';
        currentMode.innerHTML = "Dark-Mode";
    }
});



//This function loops through the JSON data & sends it off
//to be displayed. 
function showCountries(data){
    data.forEach(obj => {
        displayCountries(obj);
    });
}

//creates the necessary DOM items to be sent to the HTML & display 
//the countries in a card view. 
function displayCountries(country){
    //Main container for the country & info regarding it
    const countryContainer = document.createElement('div');
    countryContainer.classList = 'country-container theme-tone-light';

    countryContainer.addEventListener("click", function(){
        //This onClick refers you to more info about chosen country
        moreInfo(country);
    });

    //Country flag
    const countryFlag = document.createElement('img');
    countryFlag.src = country.flag;
    countryFlag.alt = country.name;
    //div to hold the quick-facts
    const countryInfoDiv = document.createElement('div');
    countryInfoDiv.classList = 'country-small-info';

    //quick facts
    const countryTitle = document.createElement('h2');
    countryTitle.textContent = country.name;

    const countryPopulation = document.createElement('p');
    countryPopulation.textContent = "Population: " + numberWithCommas(country.population); 

    const region = document.createElement('p');
    region.textContent = "Region: " + country.region;

    const capital = document.createElement('p');
    capital.textContent = "Capital: " + country.capital;

    //end of quick facts

    if(changeTheme.children[1].innerHTML === "Light-Mode"){
        countryContainer.style.backgroundColor = 'hsl(0, 0%, 100%)';
        textElems = [capital, region, countryPopulation, countryTitle];
        textElems.forEach(el =>{
            el.style.color = 'hsl(200, 15%, 8%)';
        });
    }

    //appending all the items to DOM in correct sequence
    countryInfoDiv.appendChild(countryTitle);
    countryInfoDiv.appendChild(countryPopulation);
    countryInfoDiv.appendChild(region);
    countryInfoDiv.appendChild(capital);


    countryContainer.appendChild(countryFlag);
    countryContainer.appendChild(countryInfoDiv);
    
    results.appendChild(countryContainer);

}

function moreInfo(obj){
    console.log(obj);
    detailedSection.style.display = 'flex';
    mainSection.style.display = 'none';
    detailedImg.src = obj.flag;
    detailedImg.alt = obj.name;
    detailedCounryName.textContent = obj.name;
    nativeNameP.textContent = "Native name: " + obj.nativeName;
    populatonP.textContent = "population: "+ numberWithCommas(obj.population);
    regionP.textContent = "Region: " + obj.region;
    subRegionP.textContent = "Sub Region: " + obj.subRegionP;
    capitalP.textContent = "Capital: " + obj.capital;
    topDomainP.textContent = "Top Level Domain: " + obj.topLevelDomain; 
    currencyP.textContent = "currency: " ;
    
    //This forloop appends all the different currencies
    for(let i=0; i < obj.currencies.length; i++ ){
        currencyP.textContent += obj.currencies[i].symbol +" "+ obj.currencies[i].name + " | ";
    }
    
    languageP.textContent = "languages: "
    //This appends all the different types of languages
    for(let i=0; i < obj.languages.length; i++ ){
        languageP.textContent += obj.languages[i].name +", ";
    }

    //This forloop get the name of the bordering country, by fetching the name using the alphaCode 3 returned
    for(let i=0; i < obj.borders.length; i++){

        getCountryFullname(obj.borders[i]);

    }
    
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getCountryFullname = async (countryCode) => {
    const borderDiv = document.createElement('div');
    const borderNameHolder = document.createElement('p');

    const borderName = await fetch('https://restcountries.eu/rest/v2/alpha/'+ countryCode);
    const borderNameJson = await borderName.json();

    borderNameHolder.textContent = borderNameJson.name;


    borderDiv.appendChild(borderNameHolder);

    borderParent.appendChild(borderDiv);


}

function backToMain(){
    detailedSection.style.display = 'none';
    mainSection.style.display = 'flex';
    
    borderParent.querySelectorAll('*').forEach(el =>{
        el.remove();
    })


}



const getCountriesBySearch = async (type, search)=>{
    
    try {

        let searchResults;

        if(type === 'input'){
            searchResults = await fetch('https://restcountries.eu/rest/v2/name/'+search);
        }else if(type === 'region'){
            
            searchResults = await fetch('https://restcountries.eu/rest/v2/region/'+search);
        }
        const results = await searchResults.json();

        showCountries(results);

    }catch(err) {
        console.error(err);
    }
}

//This function gathers the API data via a fetch, turns it into JSON
// and sends it to the next function to parse the JSON & display it.
const getCountries = async ()=>{
    try{
        const url = 'https://restcountries.eu/rest/v2/all';
        const resutls = await fetch(url);
        const data = await resutls.json();
        
        //This function parses the JSON data
        showCountries(data);
    }
    catch(err){
        console.error(err);
    }
}

getCountries();