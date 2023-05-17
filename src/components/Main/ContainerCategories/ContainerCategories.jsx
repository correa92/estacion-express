import { useState } from "react";
import Categories from "../Categories/Categories";
import "./containerCategories.css";
import cat1 from "../../../img/categories/cat1.png";
import cat2 from "../../../img/categories/cat2.jpg";
import cat3 from "../../../img/categories/cat3.jpg";
import cat4 from "../../../img/categories/cat4.jpg";
import cat5 from "../../../img/categories/cat5.jpg";

export default function ContainerCategories() {
  const [categorias, setCategorias] = useState([
    {
      category: "CAFETERÍA",
      img: `${cat1}`,
      idRef: "#menu",
    },
    {
      category: "JUGOS FRUTALES",
      img: `${cat2}`,
      idRef: "#category2",
    },
    { category: "POSTRES", img: `${cat3}`, idRef: "#category3" },
    { category: "VIANDAS", img: `${cat4}`, idRef: "#category4" },
    { category: "SANDWICHES", img: `${cat5}`, idRef: "#category5" },
  ]);

  return (
    <>
      <div className="containerGralCategories">
        <h3>DISFRUTA EL SABOR DE NUESTRAS ESPECIALIDADES</h3>
        <div className="containerCategories">
          <Categories list={categorias} />
        </div>
      </div>
    </>
  );
}
