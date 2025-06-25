
import { Card, Col, Container, Form, Stack, Alert } from "react-bootstrap"
import { PizzaDataType } from "../../Utils/DataTypes"
import { useContext, useEffect, useState } from "react";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ctx } from "../../Utils/FetchData";
import axios from "axios";

interface ParametersType {

    pizza: PizzaDataType,
    setUpdateAlert: React.Dispatch<React.SetStateAction<number>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>

}

export default function PizzaCard({ pizza, setUpdateAlert, setMessage }: ParametersType) {
    const pizzaCtx = useContext(ctx);
    const [toggle, setToggle] = useState<boolean>(false);
    const [formData, setFormData] = useState<PizzaDataType>(pizza);
    const [deleteAlert, setDeleteAlert] = useState(false);


    useEffect(() => {
        if (toggle) {
            setFormData(pizza);
        }
    }, [toggle, pizza]);


    const handleSubmit = (e: any) => {
        e.preventDefault();
        (async function updateData() {
            try {
                const res = await axios.put("http://localhost:8080/pizzas/" + pizza.pizzaId, formData);
                if (pizzaCtx && typeof pizzaCtx.handleReload === 'function') {
                    pizzaCtx.handleReload();
                    setToggle(false);
                }
                setUpdateAlert(1);
                setMessage(res.data.message);
            }
            catch (err: any) {
                console.error(err);
                setUpdateAlert(2);
                setMessage(err.response.data.error.code + ":" + err.response.data.error.message);
            }


        })();
    }



    const handleDelete = (e: any) => {
        e.preventDefault();
        (async function updateData() {
            try {
                await axios.delete("http://localhost:8080/pizzas/" + pizza.pizzaId);
                if (pizzaCtx && typeof pizzaCtx.handleReload === 'function') {
                    pizzaCtx.handleReload();
                    setToggle(false);
                }
                setUpdateAlert(1);
                setMessage("Pizza deleted successfully");
                setDeleteAlert(false);
            }
            catch (err: any) {
                console.error(err);
                setUpdateAlert(2);
                setMessage(err.response.data.error.code + ":" + err.response.data.error.message);
            }


        })();
    }


    const handleChange = (e: any): void => {
        e.preventDefault();
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
        console.log(formData)
    }


    return (
        <>
            <Col md={4} key={pizza.pizzaId} style={{ position: "relative" }}>
                <Card className="h-100">
                    <Card.Img
                        variant="top"

                        style={{ height: "200px", objectFit: "cover" }}
                        src={pizza.imageUrl ? pizza.imageUrl : undefined}
                    />

                    {toggle ?
                        <Container fluid className="px-0 rounded-bottom" >
                            {/* <IoIosClose className="fs-4 " onClick={() => { setToggle(false) }} style={{ color: "#FF5722", cursor: "pointer" }} /> */}
                            <Card.Body className="mx-0 px-0 h-50  w-100">

                                <Container className="px-0" style={{ overflowY: "scroll", height: "140px", scrollbarWidth: "none" }}>
                                    <Card.Title className="d-flex px-3 justify-content-between w-100">
                                        <Form.Control type="text" name="name" onChange={handleChange} value={formData.name || ""} />
                                    </Card.Title>
                                    <Card.Text className="px-3">
                                        <Stack gap={1}>
                                            <Form.Control as="textarea" name="description" onChange={handleChange} rows={2} value={formData.description || ""} />
                                            <Form.Select name="type" value={formData.type || "veg"} onChange={handleChange} >
                                                <option >Select Type</option>
                                                <option value="Veg" >Veg</option>
                                                <option value="Non Veg">Non Veg</option>
                                            </Form.Select>
                                            <Form.Control type="number" name="priceRegularSize" onChange={handleChange} min={0} value={formData.priceRegularSize || 0} />
                                            <Form.Control type="number" name="priceMediumSize" onChange={handleChange} min={0} value={formData.priceMediumSize || 0} />
                                            <Form.Control type="number" name="priceLargeSize" onChange={handleChange} min={0} value={formData.priceLargeSize || 0} />
                                        </Stack>
                                    </Card.Text>
                                </Container>
                                <div className="d-flex justify-content-end mt-3">
                                    <IoIosClose className="fs-1 text-danger me-1 shadow border rounded" style={{ cursor: "pointer" }} onClickCapture={() => { setToggle(false) }} />
                                    <IoIosCheckmark onClick={handleSubmit} className="fs-1 text-success shadow me-3 border rounded" style={{ cursor: "pointer" }} />
                                </div>
                            </Card.Body>
                        </Container>
                        :
                        <Card.Body>
                            {deleteAlert ?
                                <Card.Title >
                                    <Alert variant="danger" className="w-100 py-1 d-flex px-1" onClose={() => setDeleteAlert(false)} >
                                        <span className="fs-6 mt-1 ms-2">Are You sure</span>
                                        <IoIosCheckmark onClick={handleDelete} className="fs-3 text-success shadow me-1 ms-3 border rounded" style={{ cursor: "pointer" }} />
                                        <IoIosClose onClick={()=>{setDeleteAlert(false)}} className="fs-3 text-danger  shadow border rounded" style={{ cursor: "pointer" }} onClickCapture={() => { setToggle(false) }} />

                                    </Alert>
                                </Card.Title>
                                :

                                <Card.Title className="d-flex justify-content-between w-100">{pizza.name}
                                    <div className="d-flex justify-content-between " >
                                        <CiEdit onClick={() => { setToggle(true) }} className="fs-4 me-2 text-primary" style={{ cursor: "pointer" }} />
                                        <MdOutlineDeleteOutline onClick={() => { setDeleteAlert(true) }} className="fs-4 text-danger " style={{ cursor: "pointer" }} />
                                    </div>
                                </Card.Title>


                            }
                            <Card.Text>
                                <span>{pizza.description}</span><br />
                                <span>type: {pizza.type}</span><br />
                                <span>priceRegularSize: {pizza.priceRegularSize}</span><br />
                                <span>priceMediumSize: {pizza.priceMediumSize}</span><br />
                                <span>priceLargeSize: {pizza.priceLargeSize}</span>
                            </Card.Text>
                        </Card.Body>
                    }
                </Card>
            </Col>
        </>
    )
}


