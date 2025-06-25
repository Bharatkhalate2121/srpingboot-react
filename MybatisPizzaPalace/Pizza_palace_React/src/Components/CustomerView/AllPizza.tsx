import { Container, Row, Col, Card, Navbar } from "react-bootstrap";
import { ctx } from "../../Utils/FetchData";
import { useContext,  useState } from "react";
import {  PizzaDataType,  } from "../../Utils/DataTypes";
import { FaRegCaretSquareUp } from "react-icons/fa";
import { GrSquare } from "react-icons/gr";
import OrderForm from "./OrderForm";
import Sides from "./Sides";
import Cart from "./Cart";

export default function ALlPizza() {


    const appCtx = useContext(ctx);
    //0 for all, 1 for veg and 2 for nonveg
    // const [type, setType = {appCtx.type,appCtx.setType}
    //true for pizzza false for sides
    const {content, setContent} = useContext(ctx);

    const [detail, setDetails] = useState<PizzaDataType | null>(null);


    return (
        <>
            <Container className="d-flex justify-content-between mt-5">
                <Container className="w-100  px-0 " key={"rowpizzacontainer"} style={{ maxHeight: "455px", overflowY: "auto", scrollbarWidth: "none" }}>
                    <Navbar className="d-flex justify-content-between" style={{ maxHeight: "100%", maxWidth: "100%" }}>
                        <Navbar.Brand className="d-flex" media="3">
                            <Container onClick={() => setContent(true)} className=" border" style={{ backgroundColor: (content) ? "rgb(13, 202, 240)" : "white", cursor: "pointer" }}>Pizza</Container>
                            <Container onClick={() => setContent(false)} className="border" style={{ backgroundColor: (content) ? "white" : "rgb(13, 202, 240)", cursor: "pointer" }}>Sides</Container>
                        </Navbar.Brand>
                        {content &&
                            <Navbar.Text className="d-flex p-0 " >
                                <span className="me-3 mt-1 fs-5">Select</span>
                                <Container className="d-flex justify-content-between rounded fs-6  px-1" style={{ backgroundColor: "rgb(230, 230, 230)" }}>
                                    <Container onClick={() => { appCtx.setType(0) }} className="m-1 rounded" style={{ backgroundColor: (appCtx.type == 0) ? "black" : "white", cursor: "pointer", color: (appCtx.type == 0) ? "white" : "black", }}>All</Container>
                                    <Container onClick={() => { appCtx.setType(1) }} className="m-1 rounded" style={{ backgroundColor: (appCtx.type == 1) ? "green" : "white", cursor: "pointer", color: (appCtx.type == 1) ? "white" : "black", }}>Veg</Container>
                                    <Container onClick={() => { appCtx.setType(2) }} className="m-1 rounded" style={{ backgroundColor: (appCtx.type == 2) ? "rgb(135, 15, 25)" : "white", cursor: "pointer", color: (appCtx.type == 2) ? "white" : "black", whiteSpace: 'nowrap' }}>Non Veg</Container>
                                </Container>
                            </Navbar.Text>
                        }

                    </Navbar>
                    <Row className="g-3 w-100 align-items-stretch" key={"rowpizza"} style={{ position: "relative" }}>
                        {(content) ? appCtx?.data.filter((pizza: PizzaDataType) => {
                            return ((pizza.type == "Veg" && appCtx.type == 1) || (pizza.type == "Non Veg" && appCtx.type == 2) || (appCtx.type == 0))
                        }).map((pizza: PizzaDataType) => {
                            return (
                                <Col md={3} style={{ position: "relative", cursor: "pointer" }} >
                                    <Card className="h-100" >
                                        <Card.Img
                                            variant="top"
                                            style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
                                            src={pizza?.imageUrl || ""}
                                            onClick={() => setDetails(pizza)}
                                        />
                                        <Card.Body style={{ cursor: "pointer" }} onClick={() => setDetails(pizza)}>
                                            <Card.Title className="d-flex  w-100">{pizza.name}
                                                {(appCtx.type == 1) ?
                                                    <GrSquare className="text-success mt-1 ms-2 fs-6" />
                                                    : (appCtx.type == 2) ?
                                                        <FaRegCaretSquareUp className="text-danger mt-1 ms-2 fs-6" />
                                                        : (pizza.type == "Veg")
                                                            ? <GrSquare className="text-success mt-1 ms-2 fs-6" />
                                                            :
                                                            <FaRegCaretSquareUp className="text-danger mt-1 ms-2 fs-6" />
                                                }
                                            </Card.Title>
                                            <Card.Text>
                                                {pizza.description}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }) :
                            <Sides />}
                    </Row>
                </Container>


                <Container className=" w-50  d-flex justify-content-between  ">
                    <Container className="w-100  shadow-lg rounded px-y" style={{ position: "relative" }} >
                        <Cart />
                    </Container>
                </Container>
                <OrderForm detail={detail} setDetails={setDetails} />
            </Container>
        </>
    );
}


