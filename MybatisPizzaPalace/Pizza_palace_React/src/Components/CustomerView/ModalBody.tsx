import { Modal, Container, Button, Form } from "react-bootstrap"
import { Crust, PizzaDataType, Topping } from "../../Utils/DataTypes"
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoIosRemove } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { useEffect } from "react";


interface ModalBody {
    detail: PizzaDataType,
    setPrice: React.Dispatch<React.SetStateAction<number>>,
    price: number,
    quantity: number,
    changeQuantity: (e: any) => void,
    appContext: any,
    selectedToppings: number[],
    nonVegTopping: number,
    handleToppings: (e: any, id: number) => void,
    setSelectedToppings: React.Dispatch<React.SetStateAction<number[]>>,
    setSelectedCrusts: React.Dispatch<React.SetStateAction<number>>,
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>
}


export default function ModalBody({ detail, setPrice, price, quantity, changeQuantity
    , appContext, selectedToppings, nonVegTopping,
    handleToppings, setSelectedToppings, setSelectedCrusts, setTotalPrice }: ModalBody) {

    useEffect(() => {

        const tempPriceArray: number[] = appContext?.topping
            .filter((topping: Topping) => topping.toppingId !== null && selectedToppings.includes(topping.toppingId))
            .map((topping: Topping) => { return topping.toppingPrice });

        let p2: number = 0;
        if (nonVegTopping != 0) {
            const matched = appContext?.topping.find((topping: Topping) => topping.toppingId === nonVegTopping);
            p2 = matched ? Number(matched.toppingPrice || 0) : 0;
        }
        (p2 != 0) && tempPriceArray.push(p2);
        tempPriceArray.sort((a, b) => a - b);
        let tempPrice: number = 0;

        if (price == detail?.priceLargeSize) {
            const removeCount = tempPriceArray.length >= 2 ? 2 : tempPriceArray.length;
            for (let i = 0; i < removeCount; i++) {
                tempPriceArray.pop();
            }
        }
        tempPrice = tempPriceArray.reduce((total, price) => total + price, 0);
        setTotalPrice((price * quantity) + tempPrice);

    }, [selectedToppings, price, quantity, nonVegTopping]);


   

    return (
        <Modal.Body>

            <Container className="d-flex" style={{ maxHeight: "200px" }}>
                <Container className="w-25 p-0 rounded">

                    <img className="" src={detail?.imageUrl || ""} style={{ height: "85%", width: "100%" }} alt="" />
                    <span className="d-flex justify-content-between " style={{ height: "15%" }} >
                        <span className="ms-2 mt-1">{detail?.type} Pizza</span>
                        <Button className="mt-1 p-0 bg-white me-2    text-dark border-0" ><LiaRupeeSignSolid className="mt-0 p-0 " />{price}</Button>
                    </span>
                </Container>
                <Container className=" w-75" style={{ height: "200px", overflowY: "scroll", scrollbarWidth: "none" }}>
                    {detail?.description}
                    <hr className="mt-0 mb-1" />
                    <Container className="p-0 m-0 d-flex gap-3">
                        <Form.Check
                            label="Regular Size"
                            name="size"
                            value={detail?.priceRegularSize || 1}
                            type="radio"

                            onClick={() => { setPrice(detail?.priceRegularSize || 1) }}
                            id="priceRegularSize"
                            defaultChecked
                        />
                        <Form.Check
                            label="Medium Size Size"
                            name="size"
                            value={detail?.priceMediumSize || 1}
                            onClick={() => { setPrice(detail?.priceMediumSize || 1) }}
                            type="radio"
                            id="priceMediumSize"
                        />
                        <Form.Check
                            label="Large Size"
                            name="size"
                            value={detail?.priceLargeSize || 1}
                            onClick={() => { setPrice(detail?.priceLargeSize || 1) }}
                            type="radio"
                            id="priceLargeSize"
                        />
                        <Container className="p-0" style={{ height: "10%", width: "20%" }} >
                            <center><label htmlFor="quantity"> Quantity </label></center>
                            <div className="d-flex ">
                                <center>
                                    <IoIosRemove id="substract" onClick={changeQuantity} className="text-dark fs-4 border ms-1 shadow text-danger p-0" style={{ cursor: "pointer" }} />
                                    <input type="digit" className="" min={1} value={quantity} style={{ height: "100%", width: "25%" }} id="quantity" />
                                    <IoIosAdd id="add" onClick={changeQuantity} className="text-dark fs-4 border me-1 shadow text-success p-0" style={{ cursor: "pointer" }} />
                                </center>
                            </div>
                        </Container>
                    </Container>
                    <hr className="mt-1 mb-1" />
                    <Container className="m-0 p-0 d-flex">
                        <Container className="w-50 p-0 m-0">
                            <p className="mb-1">Toppings</p>
                            {appContext?.topping.filter((topping: Topping) => {
                                // return (detail?.type == "Veg" && topping.type=="Veg")?true:(detail.type=="Non veg" && topping.type=="Non Veg") && topping? ;
                                return (detail?.type == topping?.type) ? true : (detail?.type == "Non Veg" && topping?.name != "Panner") ? true : false;
                            }).map((topping: Topping) => {
                                if (topping?.type == "Veg") {
                                    return (
                                        <Form.Check
                                            label={`${topping.name} (${topping.toppingPrice} Rs.)`}
                                            name="topping"
                                            value={topping.toppingId || 1}
                                            type="checkbox"
                                            id={topping.name || ""}
                                            checked={selectedToppings.includes(topping.toppingId || 1)}
                                            onChange={(e) => {
                                                if (topping.toppingId === null) return;
                                                const updated: number[] = e.target.checked
                                                    ? [...selectedToppings, topping.toppingId]
                                                    : selectedToppings.filter(id => id !== topping.toppingId);
                                                setSelectedToppings(updated);
                                            }}
                                        />
                                    )
                                } else {
                                    return (<Form.Check
                                        label={`${topping.name} (${topping.toppingPrice} Rs.)`}
                                        name="toppings"
                                        value={topping.toppingId || 1}
                                        type="radio"
                                        id={topping.name || ""}
                                        checked={nonVegTopping === (topping.toppingId || 1)}
                                        onClick={(e) => { handleToppings(e, topping?.toppingId || 1) }}

                                    />)
                                }

                            })}
                        </Container>
                        <Container className="w-50 p-0 m-0">
                            <p className="mb-1">Toppings</p>

                            {appContext?.crust.map((crust: Crust) => {
                                return (
                                    <Form.Check
                                        label={crust.name}
                                        name="crust"
                                        value={crust.crustId || 1}
                                        type="radio"
                                        id={crust.name || undefined}
                                        onClick={(e) => {
                                            e.preventDefault;
                                            setSelectedCrusts(crust.crustId || 1)
                                        }}
                                    />

                                )
                            })}
                        </Container>



                    </Container>
                </Container>

            </Container>
        </Modal.Body>
    )
}