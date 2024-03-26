import React from 'react';
import './index.css';
import Avatar from '@mui/material/Avatar';

 function Post(props){
    return(
        <div className='post'>
            <div className='post_header'>
            <Avatar 
            className="post_avatar"
            alt={props.username}
            src="/static/images/avatar/1.jpg" />
            <h3>{props.username}</h3>
            </div>
            {/* header -> avatar + username*/}

            <img className="post_img"src={props.imageurl}
            alt='post_img'
            />
            {/*image*/}

            <h4 className='post_text'><strong>{props.username}</strong> {props.caption}</h4>
            {/*username+ caption*/}
        </div>
    )
 }
 export default Post;