import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
  Popover,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import Menu from "../../components/ui/Menu";
import { useRef, useState } from "react";
import ProductForm from "../Products/ProductForm";
import Placeholder from "../../assets/images/placeholder.svg";
import { useEffect } from "react";
import { enrichProduct } from "../../utility/ProductImages";

import axios from "axios";
import { useCart } from "../../contexts/CartContext.jsx";
const Main = () => {
  const { id } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = Boolean(anchorEl);

  const [addAnchorEl, setAddAnchorEl] = useState(null);
  const parentRef = useRef(null);
  const addOpen = Boolean(addAnchorEl);
  const handleClickAddModal = () => {
    setAddAnchorEl(parentRef.current);
  };

  const handleCloseAddModal = () => {
    setAddAnchorEl(null);
  };

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);

      const fetchedProduct = enrichProduct(response.data);
      setProduct(fetchedProduct);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);
  //TODO: DRY, this is the same logic as in other component
  const onSave = async (payload) => {
    try {
      if (payload.id) {
        await axios.patch(
          `http://localhost:3000/products/${payload.id}`,
          payload,
        );
        await getProduct();
      } else {
        await axios.post("http://localhost:3000/products", payload);
        await getProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //TODO: same logic as in Products.jsx - better to seperate into its own file and call. DRY
  const handleProductDelete = async (payload) => {
    try {
      await axios.delete(`http://localhost:3000/products/${payload}`, payload);
      await getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
  };
  const handleOpenEdit = () => {
    setIsModalOpen(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const { addToCart, cartItems, removeFromCart } = useCart();
  const cartItem = cartItems.find((item) => item?.id === product?.id);

  if (isLoading) {
    return (
      <>
        <Container maxWidth="xl" disableGutters sx={{ py: 6, px: 8 }}>
          <Box sx={{ mx: "auto", textAlign: "center" }}>
            <Typography variant="h3">Loading...</Typography>
          </Box>
        </Container>
      </>
    );
  }
  if (!product) {
    return (
      <Container maxWidth="xl" disableGutters sx={{ py: 6, px: 8 }}>
        <Box sx={{ mx: "auto", textAlign: "center" }}>
          <Typography variant="h3">Product not found</Typography>
        </Box>
      </Container>
    );
  }
  return (
    <>
      <Container maxWidth="xl" disableGutters sx={{ py: 6, px: 8 }}>
        <Card sx={{ maxWidth: "100%", px: { xs: 0, sm: 4, md: 8 } }}>
          <Popover
            open={addOpen}
            anchorEl={addAnchorEl}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            sx={{ margin: "2rem" }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                width: 350,
                textAlign: "center",
                px: "4rem",
                pt: "2rem",
                pb: "1rem",
              }}
            >
              Product successfully added to the cart!
            </Typography>
            <Stack sx={{ width: "100%", justifyContent: "center", mb: "2rem" }}>
              <Button
                variant="contained"
                sx={{ bgcolor: "primary.main", mx: "auto" }}
                onClick={handleCloseAddModal}
              >
                Close window
              </Button>
            </Stack>
          </Popover>
          <CardContent>
            <Grid
              container
              sx={{
                alignItems: "stretch",
                flexDirection: { xs: "column-reverse", lg: "row" },
              }}
              ref={parentRef}
            >
              <Grid size={{ xs: 12, md: 10, lg: 8, xl: 6 }}>
                <Stack direction={"column"} spacing={2}>
                  <Typography variant="h4" sx={{ color: "primary.main" }}>
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      maxWidth: { xs: 1, md: 0.75 },
                      py: 2,
                    }}
                  >
                    {product.long_description}
                  </Typography>
                  <Stack direction="row" spacing={4}>
                    <Typography
                      variant="h5"
                      sx={{
                        typography: { xs: "h6", md: "h5" },
                        fontWeight: { xs: "bold", md: "bold" },
                      }}
                    >
                      Year: {product.year}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        typography: { xs: "h6", md: "h5" },
                        fontWeight: { xs: "bold", md: "bold" },
                      }}
                    >
                      RAM Memory: {product.RAM}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        typography: { xs: "h6", md: "h5" },
                        fontWeight: { xs: "bold", md: "bold" },
                      }}
                    >
                      Warranty: {product.warranty_period}
                    </Typography>
                  </Stack>
                  <Box component="div">
                    <Typography
                      variant="h5"
                      sx={{
                        typography: { xs: "h6", md: "h5" },
                        fontWeight: { xs: "bold", md: "bold" },
                      }}
                    >
                      Features:
                    </Typography>
                    <List sx={{ listStyleType: "disc", pl: 6 }}>
                      {product.features.map((feature, index) => {
                        return (
                          <ListItem
                            key={index}
                            sx={{
                              display: "list-item",
                              px: 0,
                              py: 0.5,
                              color: "text.secondary",
                            }}
                          >
                            {feature}
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", pt: 2 }}>
                    Price: {product.price}€
                  </Typography>
                  <Stack
                    direction={{ xs: "column-reverse", sm: "row" }}
                    spacing={6}
                    sx={{
                      py: 3,
                      width: "100%",
                    }}
                  >
                    <>
                      <Menu
                        open={open}
                        anchorEl={anchorEl}
                        handleClick={handleClick}
                        handleClose={handleClose}
                        onEdit={() => handleOpenEdit()}
                        onDelete={() => handleProductDelete(id)}
                        buttonProps={{
                          sx: {
                            fontSize: { xs: "1rem", md: "1.2rem" },
                            flex: { xs: 1, md: "unset" },
                          },
                        }}
                      />
                      {cartItem ? (
                        <Stack
                          direction={"row"}
                          spacing={3}
                          sx={{
                            flex: { xs: 1, md: "unset" },
                            justifyContent: { xs: "center" },
                          }}
                        >
                          <Button
                            variant="outlined"
                            sx={{
                              minWidth: 0,
                              p: "4px",
                              width: "fit-content",
                              height: "fit-content",
                            }}
                          >
                            {cartItem.amount === 1 ? (
                              <DeleteOutlinedIcon
                                fontSize="large"
                                sx={{ px: "0" }}
                                onClick={() => removeFromCart(product)}
                              />
                            ) : (
                              <RemoveIcon
                                fontSize="large"
                                sx={{ px: "0" }}
                                onClick={() => {
                                  removeFromCart(product);
                                }}
                              />
                            )}
                          </Button>
                          <Typography sx={{ fontSize: "2rem" }}>
                            {cartItem?.amount ?? 0}
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{
                              minWidth: 0,
                              p: "4px",
                              width: "fit-content",
                              height: "fit-content",
                            }}
                          >
                            <AddIcon
                              fontSize="large"
                              sx={{ px: "0" }}
                              onClick={() => {
                                addToCart(product);
                              }}
                            />
                          </Button>
                        </Stack>
                      ) : (
                        <Button
                          variant="contained"
                          sx={{
                            fontSize: { xs: "1rem", md: "1.2rem" },
                            flex: { xs: 1, md: "unset" },
                          }}
                          onClick={() => {
                            addToCart(product);
                            handleClickAddModal();
                          }}
                        >
                          Add to cart
                        </Button>
                      )}
                    </>
                  </Stack>
                </Stack>
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  md: "grow",
                }}
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Stack id="some-id">
                  <CardMedia
                    component="img"
                    image={product.image || Placeholder}
                    sx={{
                      width: "100%",
                      maxWidth: "550px",
                      objectFit: "contain",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      <ProductForm
        open={isModalOpen}
        onClose={handleFormClose}
        initialData={product}
        onSave={onSave}
      />
    </>
  );
};

export default Main;
