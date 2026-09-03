import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FilledInput,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { FormContext } from "./Context";
import { inputBaseClasses } from "@mui/material/InputBase";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { NumericFormat } from "react-number-format";

import { Box } from "@mui/material";

const ProductForm = ({ onClose, open, initialData = null, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    short_description: "",
    long_description: "",
    price: "",
    year: "",
    RAM: "",
    warranty_period: "",
    image: "",
    features: [],
  });

  const [feature, setFeature] = useState("");
  const [error, setError] = useState({});
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    } else {
      setFormData({
        id: "",
        title: "",
        short_description: "",
        long_description: "",
        price: "",
        year: "",
        RAM: "",
        warranty_period: "",
        image: "",
        features: [],
      });
    }
    console.log("renders");
  }, [initialData, open]);
  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //feature functions
  const newFeatureChange = (e) => {
    setFeature(e.target.value);
  };
  const handleFeatureChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    const updated = [...formData.features];
    updated[id] = value;
    setFormData({ ...formData, features: updated });
  };
  const handleAddFeature = (e) => {
    if (feature != "") {
      let updated = [...formData.features];
      updated.push(feature);
      setFormData({ ...formData, features: updated });
      setFeature("");
    }
  };
  const handleFeatureDelete = (index) => {
    let updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData({ ...formData, features: updatedFeatures });
  };

  //form submit functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedFeatures = formData.features
      .map((f) => f.trim())
      .filter((f) => f != "");

    const payload = {
      ...formData,
      features: cleanedFeatures,
    };
    if (!validate()) {
      return;
    }
    await onSave(payload);
    onClose();
  };
  const validate = () => {
    const tempErrors = {};
    if (!formData.title.trim()) {
      tempErrors.title = "Title is required";
    }
    if (!formData.short_description.trim()) {
      tempErrors.short_description = "Short description is required";
    }
    if (!formData.price || Number(formData.price) <= 0) {
      tempErrors.price = "Price must be greater than 0";
    }
    if (!formData.warranty_period) {
      tempErrors.warranty_period = "Warranty period is required";
    }
    const validationCleanedFeatures = formData.features
      .map((f) => f.trim())
      .filter((f) => f !== "");
    if (validationCleanedFeatures.length === 0) {
      tempErrors.features = "At least one feature is required";
    }
    setError(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const isEdit = Boolean(initialData);
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <DialogContent
            dividers
            sx={{ maxHeight: "70vh", borderBottom: "none" }}
          >
            <Stack spacing={2} sx={{ py: 4 }}>
              <TextField
                label="Title"
                value={formData.title}
                type="text"
                onChange={handleChange}
                variant="filled"
                fullWidth
                name="title"
                error={!!error.title}
                helperText={error.title}
              />

              <TextField
                label="Short description"
                type="text"
                value={formData.short_description}
                onChange={handleChange}
                variant="filled"
                fullWidth
                name="short_description"
                error={!!error.short_description}
                helperText={error.short_description}
              />
              <TextField
                label="Long description"
                type="text"
                value={formData.long_description}
                onChange={handleChange}
                variant="filled"
                fullWidth
              />

              <NumericFormat
                value={formData.price}
                onChange={handleChange}
                customInput={TextField}
                thousandSeparator
                valueIsNumericString
                suffix="€"
                variant="filled"
                label="Price"
                name="price"
                error={!!error.price}
                helperText={error.price}
              />

              <TextField
                label="Year"
                type="year"
                value={formData.year}
                onChange={handleChange}
                variant="filled"
                fullWidth
                name="year"
              />
              <TextField
                label="Ram"
                type="text"
                value={formData.RAM}
                onChange={handleChange}
                variant="filled"
                fullWidth
                name="RAM"
              />
              <TextField
                label="Warranty"
                type="text"
                value={formData.warranty_period}
                onChange={handleChange}
                variant="filled"
                fullWidth
                name="warranty_period"
                error={!!error.warranty_period}
                helperText={error.warranty_period}
              />
              <TextField
                label="Image URL"
                name="image"
                variant="filled"
                value={formData.image}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Add Feature"
                type="text"
                variant="filled"
                fullWidth
                name="add-feature"
                value={feature}
                onChange={newFeatureChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <AddIcon
                          onClick={handleAddFeature}
                          sx={{ cursor: "pointer" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!error.features}
                helperText={error.features}
              />
              {formData.features.map((feature, index) => {
                if (feature != "") {
                  return (
                    <>
                      <TextField
                        label={`Feature ${index + 1}`}
                        id={index}
                        type="text"
                        variant="filled"
                        fullWidth
                        name={`feature${index}`}
                        value={feature}
                        onChange={handleFeatureChange}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <DeleteIcon
                                  onClick={() => handleFeatureDelete(index)}
                                  sx={{ cursor: "pointer" }}
                                />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </>
                  );
                }
              })}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", my: 2 }}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {isEdit ? "Edit" : "Add product"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
export default ProductForm;
