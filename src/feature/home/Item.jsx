import { Card, Typography } from "@mui/material";
import { PlayerWrapper } from "./styled";

const Item = ({ link, title, description }) => {
  return (
    <Card sx={{ p: 3 }}>
      <PlayerWrapper>
        <iframe
          src={link}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </PlayerWrapper>

      <Typography variant="h6" mb={2}>
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </Card>
  );
};

export default Item;
