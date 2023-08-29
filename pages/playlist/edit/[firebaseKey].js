import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PlaylistForm from '../../../components/forms/PlaylistForm';
import { getSinglePlaylist } from '../../../utils/data/playlistData';

export default function EditPlaylist() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlaylist(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return <PlaylistForm obj={editItem} />;
}
