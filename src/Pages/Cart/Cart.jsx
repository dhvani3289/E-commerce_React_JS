import axios from "axios";
import { useEffect, useState } from "react";
import './Cart.css'
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { getCartDetails } from "../../Redux/Actions/CartActions";
import { toast, ToastContainer } from 'react-toastify';

function Cart() {
    let [cartProductData, setCartProductData] = useState([]);
    let [totalBill, setTotalBill] = useState(0);
    let dispatch = useDispatch();

    let cartLength = useSelector((state) => state.cartRoot.cartRecord)

    useEffect(() => {
        setTimeout(() => {
            getUserCartData();
        }, 1000);
    }, [])

    let getUserCartData = async () => {
        let userLocal = JSON.parse(localStorage.getItem("user"));
        // console.log(userLocal); user login data
        if (userLocal == null) {
            window.location = "/logIn";
        }
        let cartData = await axios.get("http://localhost:3000/cartData?userId=" + userLocal.id);

        let newarray = [];
        cartData.data.map((v, i) => {
            newarray.push(v.productId);
        })

        let allcartproductsData = newarray.map((id) => {
            return axios.get("https://fakestoreapi.com/products/" + id)
        })

        let response = await Promise.all(allcartproductsData);

        let result = response.map((res) => {
            return res.data
        })

        let cartTotal = 0;

        result.map((v, i) => {
            if (typeof v === 'string') {
                console.error("Unexpected empty string in cart data :", v);
                return;
            }
            v.cartQuantity = cartData.data[i].quantity,
                v.cartId = cartData.data[i].id,
                cartTotal += parseFloat(v.cartQuantity) * parseFloat(v.price);

        });
        setCartProductData(result);
        setTotalBill(cartTotal);

    }

    let incrementCartItem = async (cartId, Cquantity) => {
        let updateCart = await axios.patch("http://localhost:3000/cartData/" + cartId,
            { quantity: Cquantity < 5 ? Cquantity : 5 })
        if (updateCart.data) {
            getUserCartData();
            toast.success("Cart Item Updated");
        }
        else {
            toast.error("Something wrong");
        }
    }

    let decrementCartItem = async (cartId, CQuantity) => {
        console.log(cartid, CQuantity);
        let updatecart = await axios.patch("http://localhost:3000/cartData/" + cartId, {
            quantity: CQuantity > 0 ? CQuantity : 1
        });
        if (updatecart.data) {
            getUserCartData();
            toast.success("Cart Item Updated");
        }
        else {
            toast.error("Something wrong");
        }
    }

    let removeCartItem = async (cartId) => {
        console.log(cartId);
        let removeCart = await axios.delete("http://localhost:3000/cartData/" + cartId);
        if (removeCart.data) {
            getUserCartData();
            let userLocal = JSON.parse(localStorage.getItem('user'));
            dispatch(getCartDetails(userLocal.id));
            toast.success("Item removed from cart");
        }
        else {
            toast.error("Item not removed from cart");
        }
    }


    return (
        <>
            <table border={1} cellPadding={5} cellSpacing={5} align="center" style={{ marginTop: "60px" }}>
                <tr>
                    <td>
                        {
                            cartProductData.map((v, i) => {
                                return (
                                    <>
                                        <Card className="cart_card">
                                            <Card.Img variant="top" src={v.image} style={{ width: "100px" }} />
                                            <Card.Body>
                                                <Card.Title>{v.title}</Card.Title>
                                                <Card.Text>
                                                    $
                                                    {v.price * v.cartQuantity}
                                                </Card.Text>
                                                <Card.Text>
                                                    Quantity :
                                                    <button type="submit" className="incDec-btn" onClick={() => { incrementCartItem(v.cartId, ++v.cartQuantity) }}>+</button>
                                                    {v.cartQuantity}
                                                    <button type="submit" className="incDec-btn" onClick={() => { decrementCartItem(v.cartId, --v.cartQuantity) }}>-</button>
                                                </Card.Text>
                                                <Card.Text>
                                                    <button type="submit" className="delete-btn" onClick={() => removeCartItem(v.cartId)}>Delete</button>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </>
                                )
                            })
                        }
                    </td>
                </tr>

                <tr className="totalBill">
                    <td>Total Bill : {totalBill}</td>
                </tr>
                <tr>
                    <td className="payment">
                        <button type="submit">Payment</button>
                    </td>
                </tr>
            </table>
            <ToastContainer />
        </>
    )
}

export default Cart;