import { useState, useEffect } from "react";
import { TextField, SelectChangeEvent } from "@mui/material";
import { useTypedSelector } from "../../shared/hooks/useTypedSelector";
import { Country } from "../../app/store/countries";
import SelectInput from "../../shared/SelectInput/SelectInput";
import Button from "../../shared/Button/Button";

interface FormValues {
  search: string;
  selectedContinent: string;
  selectedCurrency: string;
  selectedLanguage: string;
  sortMethod: "area" | "population" | "";
}

interface CountriesSortFilterFormProps {
  setFilteredSortedCountries: (contries: Country[]) => void;
  setCurrentPage: (pageNumber: number) => void;
}

const CountriesSortFilterForm: React.FC<CountriesSortFilterFormProps> = ({
  setFilteredSortedCountries,
  setCurrentPage,
}) => {
  const { countries } = useTypedSelector((state) => state.countries);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    search: "",
    selectedContinent: "",
    selectedCurrency: "",
    selectedLanguage: "",
    sortMethod: "",
  });

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setCurrentPage(1);
  };

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value as string,
    }));
    setCurrentPage(1);
  };

  useEffect(() => {
    const filteredCountries = countries.filter((country) => {
      const matchesName = country.name.common
        .toLowerCase()
        .includes(formValues.search.toLowerCase());
      const matchesContinent = formValues.selectedContinent
        ? country.continents.includes(formValues.selectedContinent)
        : true;
      const matchesCurrency = formValues.selectedCurrency
        ? Object.values(country.currencies).some(
            (currency) => currency.name === formValues.selectedCurrency
          )
        : true;
      const matchesLanguage = formValues.selectedLanguage
        ? Object.values(country.languages).includes(formValues.selectedLanguage)
        : true;

      return (
        matchesName && matchesContinent && matchesCurrency && matchesLanguage
      );
    });

    const sortedCountries = [...filteredCountries].sort((a, b) => {
      if (formValues.sortMethod === "area") {
        return b.area - a.area;
      } else if (formValues.sortMethod === "population") {
        return b.population - a.population;
      }
      return 0;
    });
    setFilteredSortedCountries(sortedCountries);
  }, [formValues, countries, setFilteredSortedCountries]);

  const createOptions = (
    items: string[]
  ): { label: string; value: string }[] => {
    return [
      { label: "Not chosen yet", value: "" },
      ...items.map((item) => ({ label: item, value: item })),
    ];
  };

  const continentsOptions = createOptions(
    Array.from(new Set(countries.flatMap((country) => country.continents)))
  );

  const currenciesOptions = createOptions(
    Array.from(
      new Set(
        countries.flatMap((country) =>
          Object.values(country.currencies).map((currency) => currency.name)
        )
      )
    )
  );

  const languagesOptions = createOptions(
    Array.from(
      new Set(countries.flatMap((country) => Object.values(country.languages)))
    )
  );

  const sortOptions = [
    { label: "No Sort", value: "" },
    { label: "Sort by Area", value: "area" },
    { label: "Sort by Population", value: "population" },
  ];

  return (
    <form className="main-page-form">
      <div className="main-page-form__narrowed-section">
        <TextField
          label="Search for the country"
          name="search"
          value={formValues.search}
          onChange={handleTextFieldChange}
          fullWidth
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            setIsSearchExpanded(!isSearchExpanded);
          }}
        >
          {isSearchExpanded ? "Narrowed Search" : "Expanded Search"}
        </Button>
      </div>

      {isSearchExpanded && (
        <div className="main-page-form__expanded-section">
          <SelectInput
            label="Search by Continent"
            name="selectedContinent"
            value={formValues.selectedContinent}
            onChange={handleSelectChange}
            options={continentsOptions}
            style={{ flex: "1 1 22%", minWidth: "150px" }}
          />
          <SelectInput
            label="Search by Currency"
            name="selectedCurrency"
            value={formValues.selectedCurrency}
            onChange={handleSelectChange}
            options={currenciesOptions}
            style={{ flex: "1 1 22%", minWidth: "150px" }}
          />
          <SelectInput
            label="Search by Language"
            name="selectedLanguage"
            value={formValues.selectedLanguage}
            onChange={handleSelectChange}
            options={languagesOptions}
            style={{ flex: "1 1 22%", minWidth: "150px" }}
          />
          <SelectInput
            label="Sorting"
            name="sortMethod"
            value={formValues.sortMethod}
            onChange={handleSelectChange}
            options={sortOptions}
            style={{ flex: "1 1 22%", minWidth: "150px" }}
          />
        </div>
      )}
    </form>
  );
};

export default CountriesSortFilterForm;
