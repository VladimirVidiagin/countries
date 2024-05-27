import { useEffect } from "react";
import { useDispatch } from "react-redux";
import OpenStreetMapComponent from "../../entities/MapComponent/MapComponent";
import { CountriesActionTypes, Country } from "../../app/store/countries";

interface CurrentCountryCardProps {
  country: Country;
}

const CurrentCountryCard: React.FC<CurrentCountryCardProps> = ({ country }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (country) {
      dispatch({
        type: CountriesActionTypes.ADD_COUNTRY_TO_VIEWED_HISTORY,
        payload: country.name.common,
      });

      const storedViewedCountries = localStorage.getItem("viewHistory");
      let viewedCountriesArray = storedViewedCountries
        ? JSON.parse(storedViewedCountries)
        : [];

      if (!viewedCountriesArray.includes(country.name.common)) {
        viewedCountriesArray.push(country.name.common);
        localStorage.setItem(
          "viewHistory",
          JSON.stringify(viewedCountriesArray)
        );
      }
    }
  }, [country, dispatch]);

  if (!country) {
    return <p>Country not found</p>;
  }

  const lat = country.latlng[0];
  const lng = country.latlng[1];

  return (
    <article className="country-card">
      <li style={{ listStyle: "none" }} className="country-card__item">
        <h2 className="country-card__title">{country.name.common}</h2>
        <img
          className="country-card__flag"
          src={country.flags.png}
          alt={country.flags.alt}
        />
        <p>
          <b>Official Name:</b> {country.name.official}
        </p>
        <p className="country-card__capital">
          <b>Capital:</b> {country.capital.join(", ")}
        </p>
        <p className="country-card__population">
          <b>Population:</b> {country.population}
        </p>
        <p>
          <b>Area:</b> {country.area} km²
        </p>
        <p>
          <b>Continents:</b> {country.continents.join(", ")}
        </p>
        <p>
          <b>Languages:</b> {Object.values(country.languages).join(", ")}
        </p>
        <p>
          <b>Currencies:</b>
        </p>
        <ul>
          {Object.entries(country.currencies).map(([code, currency]) => (
            <li key={code}>
              {currency.name} ({currency.symbol})
            </li>
          ))}
        </ul>
        <OpenStreetMapComponent
          lat={+lat}
          lng={+lng}
          popupText={country.name.common}
        />
      </li>
    </article>
  );
};

export default CurrentCountryCard;
