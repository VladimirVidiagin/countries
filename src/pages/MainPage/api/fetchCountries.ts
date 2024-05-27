import axios from "axios";
import { Dispatch } from "redux";
import {
  CountriesAction,
  CountriesActionTypes,
} from "../../../app/store/countries";

export const fetchCountries = async (dispatch: Dispatch<CountriesAction>) => {
  try {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favoriteCountries") || "[]"
    );
    dispatch({
      type: CountriesActionTypes.FETCH_COUNTRIES,
    });
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,continents,languages,area,currencies,maps,latlng"
    );
    dispatch({
      type: CountriesActionTypes.FETCH_COUNTRIES_SUCCESS,
      payload: {
        countries: response.data,
        favoriteCountries: storedFavorites,
      },
    });
  } catch (error) {
    // Проверка типа ошибки
    let errorMessage = "An unknown error occurred.";
    if (axios.isAxiosError(error) && error.message) {
      errorMessage = error.message;
    } else if (error instanceof Error && error.message) {
      errorMessage = error.message;
    }

    dispatch({
      type: CountriesActionTypes.FETCH_COUNTRIES_ERROR,
      payload: errorMessage,
    });
    console.error("Error fetching countries", error);
  }
};
