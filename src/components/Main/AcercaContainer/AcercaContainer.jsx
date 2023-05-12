import "./acercaContainer.css";
import imgTeam from "../../../img/acerca_imagenes/team.jpeg";
import imgCafe from "../../../img/acerca_imagenes/cafe.png";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../fbConfig";
import Spinner from "../../Spinner/Spinner";

const AcercaContainer = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);


  useEffect(() => {
    const filtro = query(collection(db, "info"));
    getDocs(filtro)
      .then((doc) => {
        if (!doc.empty) {
          const eventos = doc.docs.map((documento) => {
            const document = { ...documento.data() };
            setLoading(false);
            return document;
          });
          setItems(eventos);

        } else {
          setLoading(false);

        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      {" "}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container_acerca" data-aos="fade-down" id="nosotros">
          <div className="acerca_items-container">
            <div className="acerca_items">
              <div className="item_acerca item_acerca_img">
                <img
                  src={imgTeam}
                  alt="equipo estación express"
                  title="equipo estación express"
                />
              </div>

              <div className="item_acerca">
                <div className="item_acerca-title">
                  <h3>ACERCA DE NOSOTROS</h3>
                </div>

                <div className="item_acerca-text">
                  <h4>
                    {items[0].description}
                  </h4>
                  <br />
                  <h4>
                    <strong>
                      <i>“A quién madruga, un buen café lo ayuda”</i>
                    </strong>
                  </h4>
                </div>
              </div>
            </div>

            <div className="acerca_items-info">
              <div className="item_acerca-info">
                <div className="item_acerca-text">
                  <h4>
                    <b>Encontranos en:</b> {items[0].birthplace}
                  </h4>
                  <h4>
                    <b>Contacto:</b> +54 9 {items[0].movil}
                  </h4>
                  <h4>
                    <b>Atención: </b>
                    {items[0].dayAndHour}
                  </h4>
                </div>
              </div>
              <div className="item_acerca-info-img">
                <img src={imgCafe} alt="cafe.png" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AcercaContainer;
