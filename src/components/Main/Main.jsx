import InicioContainer from "./InicioContainer/InicioContainer";
import MenuMainContainer from "./MenuMainContainer/MenuMainContainer";
import NavBar from "./NavBar/NavBar";
import AcercaContainer from "./AcercaContainer/AcercaContainer";
import "./main.css"

export default function Main() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main className="main_container">
        <section>
          <InicioContainer />
        </section>
        <section>
          <AcercaContainer />
        </section>
        <section>
          <MenuMainContainer subtitle={"Desayunos y Meriendas"} />
        </section>
        <section>
          <h1>DESAYUNOS Y MERIENDAS</h1>
        </section>
        <section>
          <h1>VIANDAS/MENÚ DIARIO</h1>
        </section>
        <section>
          <h1>SANDWICHS</h1>
        </section>
        <section>
          <h1>SEGUINOS EN INSTAGRAM</h1>
        </section>
      </main>
      <footer>
        <h1>footer</h1>
      </footer>
    </div>
  );
}
