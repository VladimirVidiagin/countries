interface Flags {
  alt: string;
  png: string;
  svg: string;
}

interface CountryName {
  common: string;
  official: string;
}

interface Currency {
  name: string;
  symbol: string;
}

interface Currencies {
  [key: string]: Currency;
}

interface Languages {
  [key: string]: string;
}

export interface Country {
  area: number;
  capital: string[];
  continents: string[];
  currencies: Currencies;
  flags: Flags;
  languages: Languages;
  name: CountryName;
  population: number;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  latlng: string[];
}

export interface CountriesState {
  loading: boolean;
  error: null | string;
  countries: Country[];
  favoriteCountries: string[];
  viewedCountriesHistory: string[];
}

export enum CountriesActionTypes {
  FETCH_COUNTRIES = "FETCH_COUNTRIES",
  FETCH_COUNTRIES_SUCCESS = "FETCH_COUNTRIES_SUCCESS",
  FETCH_COUNTRIES_ERROR = "FETCH_COUNTRIES_ERROR",
  ADD_FAVORITE_COUNTRY = "ADD_FAVORITE_COUNTRY",
  REMOVE_FAVORITE_COUNTRY = "REMOVE_FAVORITE_COUNTRY",
  GET_VIEWED_COUNTRIES_HISTORY = "GET_VIEWED_COUNTRIES_HISTORY",
  ADD_COUNTRY_TO_VIEWED_HISTORY = "ADD_COUNTRY_TO_VIEWED_HISTORY",
  CLEAR_ALL_VIEWED_COUNTRIES_HISTORY = "CLEAR_ALL_VIEWED_COUNTRIES_HISTORY",
}

interface FetchCountriesAction {
  type: CountriesActionTypes.FETCH_COUNTRIES;
}

interface FetchCountriesSuccessAction {
  type: CountriesActionTypes.FETCH_COUNTRIES_SUCCESS;
  payload: { countries: Country[]; favoriteCountries: string[] };
}

interface FetchCountriesErrorAction {
  type: CountriesActionTypes.FETCH_COUNTRIES_ERROR;
  payload: string;
}

interface AddFavoriteCountryAction {
  type: CountriesActionTypes.ADD_FAVORITE_COUNTRY;
  payload: string;
}

interface DeleteFavoriteCountryAction {
  type: CountriesActionTypes.REMOVE_FAVORITE_COUNTRY;
  payload: string;
}

interface GetViewedCountriesHistoryAction {
  type: CountriesActionTypes.GET_VIEWED_COUNTRIES_HISTORY;
  payload: string[];
}

interface AddCountryToViewedHistoryAction {
  type: CountriesActionTypes.ADD_COUNTRY_TO_VIEWED_HISTORY;
  payload: string;
}

interface ClearAllViewedCountriesHistoryAction {
  type: CountriesActionTypes.CLEAR_ALL_VIEWED_COUNTRIES_HISTORY;
}

export type CountriesAction =
  | FetchCountriesAction
  | FetchCountriesSuccessAction
  | FetchCountriesErrorAction
  | AddFavoriteCountryAction
  | DeleteFavoriteCountryAction
  | GetViewedCountriesHistoryAction
  | AddCountryToViewedHistoryAction
  | ClearAllViewedCountriesHistoryAction;
