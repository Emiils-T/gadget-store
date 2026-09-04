import ProductCards from "./ProductCards";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";

import earbuds from "../../assets/images/product_images/earbuds.png";
import laptop from "../../assets/images/product_images/laptop.png";
import portableSpeaker from "../../assets/images/product_images/portable_speaker.png";
import smartphone from "../../assets/images/product_images/smartphone.png";
import smartwatch from "../../assets/images/product_images/smartwatch.png";
import tablet from "../../assets/images/product_images/tablet.png";
import webcam from "../../assets/images/product_images/webcam.png";
import smartAssistant from "../../assets/images/product_images/smart_assistant.png";
import { Box, Button, Container, Dialog, Grid, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const productImages = {
  earbuds: earbuds,
  laptop: laptop,
  "portable speaker": portableSpeaker,
  smartphone: smartphone,
  smartwatch: smartwatch,
  tablet: tablet,
  "web camera": webcam,
  "smart assistant": smartAssistant,
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      const data = response.data.map((item) => {
        return { ...item, image: productImages[item.title.toLowerCase()] };
      });
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
    console.log("renders");
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const handleOpenAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };
  const onSave = async (payload) => {
    try {
      if (payload.id) {
        await axios.patch(
          `http://localhost:3000/products/${payload.id}`,
          payload,
        );
        await getProducts();
      } else {
        await axios.post("http://localhost:3000/products", payload);
        await getProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleProductDelete = async (payload) => {
    try {
      await axios.delete(`http://localhost:3000/products/${payload}`, payload);
      await getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const containerRef = useRef(null);
  return (
    <>
      <Box ref={containerRef}>
        <Container maxWidth="xl" disableGutters sx={{ py: 6, px: 8 }}>
          <Stack
            direction={"row"}
            sx={{ justifyContent: { xs: "center", sm: "end" } }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                handleOpenAdd();
                console.log(selectedProduct);
              }}
              onClose={handleClose}
              sx={{ fontSize: "1.4rem" }}
            >
              Add new product
            </Button>
          </Stack>
        </Container>
      </Box>

      <Box>
        <Container maxWidth="xl" disableGutters sx={{ px: 9, mb: 8 }}>
          <Grid
            container
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            {products.map((product, index) => {
              return (
                <Grid
                  size={{
                    xs: 12,
                    sm: 8,
                    md: 6,
                    lg: 4,
                    xl: 3,
                  }}
                  sx={{ mb: 4 }}
                  key={index}
                >
                  <ProductCards
                    product={product}
                    onEdit={handleOpenEdit}
                    onClose={handleClose}
                    onDelete={handleProductDelete}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
        <ProductForm
          open={isModalOpen}
          onClose={handleClose}
          initialData={selectedProduct}
          onSave={onSave}
        />
      </Box>
    </>
  );
};

export default Products;
