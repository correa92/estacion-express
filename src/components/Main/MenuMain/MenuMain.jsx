import { Carousel } from "@trendyol-js/react-carousel";
import MenuCard from "../MenuCard/MenuCard";
import { useEffect, useState } from "react";
import Buttom from "../Buttom/Buttom";

export default function MenuMain({ list }) {
  const [columnCard, setColumnCard] = useState(window.innerWidth < 720 ? 1 : 3);

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (width < 720) {
      setColumnCard(1);
    } else if (width < 1000) {
      setColumnCard(2);
    } else {
      setColumnCard(3);
    }
  }, [width]);

  return (
    <Carousel
      show={columnCard}
      slide={1}
      transition={1}
      // swiping={true}
      responsive={true}
      dynamic={true}
      rightArrow={<Buttom direction="rigth"/>}
      leftArrow={<Buttom direction="left"/>}
    >
      {list.map((product) => {
        return (
          <div key={product.id}>
            <MenuCard
              url={product.link_img}
              subtitle={product.name}
              description={product.description}
            />
          </div>
        );
      })}
    </Carousel>
  );
}
