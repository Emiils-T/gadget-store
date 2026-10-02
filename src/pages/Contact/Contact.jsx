import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Card from "../../components/ui/Card";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const Contact = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const lat = 81.60293576891738;
  const lon = -16.660172515999903;
  return (
    <APIProvider apiKey={apiKey}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{ pt: { xs: 6, md: 12 }, pb: { xs: 6, md: 12 }, px: 8 }}
      >
        <Grid container spacing={6}>
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                typography: { xs: "h4", md: "h3" },
                fontWeight: { xs: "500", md: "500" },
                mb: { xs: 4, md: 8 },
              }}
            >
              Contact us by Phone, Email, or Visit us in our Office!
            </Typography>
            <Box>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Our address: Station Nord 23456, Greenland
              </Typography>
              <Map
                style={{ width: "100%", height: "320px" }}
                defaultCenter={{
                  lat: lat,
                  lng: lon,
                }}
                defaultZoom={7}
              >
                <Marker position={{ lat: lat, lng: lon }} />
              </Map>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              spacing={6}
              direction={{ xs: "column", sm: "row", md: "column" }}
              sx={{
                alignItems: "center",
                justifyContent: { md: "space-between", xs: "space-around" },
                height: "100%",
              }}
            >
              <Card
                Icon={HeadphonesIcon}
                title={"Phone number"}
                description={"0123456789"}
              />
              <Card
                Icon={AlternateEmailIcon}
                title={"E-mail"}
                description={"gadget@store.com"}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </APIProvider>
  );
};

export default Contact;
