import { Card as MuiCard, CardContent, Typography } from "@mui/material";

const Card = ({ Icon, title, description }) => {
  return (
    <MuiCard
      sx={{
        bgcolor: "secondary.main",
        height: "100%",
        marginBottom: 3,
        maxWidth: 350,
        mx: "auto",
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Icon sx={{ fontSize: "3.5rem", mb: 2, mt: 4 }} />
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mx: 4, fontSize: "1.3rem" }}>
          {description}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
