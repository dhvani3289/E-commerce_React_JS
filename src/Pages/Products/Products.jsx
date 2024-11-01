import './Products.css'
import { Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Products(props) {
    return (
        <>
            <Container>
                <Row>
                    {props.items.map((v, i) => {
                        return (
                            <Link to={'/productdetails/' + v.id} style={{ width: "20%" }}>
                                <div className='productbox'>
                                    <div className='productImage'>
                                        <img src={v.image} width={200} height={200} />
                                    </div>
                                    <div>
                                        <h6>{v.title}</h6>
                                        <p>{v.description.substring(0, 20)}...</p>
                                        <h6>${v.price}</h6>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                    }
                </Row>
            </Container >
        </>
    )
}

export default Products;

