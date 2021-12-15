import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Motivational() {
  const [quote, setQuote] = useState({a: 'A paranoid developer', q: 'Something in case the API fails'});

  useEffect(() => {
    axios.get('/api/quote')
      .then(res => setQuote(res.data[0]))
      .catch(err => console.log(err))
  }, [])

  return (
    <Card sx={{ backgroundColor: "#FBFAF9"}}>
      <CardContent>
        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
          Quote of the Day
        </Typography>
        <Typography variant="h6" component="div">
          {quote.q}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {quote.a}
        </Typography>
      </CardContent>
    </Card>
  );
}
