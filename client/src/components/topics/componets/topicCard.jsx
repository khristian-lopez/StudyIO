import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function TopicCard(props) {
  const {pic, topic, clickHandler} = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={clickHandler}>
        <CardMedia
          component="img"
          height="140"
          image={pic}
          alt={topic}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {topic}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Potentially a small description, maybe as a tooltip
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}