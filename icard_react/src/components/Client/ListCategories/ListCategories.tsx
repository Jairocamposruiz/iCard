import { useNavigate, useLocation } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { map } from "lodash";

import "./ListCategories.scss";

interface Props {
  categories: Category[];
}

export const ListCategories = ({ categories }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToCategory = (id: ID) => {
    navigate(`${location.pathname}/categories/${id}`);
  };

  return (
    <div className="list-categories-client">
      {map(categories, (category) => (
        <div
          onClick={() => goToCategory(category.id)}
          key={category.id}
          className="list-categories-client__category"
        >
          <Image src={category.image} size="small" />
          <span>{category.title}</span>
        </div>
      ))}
    </div>
  );
};
