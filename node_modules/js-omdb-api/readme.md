# omdbapi for the browser
This is a small javascript library for the [omdbapi](http://www.omdbapi.com/).</br>
It is ment to be used in the browser. 
It can be used in nodejs as well but then you will need to adjust the fetch package.

## features
- Typescript support
- Promise api

## Installation
```
npm install --save js-omdb-api
```

## Usage
### Find a show by imdb ID
``` Typescript
import { findById } from "js-omdb-api";

findById("tt0944947", {
  contentType: '',                // "movie" | "series" | "episode"
  year: '',                       // string
  plot: '',                       // string
  includeTomatoesRating: true,    // boolean
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
}));
```

### Find a show by imdb ID and get all season information
``` Typescript
import { findByIdWithSeasons } from "js-omdb-api";

findByIdWithSeasons("tt0944947")
  .then(result => {
    console.log(result.seasons[0].episodes);
  });
```

### Find a show by title
``` Typescript
import { findByTitle } from "js-omdb-api";

findByTitle("Game of Thrones", {
  contentType: '',                // "movie" | "series" | "episode"
  year: '',                       // string
  plot: '',                       // string
  includeTomatoesRating: true,    // boolean
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
}));
```

### search
``` Typescript
import { search } from "js-omdb-api";

search("Thrones", {
  contentType: '',                // "movie" | "series" | "episode"
  year: '',                       // string
  page: 1                         // number
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
}));
```
