// eslint-disable-next-line object-curly-newline
import { Button, Form, Row } from 'react-bootstrap';

export default function SearchBar() {
  return (
    <Row>
      <Form className="d-flex justify-content-end">
        <Form.Control type="search" placeholder="Search" aria-label="Search" />
        <Button>Search</Button>
      </Form>
    </Row>
  );
}
