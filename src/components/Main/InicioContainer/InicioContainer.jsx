import { useEffect, useState } from "react";
import "./inicioContainer.css";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../fbConfig";
import Spinner from "../../Spinner/Spinner";
import { Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ensalada from "../../../img/background/ensalada.png";

const buttonStyle = {
  "&:hover": {
    background: "#FE6A2C",
    transition: ".5s .10s",
    scale: "1.05",
    boxShadow: "0px 10px 27px -7px rgba(0,0,0,0.75)",
  },
  background: "#FE6A2C",
  borderRadius: "5rem",
  fontFamily: "Montserrat",
  padding: ".5rem 2rem",
  fontSize: { xm: "1rem", sm: "1.2rem" },
};

export default function InicioContainer() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  //   const [empty, setEmpty] = useState(true);

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
        <div className="container_inicio" id="home">
          <div className="container_img">
            <picture>
              <img
                id="img_main"
                src={ensalada}
                loading="lazy"
                alt={items[0].name}
              />
            </picture>
          </div>

          <div className="container_title" data-aos="zoom-out-up">
            <div className="container_title-items">
              <h3>HACE TU PEDIDO</h3>
              <h4>Take a way - Delivery</h4>
              <Button
                variant="contained"
                href={`https://api.whatsapp.com/send/?phone=549${items[0].movil}&text=¡Hola! Queria realizar un pedido a nombre de...&type=phone_number&app_absent=0`}
                endIcon={<WhatsAppIcon />}
                sx={buttonStyle}
              >
                whatsapp
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
