import React, { useState, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { SessionContext } from "../UserContext";
import Axios from "axios";

export default function LikeButton(props) {
  const [isLiked, setLiked] = useState(false);
  const { session } = useContext(SessionContext);

  function likePost() {
    // CHANGES THIS LATER, CURRENTLY IT ONLY LIKES THE BUTTON
    if (!isLiked) {
      setLiked(!isLiked);

      console.log("Liking Post " + props.id);

      let data = {
        postID: props.id,
        userID: session.id,
        action: true,
      };

      console.log(data);

      Axios.post("http://localhost:5000/addLike", data).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  return (
    <IconButton aria-label="Like">
      <FavoriteIcon
        onClick={likePost}
        color={isLiked ? "secondary" : "inherit"}
      />
    </IconButton>
  );
}
