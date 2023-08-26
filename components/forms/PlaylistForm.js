import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createPlaylist, updatePlaylist } from '../../utils/data/playlistData';

const initialState = {
  description: '',
  title: '',
  category: '',
};

function PlaylistForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlaylist(formInput).then(() => router.push(`/playlist/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlaylist(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlaylist(patchPayload).then(() => {
          router.push(`/playlist/${name}`);
        });
      });
    }
  };

  const categoryOptions = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Musical', 'Mystery', 'Romance', 'Science Fiction', 'Sports', 'Thriller', 'War'];

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5 container">{obj.firebaseKey ? 'Update' : 'Create'} Playlist</h2>

      <FloatingLabel controlId="floatingInput1" label="Enter Playlist Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter a title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Enter Playlist Description" className="mb-3">
        <Form.Control type="text" placeholder="Enter a description" name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Category">
        <Form.Select aria-label="Category" name="category" value={formInput.category} onChange={handleChange} className="mb-3" required>
          <option value="">Select a Category</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Playlist</Button>
    </Form>
  );
}

PlaylistForm.propTypes = {
  obj: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PlaylistForm.defaultProps = {
  obj: initialState,
};

export default PlaylistForm;
