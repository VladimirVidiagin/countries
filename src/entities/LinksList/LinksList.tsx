import { Link } from "react-router-dom";
import Button from "../../shared/Button/Button";

interface LinksListProps {
  list: string[];
  url: string;
  hasButton?: boolean;
  functionForButton?: (
    event: React.MouseEvent<HTMLButtonElement>,
    countryName: string
  ) => void;
}

const LinksList: React.FC<LinksListProps> = ({
  list,
  url,
  hasButton = false,
  functionForButton,
}) => {
  return (
    <ul className="links-list">
      {list.map((item, index) => {
        return (
          <li key={index} className="links-list__item">
            <Link to={`${url}${item}`} className="links-list__link">
              <p className="links-list__text">{item}</p>
            </Link>

            {hasButton && functionForButton && (
              <Button
                type="secondary"
                onClick={(e) => {
                  functionForButton(e, item);
                }}
              >
                Remove
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default LinksList;
