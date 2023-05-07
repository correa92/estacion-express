import InicioContainer from "./InicioContainer/InicioContainer";
import MenuMainContainer from "./MenuMainContainer/MenuMainContainer";
import NavBar from "./NavBar/NavBar";

export default function Main() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <section>
          <InicioContainer />
        </section>
        <section>
          <MenuMainContainer />
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
