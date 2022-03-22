import "./App.css";
import ContentArea from "./components/contentArea";
import Footer from "./components/footer";
import Nav from "./components/nav";

function App() {
  return (
    <div className="App">
      <div className="container-fluid"></div>
      <div className="d-flex flex-column justify-content-between wrapper">
        <header className="App-header">
          <Nav />
        </header>
        <ContentArea />
        <Footer />
      </div>
    </div>
  );
}

export default App;
