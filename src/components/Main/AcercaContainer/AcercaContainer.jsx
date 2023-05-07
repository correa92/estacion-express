import "./acercaContainer.css";

const AcercaContainer = () => {
  return (
    <div className="container_acerca">
      <div className="acerca_items-container">
        <div className="acerca_items">
          <div className="item_acerca">
            <img src="../../src/img/imagen-ejemplo.jpg" alt="" />
          </div>
          <div className="item_acerca">
            <div className="item_acerca-title">
              <h3>Lorem ipsum dolor sit amet.</h3>
            </div>
            <div className="item_acerca-text">
              <h4>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                labore, perferendis accusamus dignissimos in quae sit excepturi
                molestiae voluptates omnis cupiditate quaerat maiores ipsum
                facere corporis iusto tenetur totam mollitia!
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AcercaContainer;
