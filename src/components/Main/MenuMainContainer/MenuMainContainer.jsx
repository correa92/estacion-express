import "./menuMainContainer.css";
import { Carousel } from '@trendyol-js/react-carousel';
import img1 from "../../../img/bebidas/1366_2000.jpg";
import img2 from "../../../img/cafeteria/cocinillas_193495389_116293001_1706x960.jpg";
import img3 from "../../../img/comidas/comida-rapida-casera.jpg";
import img4 from "../../../img/ensaladas/ensaladas-para-almuerzo-1200x720.jpg";
import img5 from "../../../img/jugos frutales/1140-limofresa-gas-drink-esp.jpg";
import img6 from "../../../img/lacteos/caserio-7-2022.jpg";
import MenuCard from "../MenuCard/MenuCard";

export default function MenuMainContainer() {
  return (
    <div className="containerMenuMain">
      <h2>DISFRUTA EL SABOR DE NUESTRAS ESPECIALIDADES</h2>
      <div className="containerMenu">
        <MenuCard url={img1} subtitle={"Bebidas"}/>
        
        <Carousel show={3} slide={3} transition={1}  responsive={true} swiping={true} rightArrow={false} leftArrow={false}>

        <MenuCard url={img2} subtitle={"Cafetería"}/>

        <div className="containerImg">
          <h4>Almuerzo/Cena</h4>
          <img src={img3} alt="" title="" className="img" />
        </div>
        <div className="containerImg">
          <h4>Ensaladas</h4>
          <img src={img4} alt="" title="" className="img" />
        </div>
        <div className="containerImg">
          <h4>Jugos frutales</h4>
          <img src={img5} alt="" title="" className="img" />
        </div>
        <div className="containerImg">
          <h4>Lacteos</h4>
          <img src={img6} alt="" title="" className="img" />
        </div>
        </Carousel>
        
      </div>
    </div>
  );
}
