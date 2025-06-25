import { Container, Card, Navbar, Accordion, Button, Alert } from "react-bootstrap";
import { ctx } from "../../Utils/FetchData";
import { useContext, useEffect, useState } from "react";
import { CreateOrderDataType, Crust, PizzaDataType, PizzasInCart, Sides as sideDataTYpe, SidesInCart, Topping } from "../../Utils/DataTypes";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoIosCart, IoIosCheckmark, IoIosClose } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export default function Cart() {

    const appContext = useContext(ctx);
    const navigate=useNavigate();
    const [totalPrice, setTotalPrice] = useState<number>(1);
    const [alert, setAlert] = useState<boolean>(false);
    const [eventObj, setEventObj] = useState<any>(null);
    const [objToDelete, setObjToDelete] = useState<any>(null);
    const [message, setMessage] = useState("Are You Sure");
    const [color, setcColor] = useState("danger");


    useEffect(() => {
        let pizzaPrice = appContext.pizzasInCart.reduce((c: number, pizza: PizzasInCart) => c + pizza.amount, 0);
        let sidesPrice = appContext.sidesInCart.reduce((c: number, side: SidesInCart) => c + side.price, 0)
        setTotalPrice(pizzaPrice + sidesPrice);
    }, [appContext.sidesInCart, appContext.pizzasInCart])

    const handleDeleteClick = (e: any, obj: any) => {
        e.preventDefault();
        setEventObj(e);
        setObjToDelete(obj);
        setMessage("Are You Sure");
        setAlert(true);

    }

    const handleCancel = () => {
        // e.preventDefault();
        setcColor("danger");
        setAlert(false);
        setObjToDelete(null);
        setEventObj(null);
        if(message=="Please Login!")
            navigate("/login")
    }

    const handleDelete = (e: any) => {
        e.preventDefault();
        if (eventObj.target.id == "pizza") {
            console.log("pizza")
            const newPizzaInCart: PizzasInCart[] = appContext.pizzasInCart.filter((pizza: PizzasInCart) => {
                return (pizza.pizzaId == objToDelete?.pizzaId && pizza.amount == objToDelete.amount
                    && pizza.size == objToDelete.size && pizza.crustId == objToDelete.crustId) ? false : true;
            }).map((pizza: PizzasInCart) => {
                return pizza;
            })
            appContext.changePizzasInCart(newPizzaInCart);
        }
        else {
            console.log("hii")
            const newSidesInCart: SidesInCart = appContext.sidesInCart.filter((side: SidesInCart) => {
                return (side.sidesId == objToDelete.sidesId && side.quantity == objToDelete.quantity
                    && side.price == objToDelete.price) ? false : true;
            })
                .map((side: SidesInCart) => { return side });
            appContext.changeSidesInCart(newSidesInCart);
        }
        setObjToDelete(null);
        setAlert(false);
    }

    const handleSubmit = () => {

        if (totalPrice == 0) {
            return
        }
        if(appContext.user==null){
            setMessage("Please Login!")
            setAlert(true);
        }
        const orderData: CreateOrderDataType = {
            customerId: appContext.user.id,
            deliveryAddress: appContext.user.address,
            totalAmount: totalPrice,
            pizza: appContext.pizzasInCart,
            sides: appContext.sidesInCart,
        }

        const executeOrder = async () => {
            try {
                console.log("hii")
                const res = await axios.post("http://localhost:8080/orders", orderData);
                setMessage("Order Created");
                setcColor("success");
                setAlert(true);
                appContext.changeSidesInCart([]);
                appContext.changePizzasInCart([]);


            }
            catch (err:any) {
                console.log(err);
                setMessage(err.response.data.error.message.substring(1,err.response.data.error.message.length-2))
                setAlert(true);
            }

        }
        executeOrder();

    }

    return (
        <>
            <Navbar className="d-flex justify-content-center" style={{ maxHeight: "100%", maxWidth: "100%", }}>

                {alert ?
                    <Alert variant={color} className="w-100 py-2 d-flex  m-0 justify-content-between" onClose={() => { setcColor("danger"); setAlert(false) }} >
                        <span className="fs-6 mt-1 ms-2">{message}</span>
                        <div>
                            {message == "Are You Sure" && <IoIosCheckmark onClick={handleDelete} className="fs-1 text-success shadow  border rounded" style={{ cursor: "pointer" }} />}
                            <IoIosClose onClick={handleCancel} className="fs-1  text-danger  shadow border rounded" style={{ cursor: "pointer" }} />
                        </div>
                    </Alert>
                    :
                    <Navbar.Brand className="d-flex" media="3">
                        <span style={{ color: "#870f19" }}>Your Cart</span><IoIosCart className="fs-4 mt-1 ms-1 text-info" />
                    </Navbar.Brand>
                }
            </Navbar>
            <Container className="rounded px-1 py-1" style={{ height: "340px", position: "relative", overflowY: "auto", scrollbarWidth: "none" }}>
                <Accordion>
                    {appContext.pizzasInCart.map((pizza: PizzasInCart) => {
                        return (
                            <>
                                {appContext.data.filter((pizzaMatch: PizzaDataType) => pizzaMatch.pizzaId == pizza.pizzaId)
                                    .map((pizzaToDisp: PizzaDataType) => {
                                        return (
                                            <>
                                                <Accordion.Item id="pizza" eventKey={pizza.pizzaId + pizza.size + pizza.amount + pizza.toppingsId}>
                                                    <Accordion.Header id="pizza" style={{ position: "relative" }}>
                                                        <span id="pizza" className="text-truncate">{pizzaToDisp.name}</span>
                                                        <MdOutlineDeleteOutline id="pizza" onClick={(e) => { handleDeleteClick(e, pizza) }} className="fs-2 p-1  mb-1 text-danger" style={{ position: "absolute", right: "5%" }} />
                                                    </Accordion.Header>
                                                    <Accordion.Body id="pizza" className="d-flex p-0 m-0">
                                                        <Card className="d-flex border-0 w-100">
                                                            <Card.Body className="d-flex">

                                                                <img src={pizzaToDisp.imageUrl || ""}
                                                                    className="w-50 rounded shadow"
                                                                    style={{ height: "150px" }} />

                                                                <div className="w-50 ms-2">
                                                                    <span className="d-flex mb-0 p-0 ms-1"><LiaRupeeSignSolid className="mt-1 mx-1 fs-5 p-0 " />{pizza.amount}</span>
                                                                    <hr className="mt-0 mb-1" />
                                                                    {appContext.crust.filter((crust: Crust) => crust.crustId == pizza.crustId)
                                                                        .map((crust: Crust) => {
                                                                            return (
                                                                                <span className="fs-6 m-0 p-0" >{crust.name}</span>
                                                                            )
                                                                        })}
                                                                    <hr className="mt-0 mb-1" />
                                                                    {appContext.topping.filter((topping: Topping) => pizza.toppingsId.includes(topping.toppingId || 0))
                                                                        .map((topping: Topping) => {
                                                                            return <><span className="fs-6 m-0 p-0" >{topping.name}</span><br /></>
                                                                        })}


                                                                </div>


                                                            </Card.Body>
                                                        </Card>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </>
                                        )
                                    })}
                            </>
                        )
                    })}

                    {appContext.sidesInCart.map((side: SidesInCart) => {
                        return (
                            <>
                                {appContext.sides.filter((sideMatch: sideDataTYpe) => sideMatch.sidesId == side.sidesId)
                                    .map((sideToDisp: sideDataTYpe) => {
                                        return (
                                            <>
                                                <Accordion.Item eventKey={side.sidesId + side.quantity + side.price + "" + sideToDisp?.name || ""}>
                                                    <Accordion.Header style={{ position: "relative" }}>
                                                        <span className="text-truncate">{sideToDisp.name}</span>
                                                        <MdOutlineDeleteOutline onClick={(e) => { handleDeleteClick(e, side) }} className="fs-2 p-1  mb-1 text-danger" style={{ position: "absolute", right: "5%" }} />
                                                    </Accordion.Header>


                                                    <Accordion.Body className="d-flex p-0 m-0">
                                                        <Card className="d-flex border-0 w-100">
                                                            <Card.Body className="d-flex">

                                                                <img src="https://indianheartbeat.in/wp-content/uploads/2023/01/cola-drink-black-soft-drinks-glass-table_51137-1229.webp"
                                                                    className="w-50 rounded shadow"
                                                                    style={{ height: "80px" }} />

                                                                <div className="w-50 ms-2">
                                                                    <span className="d-flex mb-0 p-0 ms-1"><LiaRupeeSignSolid className="mt-1 mx-1 fs-5 p-0 " />{side.price}</span>
                                                                    <hr className="mt-0 mb-1" />
                                                                    <span className="fs-6 m-0 p-0" > Quantity: {side.quantity}</span>
                                                                    <hr className="mt-0 mb-1" />
                                                                </div>


                                                            </Card.Body>
                                                        </Card>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </>
                                        )
                                    })}


                            </>
                        )
                    })}


                </Accordion>
            </Container>
            <Navbar className="d-flex justify-content-center" style={{ maxHeight: "100%", maxWidth: "100%" }}>
                <Navbar.Brand className="d-flex" media="3">
                    <span className="me-3 mt-1" style={{ color: "#870f19" }}>Total Amount <LiaRupeeSignSolid className="fs-4" />{totalPrice}</span>
                    <Button variant="success" onClick={handleSubmit}>Check Out</Button>
                </Navbar.Brand>
            </Navbar>
        </>
    )
}