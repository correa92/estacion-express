import InicioContainer from "./InicioContainer/InicioContainer";
import MenuMainContainer from "./MenuMainContainer/MenuMainContainer";
import NavBar from "./NavBar/NavBar";
import AcercaContainer from "./AcercaContainer/AcercaContainer";

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
          <AcercaContainer />
        </section>
        <section>
          <MenuMainContainer />
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
