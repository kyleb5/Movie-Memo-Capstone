import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Row } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getPlaylists } from '../utils/data/playlistData';
import PlaylistCard from '../components/PlaylistCard';

export default function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const { user } = useAuth();

  const getAllThePlaylists = () => {
    getPlaylists(user.uid).then(setPlaylists);
  };

  useEffect(() => {
    getAllThePlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/playlist/new" passHref>
        <Button>Create a Playlist</Button>
      </Link>
      <div className="d-flex flex-wrap container">
        <Row>
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.firebaseKey} playlistObj={playlist} onUpdate={getAllThePlaylists} />
          ))}
        </Row>
      </div>
    </div>
  );
}
