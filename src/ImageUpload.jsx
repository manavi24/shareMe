import { useState } from 'react';
import { storage, db } from './firebase';
import { Button } from '@mui/material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const imageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.error(error);
        alert(error.message);
      },
      () => {
        getDownloadURL(imageRef)
          .then((url) => {
            db.collection('posts').add({
              timestamp: serverTimestamp(),
              caption: caption,
              imageUrl: url,
            });

            setProgress(0);
            setCaption('');
            setImage(null);
          })
          .catch((error) => {
            console.error(error);
            alert(error.message);
          });
      }
    );
  };

  return (
    <div>
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption"
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
