import "./menuMainContainer.css";
import { Carousel } from "@trendyol-js/react-carousel";
import img1 from "../../../img/bebidas/1366_2000.jpg";
import img2 from "../../../img/cafeteria/cocinillas_193495389_116293001_1706x960.jpg";
import img3 from "../../../img/comidas/comida-rapida-casera.jpg";
import img4 from "../../../img/ensaladas/ensaladas-para-almuerzo-1200x720.jpg";
import img5 from "../../../img/jugos frutales/1140-limofresa-gas-drink-esp.jpg";
import img6 from "../../../img/lacteos/caserio-7-2022.jpg";
import MenuCard from "../MenuCard/MenuCard";

export default function MenuMainContainer({ subtitle }) {
  return (
    <div className="containerMenuMain">

        <h2>{subtitle}</h2>

      <div className="containerMenu">
        <Carousel
          show={3.5}
          slide={3}
          transition={1}
          swiping={true}
          responsive={true}
        >
          <MenuCard
            url={img1}
            subtitle={"BEBÍDAS"}
            description={"Infusion con 2 medialunas dulces o saladas"}
          />
          <MenuCard
            url={img2}
            subtitle={"DESAYUNO"}
            description={"Infusion con 2 medialunas dulces o saladas"}
          />
          <MenuCard
            url={img3}
            subtitle={"COMIDAS"}
            description={"Infusion con 2 medialunas dulces o saladas"}
          />
          <MenuCard
            url={img4}
            subtitle={"ENSALADAS"}
            description={"Infusion con 2 medialunas dulces o saladas"}
          />
          <MenuCard
            url={img5}
            subtitle={"JUGOS FRUTALES"}
            description={"Infusion con 2 medialunas dulces o saladas"}
          />
          <MenuCard
            url={img6}
            subtitle={"LACTEOS"}
            description={"Infusion con 2 medialunas dulces o saladas"}
          />
        </Carousel>
      </div>
    </div>
  );
}
