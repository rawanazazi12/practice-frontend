import React, { Component } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

export class Header extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Container>
                        <Router>
                            <Nav>
                                <Nav.Link href='/'>
                                    Home
                                </Nav.Link>
                                <Nav.Link href='/fav'>
                                    Favourite
                                </Nav.Link>
                                {this.props.auth0.isAuthenticated &&<Nav.Link href='/profile'>Profile</Nav.Link>}
                                {this.props.auth0.isAuthenticated?<LogoutButton/>:<LoginButton/>}
                            </Nav>
                        </Router>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default withAuth0(Header)
