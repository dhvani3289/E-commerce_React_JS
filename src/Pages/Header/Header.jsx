import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserData, userLogout } from '../../Redux/Actions/LoginActions';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ImCart } from "react-icons/im";
import { IoHeartOutline } from "react-icons/io5";
import Badge from 'react-bootstrap/Badge';

import './header.css'
import { getCartDetails } from '../../Redux/Actions/CartActions';

function Header() {
    let dispatch = useDispatch();
    let userData = useSelector((state) => state.loginRoot.loginDetails);

    let cartLength = useSelector((state) => state.cartRoot.cartRecord);

    useEffect(() => {
        let loginUser = JSON.parse(localStorage.getItem("user"));
        if (loginUser) {
            dispatch(getCartDetails(loginUser.id))
        }
        dispatch(getUserData())
    }, [])

    let logoutUser = () => {
        dispatch(userLogout());
        window.location = "/logIn"
    }

    return (
        <>
            <Navbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top">
                <Container fluid style={{ justifyContent: "space-around" }}>
                    <Navbar.Brand href="#">Navbar</Navbar.Brand>
                    <Nav style={{ fontSize: "18px" }}>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/category">Category</Nav.Link>
                        <Nav.Link href="/services">Services</Nav.Link>
                        <Nav.Link href="/contactus">Contact Us</Nav.Link>
                    </Nav>

                    <div className='nav-end'>
                        {userData.username ?
                            <div className='cartAndWishlist'>
                                <IoHeartOutline />
                                <span>
                                    <Link to="/cart">
                                        <ImCart />
                                        <Badge bg="primary">{cartLength.length}</Badge>
                                    </Link>
                                </span>
                            </div>
                            :
                            ""
                        }

                        <div className='auth'>
                            {userData.username ?
                                <span>{userData.username}</span>
                                :
                                <Link to="/signUp">
                                    Sign Up
                                </Link>
                            }

                            {userData.username ?
                                <button onClick={() => logoutUser()}>Logout</button>
                                :
                                <Link to="/logIn">
                                    Log In
                                </Link>
                            }
                        </div>
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;