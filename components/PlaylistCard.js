import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { BsPencilSquare, BsTrash, BsFillEyeFill } from 'react-icons/bs';
import { deletePlaylist } from '../utils/data/playlistData';

function PlaylistCard({ playlistObj, onUpdate }) {
  const deleteThisPlaylist = () => {
    if (window.confirm(`Delete ${playlistObj.title}?`)) {
      deletePlaylist(playlistObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px', backgroundColor: 'darkgrey' }}>
      <Card.Body>
        <Card.Title>{playlistObj.title}</Card.Title>
        <Card.Text>{playlistObj.category}</Card.Text>
        <Link href={`/playlist/${playlistObj.firebaseKey}`} passHref>
          <Button className="m-2">
            <BsFillEyeFill />
          </Button>
        </Link>
        <Link href={`/playlist/edit/${playlistObj.firebaseKey}`} passHref>
          <Button variant="info">
            <BsPencilSquare />
          </Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPlaylist} className="m-2">
          <BsTrash />
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
    category: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlaylistCard;
