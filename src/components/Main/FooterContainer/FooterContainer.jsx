import "./footerContainer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import dayjs from "dayjs";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../fbConfig";
import { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
const FooterContainer = () => {
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
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="footer_container">
          <div className="footer_body">
            <div className="footer_tier_logos">
              <div className="footer_logo">
                <a href={items[0]?.instagram}>
                  <InstagramIcon fontSize="large" sx={{ color: "white" }} />
                </a>
              </div>
              <div className="footer_logo">
                <a
                  href={`https://api.whatsapp.com/send/?phone=549${items[0].movil}&text=${items[0].message_whatsapp}&type=phone_number&app_absent=0`}
                >
                  <WhatsAppIcon fontSize="large" sx={{ color: "white" }} />
                </a>
              </div>
            </div>
            <div className="footer_text">
              <p>
                © {dayjs().year()} {items[0]?.name} | {items[0]?.birthplace}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FooterContainer;
