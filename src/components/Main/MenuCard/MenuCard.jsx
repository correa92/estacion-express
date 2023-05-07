import "./menuCard.css";

export default function MenuCard({url, subtitle}) {
    console.log(subtitle);
  return (
    <div className="containerCard">
      <div className="containerCard-img">
        <img src={url} alt="" title="" />
        <h4>title</h4>
        <p>Infusion con 2 medialunas dulces o saladas</p>
      </div>
    </div>
  );
}
