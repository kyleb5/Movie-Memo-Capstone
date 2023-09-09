import { Button, Form, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    console.warn(searchInput);
    router.push(`/search/${searchInput}`);
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <Row>
      <Form className="d-flex justify-content-end">
        <Form.Control type="search" placeholder="Search" aria-label="Search" value={searchInput} onChange={handleChange} onKeyPress={handleKeyPress} />
        <Button onClick={handleSearch}>Search</Button>
      </Form>
    </Row>
  );
}
