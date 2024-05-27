import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../shared/hooks/useTypedSelector";
import { SelectChangeEvent } from "@mui/material/Select";
import { Country } from "../../app/store/countries";
import CurrentCountryCard from "../../widgets/CurrentCountryCard/CurrentCountryCard";
import SelectInput from "../../shared/SelectInput/SelectInput";

const CurrentCountryPage: React.FC = () => {
  const params = useParams<{ countryName: string }>();

  const { countries } = useTypedSelector((state) => state.countries);

  const countryName = params.countryName;

  const currentCountry = countries.find(
    (country) => countryName === country.name.common
  );

  const [comparisonCountry, setComparisonCountry] = useState<Country | null>(
    null
  );

  const handleComparisonCountryChange = (
    event: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string>
  ) => {
    const selectedCountry = countries.find(
      (country) => country.name.common === event.target.value
    );
    if (selectedCountry) {
      setComparisonCountry(selectedCountry);
    }
  };

  if (!currentCountry) {
    return (
      <main className="current-country-page">
        <p>Please, go back to the main page to continue browsing</p>
      </main>
    );
  }

  return (
    <main className="current-country-page">
      <SelectInput
        label="Compare with:"
        name="comparison-country"
        value={comparisonCountry ? comparisonCountry.name.common : ""}
        onChange={handleComparisonCountryChange}
        options={countries.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }))}
        style={{ width: "100%" }}
      />
      {comparisonCountry && (
        <div className="current-country-page__comparison-results">
          <h3>Comparison Result:</h3>
          <p>
            <b>Area:</b>{" "}
            {currentCountry.area > comparisonCountry.area
              ? currentCountry.name.common
              : comparisonCountry.name.common}{" "}
            has a larger area.
          </p>
          <p>
            <b>Population:</b>{" "}
            {currentCountry.population > comparisonCountry.population
              ? currentCountry.name.common
              : comparisonCountry.name.common}{" "}
            has a larger population.
          </p>
        </div>
      )}
      <ul className="current-country-page__cards-section">
        <CurrentCountryCard country={currentCountry} />
        {comparisonCountry && (
          <CurrentCountryCard country={comparisonCountry} />
        )}
      </ul>
    </main>
  );
};

export default CurrentCountryPage;
