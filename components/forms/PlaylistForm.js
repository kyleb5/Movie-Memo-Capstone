import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createPlaylist, updatePlaylist } from '../../utils/data/playlistData';

const initialState = {
  description: '',
  playlist_name: '',
};

function PlaylistForm({ obj }) {
  //  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  /* const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevSate) => ({
      ...prevSate,
      [name]: value,
    }));
  }; */

  const handleSumbit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlaylist(formInput).then(() => router.push(`/playlist/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlaylist(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlaylist(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSumbit={handleSumbit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Playlist</h2>
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
