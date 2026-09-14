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
import { useCart } from "../../App";
const Main = () => {
  const { id } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = Boolean(anchorEl);
  console.log("open ", open);

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
  useEffect(() => {
    const getProduct = async () => {
      try {
        console.log(id);
        const response = await axios.get(
          `http://localhost:3000/products/${id}`,
        );
        const fetchedProduct = enrichProduct(response.data);
        setProduct(fetchedProduct);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);
  //TODO: make this into its own function
  const onSave = async (payload, getProduct) => {
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

  const { addToCart, getSingularCount, removeFromCart } = useCart();

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
        <Card sx={{ maxWidth: "100%", pl: 8, pr: 8 }}>
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
                    sx={{ color: "text.secondary", maxWidth: 0.75, py: 2 }}
                  >
                    {product.long_description}
                  </Typography>
                  <Stack direction="row" spacing={4}>
                    <Typography variant="h5" sx={{ fontWeight: "Bold" }}>
                      Year: {product.year}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "Bold" }}>
                      RAM Memory: {product.RAM}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "Bold" }}>
                      Warranty: {product.warranty_period}
                    </Typography>
                  </Stack>
                  <Box component="div">
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
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
                    direction="row"
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
                        buttonProps={{
                          sx: {
                            fontSize: "1.2rem",
                            flex: { xs: 1, md: "unset" },
                          },
                        }}
                      />
                      {getSingularCount(id) == 0 ? (
                        <Button
                          variant="contained"
                          sx={{
                            fontSize: "1.2rem",
                            flex: { xs: 1, md: "unset" },
                          }}
                          onClick={() => {
                            addToCart(product);
                            handleClickAddModal();
                          }}
                        >
                          Add to cart
                        </Button>
                      ) : (
                        <Stack direction={"row"} spacing={3}>
                          <Button variant="outlined">
                            {getSingularCount(id) == 1 ? (
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
                            {getSingularCount(id)}
                          </Typography>
                          <Button variant="contained">
                            <AddIcon
                              fontSize="large"
                              sx={{ px: "0" }}
                              onClick={() => {
                                addToCart(product);
                              }}
                            />
                          </Button>
                        </Stack>
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
