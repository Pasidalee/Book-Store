import React from 'react';
import {Navbar,Container} from 'react-bootstrap';

function Footer() {
    return (
        <div>
           {/* <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom" className="cc">
            <Container>
                <Navbar.Text href="#" className="ft">All rights reserved 2020 @bookstore </Navbar.Text>
            </Container>
            </Navbar> */}
            <footer className="bg-dark text-center text-lg-start ft">
                <div className="text-center p-3" >
                All rights reserved 2020 @bookstore
                    
                </div>
                </footer>
        </div>
    )
}

export default Footer;
