import './ProductDetails.css'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Actions/CartActions";
import { getUserData } from "../../Redux/Actions/LoginActions";

function ProductDetails() {
    let productId = useParams();
    console.log("id", productId.position);
    let dispatch = useDispatch();

    let [singleProduct, setSingleProduct] = useState({});
    let [productQuantity, setProductquantity] = useState();

    let userData = useSelector((state) => state.loginRoot.loginDetails);
    console.log(userData, "userdata");

    useEffect(() => {
        setTimeout(() => {
            dispatch(getUserData())
            singleProductDetail();
        }, 1000);
    }, [setSingleProduct])

    let singleProductDetail = () => {
        axios.get("https://fakestoreapi.com/products/" + productId.position)
            .then((res) => {
                console.log(res.data);
                setSingleProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let cart = async (e) => {
        e.preventDefault();
        let cartDetails = {
            quantity: e.target.quantity.value,
            productId: productId.position,
            userId: userData.id
        }

        let addProduct = await axios.get(`http://localhost:3000/cartData?productId=${productId.position}&userId=${userData.id}`)
        if (addProduct.data.length === 0) {
            dispatch(addToCart(cartDetails))
            setProductquantity(1);
        }
        else {
            toast.error("Product already in cart")
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col xs={6}>
                        <img src={singleProduct.image} width={300} />
                    </Col>
                    <Col xs={6}>
                        <Card className="productDetails">
                            <Card.Header>
                                <h1>  {singleProduct.title}</h1>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{singleProduct.description}</Card.Title>
                                <Card.Text className="productPrice">
                                    <h3>${singleProduct.price}</h3>
                                </Card.Text>

                                <Card.Text>
                                    <h4>Rating : {singleProduct.rating ? singleProduct.rating.rate : 0} | {singleProduct.rating ? singleProduct.rating.count : 0}  Ratings</h4>
                                </Card.Text>

                                <form method="post" onSubmit={(e) => cart(e)}>
                                    <Card.Text className="productQuantity">
                                        <h4>Quantity</h4>
                                        <Form.Select name="quantity" style={{ width: "100px" }}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </Form.Select>
                                    </Card.Text>

                                    <Card.Text className='addToCart'>
                                        <div>
                                            {userData ? (
                                                productQuantity == 1 ? (
                                                    <Link to="/cart">
                                                        <button type="submit">Go To Cart</button>
                                                    </Link>
                                                ) : (
                                                    <button type="submit">Add To Cart</button>
                                                )
                                            ) : (
                                                <Link to="/logIn">
                                                    <button type="submit">Add To Cart</button>
                                                </Link>
                                            )}
                                        </div>
                                    </Card.Text>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
            <ToastContainer />
        </>
    )
}

export default ProductDetails;