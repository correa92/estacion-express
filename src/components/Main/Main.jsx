import InicioContainer from "./InicioContainer/InicioContainer";
import MenuMainContainer from "./MenuMainContainer/MenuMainContainer";
import NavBar from "./NavBar/NavBar";
import AcercaContainer from "./AcercaContainer/AcercaContainer";
import InstagramContainer from "./InstagramContainer/InstagramContainer";
import FooterContainer from "./FooterContainer/FooterContainer";
import ContainerCategories from "./ContainerCategories/ContainerCategories";

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
          <ContainerCategories />
        </section>
        <section>
          <MenuMainContainer />
        </section>
        <section>
          <InstagramContainer />
        </section>
      </main>
      <footer>
        <FooterContainer />
      </footer>
    </div>
  );
}
