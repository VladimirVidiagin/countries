import {
  CountriesAction,
  CountriesActionTypes,
  CountriesState,
} from "./countries";

const history = JSON.parse(localStorage.getItem("viewHistory") || "[]");

const initialState: CountriesState = {
  loading: false,
  error: null,
  countries: [],
  favoriteCountries: [],
  viewedCountriesHistory: history,
};

export const countriesReducer = (
  state = initialState,
  action: CountriesAction
): CountriesState => {
  switch (action.type) {
    case CountriesActionTypes.FETCH_COUNTRIES:
      return {
        loading: true,
        error: null,
        countries: state.countries,
        favoriteCountries: state.favoriteCountries,
        viewedCountriesHistory: state.viewedCountriesHistory,
      };
    case CountriesActionTypes.FETCH_COUNTRIES_SUCCESS:
      return {
        loading: false,
        error: null,
        countries: action.payload.countries,
        favoriteCountries: action.payload.favoriteCountries,
        viewedCountriesHistory: state.viewedCountriesHistory,
      };
    case CountriesActionTypes.FETCH_COUNTRIES_ERROR:
      return {
        loading: false,
        error: action.payload,
        countries: [],
        favoriteCountries: [],
        viewedCountriesHistory: state.viewedCountriesHistory,
      };
    case CountriesActionTypes.ADD_FAVORITE_COUNTRY:
      return {
        loading: state.loading,
        error: state.error,
        countries: state.countries,
        favoriteCountries: [action.payload, ...state.favoriteCountries],
        viewedCountriesHistory: state.viewedCountriesHistory,
      };
    case CountriesActionTypes.REMOVE_FAVORITE_COUNTRY:
      return {
        loading: state.loading,
        error: state.error,
        countries: state.countries,
        favoriteCountries: state.favoriteCountries.filter(
          (el) => el !== action.payload
        ),
        viewedCountriesHistory: state.viewedCountriesHistory,
      };
    case CountriesActionTypes.GET_VIEWED_COUNTRIES_HISTORY:
      return {
        loading: state.loading,
        error: state.error,
        countries: state.countries,
        favoriteCountries: state.favoriteCountries,
        viewedCountriesHistory: action.payload,
      };
    case CountriesActionTypes.ADD_COUNTRY_TO_VIEWED_HISTORY:
      return {
        loading: state.loading,
        error: state.error,
        countries: state.countries,
        favoriteCountries: state.favoriteCountries,
        viewedCountriesHistory: [
          action.payload,
          ...state.viewedCountriesHistory,
        ],
      };
    case CountriesActionTypes.CLEAR_ALL_VIEWED_COUNTRIES_HISTORY:
      return {
        loading: state.loading,
        error: state.error,
        countries: state.countries,
        favoriteCountries: state.favoriteCountries,
        viewedCountriesHistory: [],
      };
    default:
      return state;
  }
};
