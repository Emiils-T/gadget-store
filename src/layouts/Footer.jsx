import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Box>
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            color: "#ffffff",
            height: "90px",
            pl: 8,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography color="inherit" sx={{ pl: 0, fontSize: "1.5rem" }}>
            © All rights reserved
          </Typography>
        </Container>
      </Box>
      {/* <footer className="footer">
        <div className="container">
          <div className="footer-container">
            <h5>© All rights reserved</h5>
          </div>
        </div>
      </footer> */}
    </>
  );
};

export default Footer;
