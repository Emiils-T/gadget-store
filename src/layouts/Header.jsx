import ComputerIcon from "@mui/icons-material/Computer";
import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  Typography,
  Link,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../App";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const { cartItems } = useCart();
  return (
    <>
      <Box>
        <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
          <Container maxWidth={false} disableGutters sx={{ pl: 8 }}>
            <Toolbar
              disableGutters
              sx={{
                justifyContent: "space-between",
                minHeight: { xs: "70px", sm: "90px" },
                pl: 0,
                pr: 3,
              }}
            >
              <Stack
                direction={"row"}
                spacing={2}
                sx={{ alignItems: "center", pl: "0px !important" }}
              >
                <ComputerIcon sx={{ fontSize: "2rem" }} />

                <Typography
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    fontSize: "2rem",
                  }}
                >
                  Gadget Store
                </Typography>
              </Stack>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                  justifyContent: "end",
                }}
              >
                <IconButton onClick={handleOpenNavMenu}>
                  <MenuIcon sx={{ color: "#ffffff" }} fontSize="large" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiMenu-paper": {
                      backgroundColor: "primary.main",
                    },
                  }}
                >
                  <MenuItem>
                    <Link
                      color="inherit"
                      to="/"
                      component={RouterLink}
                      underline="none"
                      sx={{
                        letterSpacing: "1px",
                        color: "#ffffff",
                      }}
                      onClick={handleCloseNavMenu}
                    >
                      Home
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      color="inherit"
                      to="/products"
                      component={RouterLink}
                      underline="none"
                      sx={{
                        letterSpacing: "1px",
                        color: "#ffffff",
                      }}
                    >
                      Products
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      color="inherit"
                      to="/#"
                      component={RouterLink}
                      underline="none"
                      sx={{
                        letterSpacing: "1px",
                        color: "#ffffff",
                      }}
                    >
                      Contact us
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      color="inherit"
                      to="/#"
                      component={RouterLink}
                      underline="none"
                      sx={{
                        letterSpacing: "1px",
                        color: "#ffffff",
                      }}
                    >
                      Cart ({cartItems.length})
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
              <Stack
                direction={"row"}
                spacing={4}
                color="#ffffff"
                sx={{
                  textDecoration: "none",
                  fontSize: "1.5rem",
                  fontWeight: "400",
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Link
                  color="inherit"
                  to="/"
                  component={RouterLink}
                  underline="none"
                  sx={{ letterSpacing: "1px" }}
                >
                  Home
                </Link>
                <Link
                  color="inherit"
                  to="/products"
                  component={RouterLink}
                  underline="none"
                >
                  Products
                </Link>
                <Link
                  color="inherit"
                  to="#"
                  component={RouterLink}
                  underline="none"
                >
                  Contact Us
                </Link>
                <Link
                  color="inherit"
                  to="#"
                  component={RouterLink}
                  underline="none"
                >
                  Cart({cartItems.length})
                </Link>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
