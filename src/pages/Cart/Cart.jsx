import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { useCart } from "../../contexts/CartContext";
import { Link as RouterLink } from "react-router-dom";

const Cart = () => {
  const { addToCart, cartItems, removeFromCart } = useCart();
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.amount * item.price,
    0,
  );

  const isCart = Boolean(cartItems.length);
  return (
    <Container maxWidth="xl" disableGutters sx={{ pb: 6, pt: 9, px: 6 }}>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          px: "10px",
          color: "primary.main",
          mx: 1,
          mb: 9,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            typography: {
              xs: "h5",
              md: "h4",
            },
            fontWeight: { xs: "bold", md: "bold" },
          }}
        >
          Shopping Cart
        </Typography>
        {isCart && (
          <Typography
            variant="h4"
            sx={{
              typography: { xs: "h6", md: "h5" },
              fontWeight: { xs: "bold", md: "bold" },
            }}
          >
            Total: {Number(cartTotal).toFixed(2)}€
          </Typography>
        )}
      </Stack>
      {!isCart && (
        <Card sx={{ width: "100%", maxWidth: "xl", px: 0, mx: 0 }}>
          <CardContent sx={{ textAlign: "center", color: "primary.main" }}>
            <Typography variant="h4" sx={{ fontWeight: "600" }}>
              Your shopping cart is empty
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "600" }}>
              Go to{" "}
              {
                <Link
                  to="/products"
                  component={RouterLink}
                  underline="always"
                  sx={{ color: "primary.main" }}
                >
                  Products Page
                </Link>
              }
            </Typography>
          </CardContent>
        </Card>
      )}

      {isCart &&
        cartItems.map((product) => {
          return (
            <Card
              key={product.id}
              sx={{
                px: { xs: 0, sm: 4, md: 8 },
                mb: 8,
                maxWidth: "xl",
                mx: "auto",
              }}
            >
              <Stack direction={{ xs: "column", md: "row" }}>
                <Link component={RouterLink} to={`/product/${product.id}`}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    sx={{
                      width: { xs: "100%", md: 250 },
                      maxWidth: "250px",
                      mx: "auto",
                      objectFit: "contain",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </Link>
                <CardContent
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    sx={{
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Stack direction={"column"} spacing={1}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "500",
                          color: "primary.main",
                          mt: 3,
                          mb: 3,
                        }}
                      >
                        <Link
                          component={RouterLink}
                          to={`/product/${product.id}`}
                          underline="none"
                        >
                          {product.title}
                        </Link>
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                        Year: {product.year}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                        RAM Memory: {product.RAM}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                        Warranty: {product.warranty_period}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                        Price: {Number(product.price).toFixed(2)}
                      </Typography>
                    </Stack>
                    <CardActions>
                      <Stack
                        direction={"row"}
                        spacing={3}
                        sx={{ alignItems: "center" }}
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            minWidth: 0,
                            p: "4px",
                            width: "fit-content",
                            height: "fit-content",
                          }}
                          size="medium"
                          onClick={() => {
                            removeFromCart(product);
                          }}
                        >
                          {product.amount === 1 ? (
                            <DeleteOutlinedIcon
                              fontSize="medium"
                              sx={{ p: "0" }}
                            />
                          ) : (
                            <RemoveIcon fontSize="medium" sx={{ px: "0" }} />
                          )}
                        </Button>
                        <Typography
                          sx={{ fontSize: "2rem", fontWeight: "bold" }}
                        >
                          {product.amount}
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            minWidth: 0,
                            p: "4px",
                            width: "fit-content",
                            height: "fit-content",
                          }}
                          onClick={() => {
                            addToCart(product);
                          }}
                        >
                          <AddIcon fontSize="medium" sx={{ px: "0" }} />
                        </Button>
                      </Stack>
                    </CardActions>
                    <Box component={"div"}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, fontSize: "1.2rem" }}
                      >
                        Total:{" "}
                        {Number(product.amount * product.price).toFixed(2)}€
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Stack>
            </Card>
          );
        })}
    </Container>
  );
};

export default Cart;
