import { Button, Card, Col, Container } from "react-bootstrap"
import { ctx } from "../../Utils/FetchData"
import { useContext, useEffect, useState } from "react"
import { Sides, SidesInCart } from "../../Utils/DataTypes";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoIosAdd, IoIosCart, IoIosRemove } from "react-icons/io";



export default function () {

    const appContext = useContext(ctx);




    return (
        <>
            {appContext.sides.map((sides: Sides) => {
                return (
                    <Cards sides={sides}/>
                )
            })}
        </>
    )
}



function Cards({sides}:{sides:Sides}) {
    const appContext = useContext(ctx);
    const [quantity, setQuantity] = useState<number>(1);
    const [price, setPrice] = useState<number>(sides.price||1);
    const fixPrice:number=sides.price||1;

    const changePrice = () => { setPrice(quantity*fixPrice) };
    const changeQuantity = (e: any) => {
        e.preventDefault();

        (e.target.id == "substract" && quantity == 1) ? "" : (e.target.id == "substract") ? setQuantity(quantity - 1) :
            (e.target.id == "add") && setQuantity(quantity + 1);
    }

    useEffect(()=>{
        changePrice();
    },[quantity])

    const handleSubmit=(e:any)=>{
        e.preventDefault();
        const side:SidesInCart={
            sidesId:sides.sidesId ||1,
            quantity:quantity,
            price:price
        }
        appContext.changeSidesInCart([...appContext.sidesInCart,side]);
    }


    return (
        <Col md={3} style={{ position: "relative", cursor: "pointer" }} >
            <Card className="h-100" >
                <Card.Img
                    variant="top"
                    style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
                    src={"https://indianheartbeat.in/wp-content/uploads/2023/01/cola-drink-black-soft-drinks-glass-table_51137-1229.webp"}
                // onClick={() => setDetails(pizza)}
                />
                <Card.Body style={{ cursor: "pointer" }} >
                    <Card.Title className="d-flex  w-100">{sides.name}</Card.Title>
                    <Card.Text>
                        <Container className="d-flex justify-content-between p-0 m-0">
                            <LiaRupeeSignSolid className="mt-1 p-0 fs-3" /><span className="mt-1">{price}</span>
                            <Container className="p-0 ms-3"  >
                                <div className="d-flex ">
                                    <center>
                                        <IoIosRemove id="substract" onClick={changeQuantity} className="text-dark fs-4 border ms-1 shadow text-danger p-0" style={{ cursor: "pointer" }} />
                                        <input type="digit" className="" min={1} value={quantity} style={{ height: "100%", width: "25%" }} id="quantity" />
                                        <IoIosAdd id="add" onClick={changeQuantity} className="text-dark fs-4 border me-1 shadow text-success p-0" style={{ cursor: "pointer" }} />
                                    </center>
                                </div>
                            </Container>
                        </Container>
                        <div className="d-flex m-0 mt-2" >
                            <Button variant="success" onClick={handleSubmit} style={{ whiteSpace: "nowrap" }}>Add To Cart <IoIosCart className="fs-4" /></Button>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}