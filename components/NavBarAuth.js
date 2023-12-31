/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
// eslint-disable-next-line object-curly-newline
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import SearchBar from './Search';
// Navbar
export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand href="#home">
            <img src="https://i.imgur.com/5s5vNsG.png" width="125" height="60" className="d-inline-block align-top" alt="Movie Memo Logo" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/movie/popular/1" passHref>
              <Nav.Link>Popular</Nav.Link>
            </Link>
            <Link href="/movie/top-rated/1" passHref>
              <Nav.Link>Top Rated</Nav.Link>
            </Link>
            <Link href="/movie/upcoming/1" passHref>
              <Nav.Link>Upcoming</Nav.Link>
            </Link>
            <Link passHref href="/playlist">
              <Nav.Link>Playlists</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <SearchBar />
            <Button className="mx-2" variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
