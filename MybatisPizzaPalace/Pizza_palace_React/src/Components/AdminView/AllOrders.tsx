import { useContext, useEffect } from "react";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { ctx } from "../../Utils/FetchData";
import { Crust } from "../../Utils/DataTypes";
import axios from "axios";
import NothingHere from "../NothingHere";
import { GoStop } from "react-icons/go";




export default function AllOrders() {
    const appContext = useContext(ctx);
   useEffect(() => {
        async function abc() {
            console.log()
            try {
                const res = await axios.get("http://localhost:8080/orders");
                console.log(res.data.data.order);
                appContext.setOrders(res.data.data.order);
            }
            catch (err) {
                console.log(err)
                
            }
        }
         abc();
    }, [])

    return (
        <>
            <Container className="mt-5">
                <Row>
                    {appContext.orders && appContext.orders.length > 0 ? appContext.orders.map((order) => {
                        return <Col md={4}>
                            <Card className={`mb-3 $ "border-primary shadow" :""}`} style={{ cursor: "pointer" }}>
                                <Card.Body className="p-0">
                                    <Tabs defaultActiveKey="Pizzas" id="uncontrolled-tab-example" className="mb-3">

                                        <Tab eventKey="contact" title={"Order # " + order.orderId} disabled>                                        </Tab>

                                        <Tab eventKey="Pizzas" title="Pizzas">
                                            <Row className="p-0 px-1">
                                                {order.pizza.map((pizza: any, index: number) => {
                                                    const pizzaInDb = appContext.data.find((p: any) => p.pizzaId === pizza.pizzaId);
                                                    return (<>

                                                        <Col md={6} className=" ">
                                                            <Card className={"bg-white"} style={{ cursor: "pointer", border: "hidden" }}>
                                                                <Card.Header className="border-0 bg-white">{pizzaInDb?.name}-{pizza?.quantity}(Q)</Card.Header>
                                                                <Card.Body>
                                                                    {appContext.crust.filter((crust: Crust) => { return crust.crustId == pizza.crustId })
                                                                        .map((crusty) => {
                                                                            return <p className="fs-6">{crusty.name}</p>;
                                                                        })}
                                                                    <hr className="p-0 m-0" />
                                                                    {(() => {




                                                                        const toppingIds = pizza?.toppingsId;


                                                                        // Step 2: Filter matching toppings
                                                                        const matchedToppings = appContext?.topping?.filter((topping: any) =>
                                                                            toppingIds?.includes(topping?.toppingId)
                                                                        );


                                                                        // Step 3: Map over them safely
                                                                        return matchedToppings?.length > 0 ? (
                                                                            matchedToppings.map((usefulTopping: any, index: number) => (
                                                                                <p key={index}>{usefulTopping?.name}</p>
                                                                            ))
                                                                        ) : (
                                                                            <p>No toppings found</p>
                                                                        );
                                                                    })()}
                                                                </Card.Body>
                                                            </Card>

                                                        </Col>


                                                        {/* <span key={index}>
                                                        {pizzaInDb ? pizzaInDb.name : "Unknown Pizza"}-{pizza.quantity}
                                                    </span><br/> */}

                                                    </>
                                                    );
                                                })}

                                            </Row>
                                        </Tab >
                                        <Tab eventKey="Sides" title="Sides">
                                            <Row className="p-0 px-1" >
                                                <Col md={12} className=" ">
                                                    <Card className={"bg-white"} style={{ cursor: "pointer", border: "hidden" }}>
                                                        {order.sides.length > 0 ? (
                                                            order.sides.map((side) => {
                                                                const sideInDb = appContext.sides.find((p: any) => p.sidesId === side.sidesId);
                                                                return (
                                                                    <Card.Header key={side.sidesId} className="border-0 bg-white">
                                                                        {sideInDb?.name ?? "Unknown Side"} - {side.quantity} (Q)
                                                                    </Card.Header>
                                                                );
                                                            })
                                                        ) : (
                                                            <Card.Body className="text-muted">No sides</Card.Body>
                                                        )}

                                                        <Card.Body>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>


                                        </Tab>
                                        <Tab className="fs-6 text-dark bg-success" title={order.totalAmount + " Rs."} />
                                    </Tabs>

                                    <Card.Footer className="d-flex justify-content-between">
                                        <p>Address: {order.deliveryAddress}</p>
                                        {!order.valid && <GoStop className="text-danger fs-4" title="Canceled"/>}
                                    </Card.Footer>

                                </Card.Body>

                            </Card>
                        </Col>

                    }) : <NothingHere />}

                </Row>


            </Container>
        </>
    )
}