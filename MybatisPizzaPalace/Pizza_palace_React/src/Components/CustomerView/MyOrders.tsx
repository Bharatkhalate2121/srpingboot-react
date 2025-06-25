//168 & 177 need to be repaired

import { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import { ctx } from "../../Utils/FetchData";
import { Crust } from "../../Utils/DataTypes";
import axios from "axios";
import NothingHere from "../NothingHere";
import { DeleteIcon } from "lucide-react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoIosCheckmark, IoIosClock, IoIosClose } from "react-icons/io";




export default function MyOrders() {
    const appContext = useContext(ctx);
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        async function abc() {
            console.log()
            try {
                const res = await axios.get("http://localhost:8080/orders/" + appContext.user.id);
                console.log(res.data.data.order);
                appContext.setOrders(res.data.data.order);
            }
            catch (err) {
                console.log(err)
            }
        }
        abc();
    }, [flag])

    return (
        <>
            <Container className="mt-5">
                <Row>
                    {appContext.orders && appContext.orders.length > 0 ? appContext.orders.map((order) => {
                        return <MyCard order={order} setFlag={setFlag} flag={flag} />

                    }) : <NothingHere />}

                </Row>


            </Container>
        </>
    )
}


function MyCard({ order, setFlag, flag }: { order: any, setFlag: React.Dispatch<React.SetStateAction<boolean>>, flag: boolean }) {

    const appContext = useContext(ctx);

    return (
        <Col md={4}>
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
                            <Row className="p-0 px-1">
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
                        <Tab className="fs-6 " title={order.totalAmount + "Rs."} disabled/>
                    </Tabs>
                    <ActionButtons orderTime={order.orderTime} setFlag={setFlag} order={order} flag={flag} />
                </Card.Body>
            </Card>
        </Col>
    )
}



function ActionButtons({ orderTime, order, setFlag, flag }: { orderTime: string, order: any, setFlag: React.Dispatch<React.SetStateAction<boolean>>, flag: boolean }) {
    const [showActions, setShowActions] = useState(true);
    const [changeAddress, setChangeAddress] = useState<boolean>(false);
    const [address, setAddress] = useState<string>(order.deliveryAddress);
    const [alert, setAlert] = useState<boolean>(false);


    const handleChange = (e) => {
        e.preventDefault();
        setAddress(e.target.value);
    }

    const handleSubmit = async () => {
        const obj = {
            deliveryAddress: address,
            orderId: order.orderId,
        }
        try {
            const res = await axios.put("http://localhost:8080/orders", obj)
            setChangeAddress(false);
            setFlag(!flag);
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async () => {
        try {
            const res = await axios.delete("http://localhost:8080/orders/" + order.orderId);
            setFlag(!flag)
        }
        catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        const orderDate = new Date(orderTime);
        const now = new Date();

        const timeDiffMs = now.getTime() - orderDate.getTime();
        const minutesPassed = timeDiffMs / (1000 * 60);

        // If already more than 15 min, hide immediately
        if (minutesPassed >= 15) {
            setShowActions(false);
            return;
        }

        // Otherwise, calculate remaining time and set timeout
        const remainingMs = 15 * 60 * 1000 - timeDiffMs;

        const timer = setTimeout(() => {
            setShowActions(false);
        }, remainingMs);

        return () => clearTimeout(timer); // cleanup on unmount
    }, [orderTime]);

    if (!showActions) return (
        <Card.Footer>
            <Container fluid className="d-flex justify-content-between align-items-center p-0">

                {changeAddress ?
                    <input type="text" />
                    :
                    <span className="text-start">Address: {order.deliveryAddress}</span>
                }
            </Container>
        </Card.Footer>
    );

    return (
        <Card.Footer>
            <Container fluid className="d-flex justify-content-between align-items-center p-0">
                {alert && <Alert variant={"danger"} className="w-100 py-2 d-flex m-0 justify-content-between " onClose={() => {setAlert(false) }} >
                    <span className="fs-6 mt-1 ms-2">Really ??</span>
                    <div>
                        <IoIosCheckmark onClick={handleDelete} className="fs-1 text-success shadow  border rounded" style={{ cursor: "pointer" }} />
                        <IoIosClose onClick={()=>{setAlert(false)}} className="fs-1 ms-auto text-danger  shadow border rounded" style={{ cursor: "pointer" }} />
                    </div>
                </Alert>}

                {/* Address on the left */}
                {changeAddress ?
                    <>
                        <Form.Control type="text" value={address} onChange={handleChange} />
                        <IoIosCheckmark onClick={handleSubmit} className="fs-1 border shadow text-success ms-2 " />
                        <IoIosClose className="fs-1 border shadow text-danger ms-2 " onClick={() => setChangeAddress(false)} />
                    </>
                    :
                    <>
                        {!alert && <span className="text-start">Address: {order.deliveryAddress}</span>}

                        {/* Button and Icon on the right */}

                        <div className="d-flex align-items-center">
                            {!alert && <Button variant="outline-warning p-1" onClick={() => setChangeAddress(true)}>Change Address</Button>}
                            <MdOutlineDeleteOutline
                                className="fs-1 ms-2 text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={()=>{setAlert(true)}}
                            />
                        </div>
                    </>
                }

            </Container>
        </Card.Footer>


    );
}