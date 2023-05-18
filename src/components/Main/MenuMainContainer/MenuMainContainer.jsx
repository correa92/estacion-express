import "./menuMainContainer.css";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../fbConfig";
import { useEffect, useState } from "react";

import MenuMain from "../MenuMain/MenuMain";
import Spinner from "../../Spinner/Spinner";

export default function MenuMainContainer() {
  const [loading, setLoading] = useState(true);
  const [panificadosCafeteria, setPanificadosCafeteria] = useState([]);
  const [bebidasJugosFrutales, setBebidasJugosFrutales] = useState([]);
  const [lacteosPostres, setLacteosPostres] = useState([]);
  const [comidasSnaks, setComidasSnaks] = useState([]);
  const [ensaladasSandwich, setEnsaladasSandwich] = useState([]);

  useEffect(() => {
    const filtro = query(collection(db, "products"));
    getDocs(filtro)
      .then((doc) => {
        if (!doc.empty) {
          const productos = doc.docs.map((documento) => {
            const document = { ...documento.data() };
            setLoading(false);
            return document;
          });

          const panificados = productos.filter(
            (prod) =>
              (prod.category == "PANIFICADOS" ||
                prod.category == "CAFETERÍA") &&
              prod.post === true
          );

          setPanificadosCafeteria(panificados);

          const bebidas = productos.filter(
            (prod) =>
              (prod.category == "BEBIDAS" ||
                prod.category == "JUGOS FRUTALES") &&
              prod.post === true
          );
          setBebidasJugosFrutales(bebidas);

          const lacteos = productos.filter(
            (prod) =>
              (prod.category == "LÁCTEOS" || prod.category == "POSTRES") &&
              prod.post === true
          );
          setLacteosPostres(lacteos);

          const comidas = productos.filter(
            (prod) =>
              (prod.category == "COMIDAS" || prod.category == "SNAKS") &&
              prod.post === true
          );
          setComidasSnaks(comidas);

          const ensaladas = productos.filter(
            (prod) =>
              (prod.category == "ENSALADAS" || prod.category == "SANDWICHS") &&
              prod.post === true
          );
          setEnsaladasSandwich(ensaladas);
        } else {
          setLoading(false);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="containerMenuMain" id="menu">
            <h2>Panificados / Cafetería</h2>
            <div className="containerMenu">
              <MenuMain list={panificadosCafeteria} />
            </div>
          </div>

          <div className="containerMenuMain">
            <h2 id="category4">Viandas / Snaks</h2>
            <div className="containerMenu">
              <MenuMain list={comidasSnaks} />
            </div>
          </div>

          <div className="containerMenuMain">
            <h2 id="category5">Sandwichs / Ensaladas</h2>
            <div className="containerMenu">
              <MenuMain list={ensaladasSandwich} />
            </div>
          </div>

          <div className="containerMenuMain">
            <h2 id="category2">Bebídas / Jugos Frutales</h2>
            <div className="containerMenu">
              <MenuMain list={bebidasJugosFrutales} />
            </div>
          </div>

          <div className="containerMenuMain">
            <h2 id="category3">Lácteos / Postres</h2>
            <div className="containerMenu">
              <MenuMain list={lacteosPostres} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
