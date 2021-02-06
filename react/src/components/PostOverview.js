import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea'
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { cardTitle } from '../assets/jss/material-kit-react';
import CommentIcon from '@material-ui/icons/Comment';
import Link from '@material-ui/core/Link';
import PostEntry from './PostEntry.js';
import posts from "./PostDict"



export default function RecipeReviewCard() {

  return (
    <div>
    {posts.map((post)=>(
      <PostEntry
key={post.id}
content={post.text.substring(0,250)+"......"}
title={post.title}
name={post.name}
/>
    )
    )}
    </div>
  );
}

