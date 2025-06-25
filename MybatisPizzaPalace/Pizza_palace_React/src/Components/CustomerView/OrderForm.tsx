import { Modal,  Button} from "react-bootstrap"
import {  PizzaDataType, PizzasInCart} from "../../Utils/DataTypes"
import { GrSquare } from "react-icons/gr"
import { FaRegCaretSquareUp } from "react-icons/fa"
import { ctx } from "../../Utils/FetchData"
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useContext, useEffect, useState } from "react"
import ModalBody from "./ModalBody"
import { IoIosCart } from "react-icons/io"






export default function OrderForm({ detail, setDetails }: { detail: PizzaDataType, setDetails: React.Dispatch<React.SetStateAction<PizzaDataType | null>> }) {
    const appContext = useContext(ctx);
    const [selectedToppings, setSelectedToppings] = useState<number[]>([]);
    const [price, setPrice] = useState<number>(detail?.priceRegularSize || 0);
    const [quantity, setQuantity] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(price != 0 ? price : 1);
    const [selectedCrusts, setSelectedCrusts] = useState<number>(1);
    const [nonVegTopping, setNonVegTopping] = useState<number>(0);
   


    useEffect(() => {
        if (detail?.priceRegularSize != null) {
            setPrice(detail.priceRegularSize);
        }
    }, [detail]);


    const changeQuantity = (e: any) => {
        e.preventDefault();

        (e.target.id == "substract" && quantity == 1) ? "" : (e.target.id == "substract") ? setQuantity(quantity - 1) :
            (e.target.id == "add") && setQuantity(quantity + 1);
    }

    const handleToppings = (e: any, id: number) => {
        e.preventDefault();
        setNonVegTopping(id);

    }

 
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const toopings:number[]=(nonVegTopping!=0)?[...selectedToppings,nonVegTopping]:selectedToppings;
        const pizza: PizzasInCart = {
            pizzaId: detail.pizzaId || 1,
            size: (price == detail.priceRegularSize) ? "Regular" : (price == detail.priceMediumSize) ? "Medium" : "Large",
            quantity: quantity,
            amount: totalPrice,
            crustId:selectedCrusts,
            toppingsId:toopings,
        }
        const pizzasIncart=appContext.pizzasInCart;
        appContext.changePizzasInCart([...pizzasIncart,pizza]);
        setDetails(null)
    };



    return (
        <Modal size="lg" show={(detail != null) && true} onHide={() => setDetails(null)} centered >
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                    {detail?.name}
                    {detail?.type == "Veg" ? <GrSquare className="text-success ms-2 fs-4" /> : <FaRegCaretSquareUp className="text-danger mb-1 ms-2 fs-4" />}
                </Modal.Title>
            </Modal.Header>
            <ModalBody selectedToppings={selectedToppings} setSelectedCrusts={setSelectedCrusts} detail={detail} setPrice={setPrice}
                price={price} quantity={quantity} changeQuantity={changeQuantity} appContext={appContext} setSelectedToppings={setSelectedToppings}
                nonVegTopping={nonVegTopping} handleToppings={handleToppings} setTotalPrice={setTotalPrice} />

            <Modal.Footer>
                <Button className="mt-1 p-0 bg-white me-2 text-dark border-0" > Total  <LiaRupeeSignSolid className="mt-0 fs-5 p-0 " />{totalPrice}</Button>
                <Button variant="success" onClick={handleSubmit}>Add To Cart <IoIosCart className="fs-4" /></Button>
            </Modal.Footer>
        </Modal>
    )
}