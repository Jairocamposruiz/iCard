import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { ListProducts } from "../../../components/Client";
import { useProduct } from "../../../hooks";
import "./Products.scss";

export const Products = () => {
  const { tableNumber, categoryId } = useParams();
  const { getProductsByCategory, products, loading } = useProduct();

  useEffect(() => {
    getProductsByCategory(categoryId as any);
  }, []);

  return (
    <div>
      <Link to={`/client/${tableNumber}`}>Volver a categorias</Link>
      <h3>Productos</h3>
      {loading ? <p>Cargando</p> : <ListProducts products={products} />}
    </div>
  );
};
