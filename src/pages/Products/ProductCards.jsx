import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import PlaceHolder from "../../assets/images/placeholder.svg";
import Menu from "../../components/ui/Menu";

const ProductCards = ({ product, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardContent sx={{ height: "100%" }}>
        <Typography
          variant="h6"
          color="primary"
          sx={{
            fontWeight: "700",
          }}
        >
          {product.title}
        </Typography>
        <Typography variant="body2">Price: {product.price}€</Typography>
        <Stack
          sx={{
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            image={product.image || PlaceHolder}
            sx={{
              width: "150px",
            }}
          />
        </Stack>
        <Typography variant="body2" sx={{ mb: 1, opacity: "70%" }}>
          {product.short_description}
        </Typography>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Stack
            direction={"row"}
            sx={{ justifyContent: "center", alignItems: "center" }}
            spacing={4}
          >
            <Link to={`/product/${product.id}`}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ fontSize: "0.75rem" }}
              >
                Details
              </Button>
            </Link>
            <Menu
              handleClick={handleClick}
              handleClose={handleClose}
              open={open}
              anchorEl={anchorEl}
              onEdit={() => onEdit(product)}
              onDelete={() => onDelete(product.id)}
              buttonProps={{ sx: { fontSize: "0.75rem" } }}
            />
          </Stack>
        </CardActions>
      </CardContent>
    </Card>
  );
};
export default ProductCards;
