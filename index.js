'use strick'

const apiKey = "391131-desoloPr-W9T56S88";
const searchURL = "https://tastedive.com/api/similar"

function formatQueryParasms(parasms){
    const queryItems = Object.keys(parasms)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parasms[key])}`)
    return queryItems.join('&');
}

function getInfos(query, limit){
    const parasms = {
        k:apiKey,
        q:query,limit,
        
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
     .then(responseJson => console.log(responseJson))
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
