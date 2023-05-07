import React from "react";
import "./footerContainer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const FooterContainer = () => {
  return (
    <div className="footer_container">
      <div className="footer_body">
        <div className="footer_tier_logos">
          <div className="footer_logo">
            <a href="">
              <InstagramIcon fontSize="small" sx={{ color: "white" }} />
            </a>
          </div>
          <div className="footer_logo">
            <a href="">
              <WhatsAppIcon fontSize="small" sx={{ color: "white" }} />
            </a>
          </div>
        </div>
        <div className="footer_text">© 2023 Estación Express | 25 de Mayo 55 La Colonia, Junin - Mendoza</div>
      </div>
    </div>
  );
};

export default FooterContainer;
