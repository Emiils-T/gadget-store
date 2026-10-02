import { Card as MuiCard, CardContent, Typography } from "@mui/material";

const Card = ({ Icon, title, description }) => {
  return (
    <MuiCard
      sx={{
        bgcolor: "secondary.main",
        maxWidth: 311,
        width: "100%",
        minHeight: 269,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Icon sx={{ fontSize: "3.5rem", mb: 2, mt: 3 }} />
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mx: "auto", fontSize: "1.1rem", maxWidth: "200px" }}
        >
          {description}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
