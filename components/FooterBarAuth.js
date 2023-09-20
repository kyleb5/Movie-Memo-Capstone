/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
// eslint-disable-next-line object-curly-newline
import { Navbar, Container, Nav } from 'react-bootstrap';
// Navbar
export default function FooterBarAuth() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="https://developer.themoviedb.org/docs">
          <Navbar.Brand href="#home">
            <img src="https://files.readme.io/29c6fee-blue_short.svg" width="64" height="64" className="d-inline-block align-top" alt="Movie Memo Logo" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Navbar.Text>This product uses the TMDB API but is not endorsed or certified by TMDB.</Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
