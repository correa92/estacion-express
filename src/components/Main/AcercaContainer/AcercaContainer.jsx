import "./acercaContainer.css";

const AcercaContainer = () => {
  return (
    <div className="container_acerca" data-aos="fade-down">
      <div className="acerca_items-container">
        <div className="acerca_items">
          <div className="item_acerca">
            <img
              src="../../src/img/acerca_imagenes/imagen-ejemplo.jpg"
              alt=""
            />
          </div>
          <div className="item_acerca">
            <div className="item_acerca-title">
              <h3>ACERCA DE NOSOTROS</h3>
            </div>
            <div className="item_acerca-text">
              <h4>
                Somos una empresa familiar apasionados por la gastronomía y
                nuestro objetivos es llevar a cada uno de nuestros clientes una
                porción de esos sabores que tanto nos une y nos gusta. En
                estación express queremos brindarte los mejores desayunos,
                almuerzos y meriendas, con la calidez y el sabor que nos
                caracteriza.
              </h4>
              <br />
              <h4>
                <i>“A quién madruga, un buen café lo ayuda”</i>
              </h4>
            </div>
          </div>
        </div>
        <div className="acerca_items-info">
          <div className="item_acerca-info">
            <div className="item_acerca-text">
              <h4>
                <b>Encontranos en:</b> 25 de Mayo 55 La Colonia, Junin - Mendoza
              </h4>
              <h4>
                <b>Contacto:</b> +54 9 263 236 5239
              </h4>
              <h4>
                <b>Atención: </b>
                De Lunes a Viernes de 8:00 a 21:00hs. Sabados de 9:00 a 14:00hs
              </h4>
            </div>
          </div>
          <div className="item_acerca-info-img">
            <img src="../../src/img/acerca_imagenes/cafe.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AcercaContainer;
