import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: {
   alignSelf:'stretch'
  },
  media: {
    height: 340,
  },
  content:{
    padding:"2% 5%"
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
   
        <CardMedia
          className={classes.media}
          image="https://picsum.photos/700/700"
          title="Contemplative Reptile"
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h3" component="h2">
            Lizard
          </Typography>


          <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        titleTypographyProps={{variant:'subtitle2' }}
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        className={classes.author}
      />
          <Typography variant="body1" color="textPrimary" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis leo vel fringilla est ullamcorper. In ornare quam viverra orci sagittis eu volutpat. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Tellus rutrum tellus pellentesque eu tincidunt. Ut etiam sit amet nisl purus. Eget nullam non nisi est sit amet facilisis magna. Dolor sit amet consectetur adipiscing elit. Dignissim cras tincidunt lobortis feugiat vivamus at. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in. Morbi quis commodo odio aenean sed adipiscing diam donec adipiscing. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Donec enim diam vulputate ut pharetra. Velit sed ullamcorper morbi tincidunt ornare massa eget.

Ipsum dolor sit amet consectetur adipiscing elit duis. Massa massa ultricies mi quis hendrerit dolor magna eget est. Ut consequat semper viverra nam libero justo laoreet. Neque vitae tempus quam pellentesque nec nam aliquam sem. Egestas pretium aenean pharetra magna ac placerat. Elit duis tristique sollicitudin nibh. Sed elementum tempus egestas sed sed risus. Neque aliquam vestibulum morbi blandit cursus. Sed faucibus turpis in eu mi bibendum neque egestas congue. Mi ipsum faucibus vitae aliquet. Morbi leo urna molestie at elementum eu facilisis. Malesuada nunc vel risus commodo viverra. Cras sed felis eget velit aliquet sagittis id consectetur purus.
          </Typography>
        </CardContent>
   
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}