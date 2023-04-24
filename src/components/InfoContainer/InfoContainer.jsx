import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../fbConfig";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import Info from "../Info/Info";

export default function InfoContainer() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState(true);

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
          setEmpty(false);
        } else {
          setLoading(false);
          setEmpty(true);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <h2>MI NEGOCIO</h2>

      <div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {empty ? (
              <h1>No se encontró información</h1>
            ) : (
              <Info infoData={items} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
