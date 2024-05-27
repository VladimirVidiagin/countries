import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CountriesActionTypes } from "../../app/store/countries";
import PageTitle from "../../shared/PageTitle/PageTitle";
import LinksList from "../../entities/LinksList/LinksList";

const FavoriteCountriesPage: React.FC = () => {
  const dispatch = useDispatch();
  const [favoriteCountries, setFavoriteCountries] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteCountries");
    if (storedFavorites) {
      const favoriteCountriesArray = JSON.parse(storedFavorites);
      setFavoriteCountries(favoriteCountriesArray);
    }
  }, [favoriteCountries]);

  const removeFromFavorites = (
    event: React.MouseEvent<HTMLButtonElement>,
    countryName: string
  ) => {
    event.stopPropagation();

    const updatedFavorites = favoriteCountries.filter(
      (country) => country !== countryName
    );
    dispatch({
      type: CountriesActionTypes.REMOVE_FAVORITE_COUNTRY,
      payload: countryName,
    });
    localStorage.setItem("favoriteCountries", JSON.stringify(updatedFavorites));
  };

  return (
    <main className="favorite-countries-page">
      <PageTitle
        title={
          favoriteCountries.length > 0
            ? "Favorite Countries"
            : "No favorite countries yet"
        }
      />
      {favoriteCountries && (
        <LinksList
          list={favoriteCountries}
          url="/countries/"
          hasButton
          functionForButton={removeFromFavorites}
        />
      )}
    </main>
  );
};

export default FavoriteCountriesPage;
