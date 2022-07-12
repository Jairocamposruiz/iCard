import { useEffect } from "react";

import { ListCategories } from "../../../components/Client";
import { useCategory } from "../../../hooks";
import "./Categories.scss";

export const Categories = () => {
  const { loading, categories, getCategories } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h3>Categorías</h3>
      {loading ? <p>Cargando</p> : <ListCategories categories={categories} />}
    </div>
  );
};
