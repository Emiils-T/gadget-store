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
      <Container disableGutters maxWidth="xl" sx={{ py: 6, px: 8 }}>
        <Grid container spacing={6}>
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{ justifyContent: "space-between", flexDirection: "column" }}
          >
            <Typography
              variant="h3"
              sx={{
                typography: { xs: "h4", md: "h3" },
                fontWeight: { xs: "500", md: "500" },
                mb: { xs: 4 },
              }}
            >
              Contact us by Phone, Email, or Visit us in our Office!
            </Typography>
            <Box sx={{}}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Our address: Station Nord 23456, Greenland
              </Typography>
              <Map
                style={{ width: "100%", height: "350px" }}
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
              direction={{ xs: "row", md: "column" }}
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
