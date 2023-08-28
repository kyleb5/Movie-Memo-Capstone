import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePlaylist } from '../utils/data/playlistData';

function PlaylistCard({ playlistObj, onUpdate }) {
  const deleteThisPlaylist = () => {
    if (window.confirm(`Delete ${playlistObj.title}?`)) {
      deletePlaylist(playlistObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{playlistObj.title}</Card.Title>
        <Card.Text>{playlistObj.description}</Card.Text>
        {/* DYNAMIC LINK TO VIEW THE PLAYLIST DETAILS  */}
        <Link href={`/playlist/${playlistObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE PLAYLIST DETAILS  */}
        <Link href={`/playlist/edit/${playlistObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPlaylist} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PlaylistCard.propTypes = {
  playlistObj: PropTypes.shape({
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlaylistCard;
