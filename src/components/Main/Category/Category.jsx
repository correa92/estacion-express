import "./category.css";
export default function Category({ url, category, idRef }) {
  return (<>


    <div className="containerCardCategory">
      <a href={idRef} style={{textDecoration:"none"}}>

      <picture className="containerCardCategory-img">
        <img src={url} alt={category} title={category} />
      </picture>

      <div className="containerTextCategory">
      <h4>{category}</h4>
      </div>
      </a>
    </div>
  </>
    
  );
}
