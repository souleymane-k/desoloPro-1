'use strick'

const apiKey = "391131-desoloPr-W9T56S88";
const searchURL = "https://tastedive.com/api/similar"

function formatQueryParasms(parasms){
    const queryItems = Object.keys(parasms)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parasms[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    
  for(let i=0; i<responseJson.Similar.Results.length; i++){
        $('#results-list').append(
    `<li class="colorKo">
    <hr>
         <p>${responseJson.Similar.Results[i].Name}</p>
         <p>${responseJson.Similar.Results[i].Type}</p>
         <p>${responseJson.Similar.Results[i].wTeaser}</p>
         <a href="${responseJson.Similar.Results[i].wUrl}">${responseJson.Similar.Results[i].wUrl}</a> <br> 
         <a href="${responseJson.Similar.Results[i].yUrl}">YouTube Video</a>
    </li>
        `
      )
   };

    $('#results').removeClass('hidden');
}

function getInfos(query,limit){
    const parasms = {
        k:apiKey,
        q:query,limit,
        /*part:Results,*/
        info:1
        
        
    }

    const queryString = formatQueryParasms(parasms)
    const url = searchURL+'?'+queryString;
     console.log(url);
     fetch(url)
     .then(response =>{
         if(response.ok){
             return response.json();
         }
         throw new Error(response.statusText);
     })
     .then(responseJson => displayResults(responseJson))
     .catch(err => {
         $('#js-error-message').text(`Something went wrong: ${err.message}`);
     });
}
function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
         const searchTerm = $('#js-search-term').val();
         const maxResults = $('#js-max-results').val();
        getInfos(searchTerm, maxResults);
        
    
      });
    }
    $(watchForm);
