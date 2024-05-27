import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CountriesActionTypes, Country } from "../../../app/store/countries";
import { useTypedSelector } from "../../../shared/hooks/useTypedSelector";
import Button from "../../../shared/Button/Button";

interface FeedCountryCardProps {
  country: Country;
}
const FeedCountryCard: React.FC<FeedCountryCardProps> = ({ country }) => {
  const dispatch = useDispatch();
  const { favoriteCountries } = useTypedSelector((state) => state.countries);

  const isFavorite = favoriteCountries.includes(country.name.common);

  const handleFavoriteClick = (event: {
    stopPropagation: () => void;
    preventDefault: () => void;
  }) => {
    event.stopPropagation();
    event.preventDefault();

    const favoriteCountries = JSON.parse(
      localStorage.getItem("favoriteCountries") || "[]"
    );

    if (isFavorite) {
      const updatedFavorites = favoriteCountries.filter(
        (name: string) => name !== country.name.common
      );
      dispatch({
        type: CountriesActionTypes.REMOVE_FAVORITE_COUNTRY,
        payload: country.name.common,
      });
      localStorage.setItem(
        "favoriteCountries",
        JSON.stringify(updatedFavorites)
      );
    } else {
      favoriteCountries.unshift(country.name.common);
      dispatch({
        type: CountriesActionTypes.ADD_FAVORITE_COUNTRY,
        payload: country.name.common,
      });
      localStorage.setItem(
        "favoriteCountries",
        JSON.stringify(favoriteCountries)
      );
    }
  };

  return (
    <Link to={`/countries/${country.name.common}`}>
      <article className="country-card">
        <li className="country-card__item">
          <h2 className="country-card__title">{country.name.common}</h2>
          <img
            className="country-card__flag"
            src={country.flags.png}
            alt={country.name.common}
          />
          <p className="country-card__capital">
            <b>Capital:</b> {country.capital}
          </p>
          <p className="country-card__population">
            <b>Population:</b> {country.population}
          </p>

          <div className="favorite-button">
            <Button type="secondary" onClick={handleFavoriteClick}>
              {isFavorite ? "❤️" : "🤍"}
            </Button>
          </div>
        </li>
      </article>
    </Link>
  );
};

export default FeedCountryCard;
