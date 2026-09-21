import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import heroImg from "../../assets/images/hero-image.png";

import WifiIcon from "@mui/icons-material/Wifi";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

import Card from "../../components/ui/Card";
import { Link } from "react-router-dom";

const features = [
  {
    icon: WifiIcon,
    title: "Wireless Freedom",
    description:
      "wireless gadgets that provide freedom of movement while using them",
  },
  {
    icon: DevicesOtherIcon,
    title: "Stay Connected",
    description:
      "gadgets that help people stay connected with their loved ones and colleagues",
  },
  {
    icon: LightbulbOutlinedIcon,
    title: "Smart home",
    description:
      "gadgets that make your home smarter and more efficient at the space of your own home",
  },
];

const Main = () => {
  return (
    <>
      <Box sx={{ bgcolor: "secondary.main" }}>
        <Container
          maxWidth="xl"
          sx={{ px: 8, pt: { xs: 6, md: 0 } }}
          disableGutters
        >
          <Grid
            container
            direction={"row"}
            spacing={4}
            sx={{ alignItems: "center" }}
          >
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
                  textAlign: { xs: "center", md: "start" },
                }}
                gutterBottom
              >
                Experience the Future of Technology Today!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  maxWidth: { lg: "70%", md: "80%", xs: "70%" },
                  textAlign: { xs: "center", md: "start" },
                  mx: { xs: "auto", md: 0 },
                }}
              >
                Unleash your inner tech enthusiast with our wide range of
                gadgets. Become a pro expert within a moment.
              </Typography>
              <Stack
                direction={"row"}
                spacing={2}
                sx={{ justifyContent: { xs: "center", md: "start" } }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ fontSize: "large" }}
                >
                  Contact Us
                </Button>
                <Link to="/products">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: "large", mx: "auto" }}
                  >
                    Shop Now
                  </Button>
                </Link>
              </Stack>
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
              sx={{ textAlign: "center" }}
            >
              <Box
                component="img"
                src={heroImg}
                alt="hero-image"
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" disableGutters sx={{ px: 8, py: 6 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "500", textAlign: "center", mb: 6 }}
        >
          Why Choose us?
        </Typography>

        <Grid container spacing={10} sx={{ justifyContent: "center" }}>
          {features.map((item, index) => {
            return (
              <Grid
                size={{
                  sm: 12,
                  md: 6,
                  lg: 4,
                }}
                key={index}
              >
                <Card
                  Icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Main;
