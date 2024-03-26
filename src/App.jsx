import { useEffect, useState } from 'react';
import './App.css';
import Post from './Posts';
import {db,auth} from "./firebase";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import ImageUpload from './ImageUpload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const[ posts, setPosts]= useState([]);
  const [open, setOpen]= useState(false);
  const [openSignIn, setOpenSignIn] =useState(false);
  const [username, setUsername]= useState('');
  const [password, setPassword]= useState('');
  const [email, setEmail]= useState('');
  const[user, setUser]= useState(null);

  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        //user has logged in..
        setUser(authUser);
      }else{
        //user has logged out
        setUser(null);
      }
    })

    return()=>{
      //perform cleanup actions
      unsubscribe();
    }
  }, [user, username]);

  useEffect(()=>{
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map( doc => ({
        id: doc.id,
        post:doc.data()
      })));
    })
  }, []);

  const signUp=(event)=>{
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser)=> {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error)=> alert(error.message));
    setOpen(false);
  }

  const signIn= (event)=>{
    event.preventDefault();

    auth
     .signInWithEmailAndPassword(email, password)
     .catch((error)=> alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <div className="App">
  
      {user?.displayName? (
      <ImageUpload username={user.displayName}/>
      ):(
        <h3>Sorry You Need to Login</h3>
      )}

    <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
        <Box sx={style}>
          <form className='app_signup'>
          
            <img
            className='popup_image'
            src="https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png"
            alt="img"
            />
            <Input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            />
            <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />
            <Button type="submit"variant="contained" onClick={signUp}> Signup</Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
      >
        <Box sx={style}>
          <form className='app_signup'>
          
            <img
            className='popup_image'
            src="https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png"
            alt="img"
            />
            <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />
            <Button type="submit"variant="contained" onClick={signIn}> Signup</Button>
          </form>
        </Box>
      </Modal>
      <div className='app_header'>
        <img
        className='app_headerImage'
        src ="https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png"
        alt="instagram"
        />
      </div>

      {user? (
        <Button onClick={()=> auth.signOut()}>Logout</Button>
      ):(
        <div className='app_loginContainer'>
        <Button onClick={()=> setOpenSignIn(true)}>sign up</Button>
        <Button onClick={()=> setOpen(true)}>sign up</Button>
        </div>
      )}
      

      {
        posts.map(({id,post})=>(
          <Post key={id} username={post.username} caption={post.caption} imageurl={post.imageurl}/>
        ))
      }
    </div>
  );
}

export default App;
