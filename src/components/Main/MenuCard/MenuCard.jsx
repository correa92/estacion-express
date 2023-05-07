import "./menuCard.css";

export default function MenuCard({ url, subtitle, description }) {
  return (
    <div className="containerCard" data-aos="fade-down">
      <picture className="containerCard-img">
        <img src={url} alt="" title="" />
      </picture>

      <div className="containerText">
        <h4>{subtitle}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
