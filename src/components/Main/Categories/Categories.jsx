import cat1 from "../../../img/categories/cat1.png";
import cat2 from "../../../img/categories/cat2.png";
import cat3 from "../../../img/categories/cat3.png";
import "./categories.css";

export default function Categories() {
  return (
    <div className="containerGralCategories">
      <h3>DISFRUTA EL SABOR DE NUESTRAS ESPECIALIDADES</h3>
      <div className="containerCategories">
        <div className="containerCategory">
          <img src={cat1} alt="desayunos" />
        </div>
        <div className="containerCategory">
          <img src={cat2} alt="viandas" />
        </div>
        <div className="containerCategory">
          <img src={cat3} alt="sandwiches" />
        </div>
      </div>
    </div>
  );
}
