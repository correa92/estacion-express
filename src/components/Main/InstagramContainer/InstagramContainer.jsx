import "./instagramContainer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useState, useEffect } from "react";
import Spinner from "../../Spinner/Spinner";

const InstagramContainer = () => {
  const [publications, setPublications] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,permalink,thumbnail_url,timestamp,username&limit=6&access_token=${
      import.meta.env.VITE_INSTAGRAM_TOKEN
    }`;
    fetch(url)
      .then((res) => {
        const resultado = res.json();
        return resultado;
      })
      .then((r) => {
        setPublications(r.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div className="instagram_container" data-aos="fade-down" id="contacto">
        <div className="instagram_items">
          <div className="instagram_header">
            <div className="instagram_title">
              <h2>SEGUINOS EN NUESTRA CUENTA DE INSTAGRAM</h2>
            </div>
            <div className="instagram_tier_down">
              <div className="instagram_logo">
                <InstagramIcon fontSize="large" sx={{ color: "white" }} />
              </div>

              <div className="instagram_subtitle">
                <h3>estacion.expresss</h3>
              </div>
            </div>
          </div>

          <div className="instagram_body">
            <div className="instagram_cards">
              {publications.map((card) => (
                <div id={card.id} key={card.id} className="instagram_card" data-aos="zoom-in">
                  <a href={card.permalink} target="_blank" rel="noreferrer">
                    {" "}
                    <img
                      src={card.media_url}
                      alt="estación express instagram"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default InstagramContainer;
