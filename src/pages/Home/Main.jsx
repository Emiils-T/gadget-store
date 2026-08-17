import { Button } from "@mui/material";
import heroImg from "../../assets/images/hero-image.png";
import WifiIcon from "@mui/icons-material/Wifi";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "../../components/ui/Card";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3F51B5",
    },
  },
});

const Main = () => {
  return (
    <main>
      <section className="hero-container">
        <div className="container hero-flex">
          <div className="hero-content">
            <h2>Experience the Future of Technology Today!</h2>
            <p>
              Unleash your inner tech enthusiast with our wide range of gadgets.
              Become a pro expert within a moment.
            </p>
            <div className="button-container">
              <ThemeProvider theme={theme}>
                <Button variant="outlined" color="primary">
                  Contact Us
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary">
                  Shop Now
                </Button>
              </ThemeProvider>
            </div>
          </div>

          <div className="hero-image">
            <img src={heroImg} alt="" />
          </div>
        </div>
      </section>
      <section className="choose-us">
        <div className="container">
          <div className="feature-title">
            <h2>Why Choose us?</h2>
          </div>
          <div className="features">
            <Card
              Icon={WifiIcon}
              title={"Wireless Freedom"}
              description={
                "wireless gadgets that provide freedom of movement while using them"
              }
            />
            <Card
              Icon={DevicesOtherIcon}
              title={"Stay Connected"}
              description={
                "gadgets that help people stay connected with their loved ones and colleagues"
              }
            />
            <Card
              Icon={LightbulbOutlinedIcon}
              title={"Smart Home"}
              description={
                "gadgets that make your home smarter and more efficient at the space of your own home"
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
