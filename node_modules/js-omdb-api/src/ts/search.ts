import { get } from "./client";

export type TypeOfContent = "movie" | "series" | "episode";

export interface SearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: TypeOfContent;
  Poster: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Metascrore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  totalSeasons?: number;
}

export interface SeasonResult {
  season: number;
  episodes: SearchResult[];
};

export interface ShowResult extends SearchResult {
  seasons: SeasonResult[];
}

export interface ApiResult {
  Search: SearchResult[];
  totalResults: string;
  Response: string;
}

export interface RequestParams {
  contentType?: TypeOfContent;
  year?: string;
  page?: number;
  plot?: string;
  includeTomatoesRating?: boolean;
}

export const findByIdWithSeasons = (imdbId: string): Promise<ShowResult> => {
  let show: SearchResult;
  return get({ imdbId })
    .then(result => {
      show = result;
      const seasons = [];
      for (let i = 1; i <= result.totalSeasons; i++) {
        seasons.push(get({ imdbId, season: i })
          .then(season => ({ ...season, episodes: season.Episodes })));
      }
      return Promise.all(seasons);
    })
    .then((seasons: SeasonResult[]) => {
      return { ...show, seasons };
    });
};

export const findById = (imdbId: string, searchParams?: RequestParams): Promise<SearchResult> => {
  const params = { ...searchParams, imdbId };
  return get(params);
};

export const findByTitle = (title: string, searchParams: RequestParams = {}): Promise<SearchResult> => {
  const params = { ...searchParams, title };
  return get(params);
};

export const search = (query: string, searchParams?: RequestParams): Promise<ApiResult> => {
  const params = { ...searchParams, search: query };
  return get(params);
};
