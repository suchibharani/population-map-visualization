import  fetch from 'isomorphic-unfetch'

/* All post */

const URL = 'https://restcountries.eu/rest/v2/all';
const fetchCountries = async () => {
    let url = `${URL}`;
    const response = await fetch(url);
    const data = await response.json();
    console.warn(data);
    var allData = data;

    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return {
        coutries : allData
    };
};

export {
    fetchCountries
};