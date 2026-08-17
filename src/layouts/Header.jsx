import ComputerIcon from "@mui/icons-material/Computer";
const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-container">
          <div className="logo-title">
            <ComputerIcon />
            <h1>Gadget Store</h1>
          </div>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Products</a>
            <a href="#">Contact us</a>
            <a href="#">Cart(0)</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
