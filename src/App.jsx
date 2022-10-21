// @ts-nocheck
import "./App.scss";
import "swiper/css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import RoutesApp from "./config/Routes";

function App() {
  return (
    <>
      <Header />
      <RoutesApp />
      <Footer />
    </>
  );
}

export default App;
