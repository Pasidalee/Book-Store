import React from 'react';
import {Container,Navbar,NavLink} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" sticky="top" >
            <Navbar.Brand href="/books" className="ms-5">
                Book Store
            </Navbar.Brand>
            </Navbar>
        </div>
    )
}

export default Header;
