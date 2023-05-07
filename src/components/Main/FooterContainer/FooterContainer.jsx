import "./footerContainer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const FooterContainer = () => {
  return (
    <div className="footer_container">
      <div className="footer_body">
        <div className="footer_tier_logos">
          <div className="footer_logo">
            <a href="https://www.instagram.com/estacion.expresss/">
              <InstagramIcon fontSize="large" sx={{ color: "white" }} />
            </a>
          </div>
          <div className="footer_logo">
            <a href="">
              <WhatsAppIcon fontSize="large" sx={{ color: "white" }} />
            </a>
          </div>
        </div>
        <div className="footer_text">
          <p>
            © 2023 ESTACIÓN Express | 25 de Mayo 55 La Colonia, Junin - Mendoza.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterContainer;
