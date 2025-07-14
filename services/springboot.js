
const base_url = 'http://192.168.0.100:8082';
export const updateSearchCount = async(query , movie) => {
    //check if a record of that search has already been stpre
    //if aa document is found increment the searchcount
    //if no document is founc c
    //create a new document in mysql database -> 1  
     
console.log(query)
     if(query !== ""){
        try{
        const response = await fetch(`${base_url}/getCount?searchTerm=${encodeURIComponent(query)}`, {
            method:'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        if(!response.ok){
            throw new Error('Failed to fetch movies', response.statusText)
        }
        const data = await response.json();
        console.log(data);
        if(data.count > 0){
            const count = data.count+1;
            const metric = {
                id: data.id,
                searchTerm: data.searchTerm,
                count: count,
                movieId: data.movieId,
                title: data.title,
                url: data.url
            };
            insertMovie(metric)
        }else{
            const metric = {
                searchTerm: query,
                count: 1,
                movieId: movie.id,
                title: movie.title,
                url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            };
            insertMovie(metric)
        }
        console.log('Metrics data:', data.count);
    }
        catch (error) {
        console.error('Error fetching metrics:', error);
        return null;
    }   
}

}

const insertMovie = async(metric)=>{
     try{
        const response = await fetch(`${base_url}/saveMetric`, {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify(metric)
        });
        if(!response.ok){
            throw new Error('Failed to fetch movies', response.statusText)
        }
        const data = await response.json();
       
        console.log('Metrics data:', data.count);
    }
        catch (error) {
        console.error('Error fetching metrics:', error);
        return null;
    }   
}

export const getTrendingMovies = async(query) =>{
    const limit = 5;
    try{
        const response = await fetch(`${base_url}/getTrending?searchTerm=${encodeURIComponent(query)}&limit=${limit}`, {
            method:'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        if(!response.ok){
            throw new Error('Failed to fetch movies', response.statusText)
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}