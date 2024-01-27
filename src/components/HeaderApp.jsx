import HeaderImage from "../assets/Header-Picture.jpg";

function HeaderApp() {
  return (
    <div className="header-app">
      <h1 className="header-app__title">Rick and Morty series wiki</h1>
      <div className="header-image-container">
        <img
          className="header-image"
          src={HeaderImage}
          alt="Rick and Morty header image"
        />
      </div>
    </div>
  );
}

export default HeaderApp;
