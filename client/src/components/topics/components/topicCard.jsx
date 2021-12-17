import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function TopicCard({pic, topic, name}) {

  return (
    <Card sx={{ maxWidth: 300, backgroundColor: "#ffbe0b", color:'white', fontWeight: '900'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={pic}
          alt={topic}
          name={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {topic}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}