
const results = document.querySelector('.results');


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
    countryContainer.classList = 'country-container';

    countryContainer.addEventListener("click", function(){
        moreInfo(country);
    });

    //Country flag
    const countryFlag = document.createElement('img');
    countryFlag.src = country.flag;

    const countryInfoDiv = document.createElement('div');
    countryInfoDiv.classList = 'country-small-info';

    const countryTitle = document.createElement('h2');
    countryTitle.textContent = country.name;

    const countryPopulation = document.createElement('p');
    countryPopulation.textContent = "Population: " + country.population;

    const region = document.createElement('p');
    region.textContent = "Region: " + country.region;

    const capital = document.createElement('p');
    capital.textContent = "Capital: " + country.capital;


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
        console.log(err);
    }
}

getCountries();