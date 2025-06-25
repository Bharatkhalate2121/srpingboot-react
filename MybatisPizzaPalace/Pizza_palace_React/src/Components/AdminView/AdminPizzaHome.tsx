import { useContext, useState } from "react";
import { Row, Container, Alert, Collapse, Fade } from "react-bootstrap";
import { FaRegCircleDot } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa6";
import { BsDashLg } from "react-icons/bs";
import { CreatePizza as CreatePizzaDataType, PizzaDataType } from "../../Utils/DataTypes";
import CreatePizzaFormComponent from "./CratePizzaFormComponent";
import CreatePizzaFormSubmit from "./CreatePizzaFormSubmit"
import PizzaCard from "./PizzaCard";
import { ctx } from "../../Utils/FetchData";



export default function AdminPizzaHome() {
    const { data } = useContext(ctx);
    const [container, setContainer] = useState<number>(1);
    const [message, setMessage] = useState<string>("Please Fill All Fields");
    const [warning, setWarning] = useState(false);
    const [updateAlert, setUpdateAlert] = useState<number>(0);


    const [formData, handleFormData] = useState<CreatePizzaDataType>({
        name: null,
        type: null,
        imageUrl: null,
        description: null,
        priceRegularSize: null,
        priceMediumSize: null,
        priceLargeSize: null,
        file: null
    });



    return (
        <>
            <Container className="d-flex justify-content-between mt-5">
                <Container className="w-50  shadow-lg rounded px-y" style={{ position: "relative" }} >
                    {warning &&
                        <Collapse in={warning} dimension="width">
                            <Alert variant="danger" className=" mt-1" style={{ position: "absolute", left: "22%", right: "22%" }} onClose={() => setWarning(false)} dismissible>
                                {message}
                            </Alert>
                        </Collapse>}
                    <FormProgress container={container} />
                    <CreatePizzaFormComponent formData={formData} handleFormData={handleFormData} container={container} />
                    <CreatePizzaFormSubmit setMessage={setMessage} container={container} setWarning={setWarning} setContainer={setContainer} formData={formData} handleFormData={handleFormData} />
                </Container>


                <Container className="w-100  px-0" key={"rowpizzacontainer"} style={{ maxHeight: "455px", overflowY: "auto", scrollbarWidth: "none" }}>
                    <Row className="g-3 align-items-stretch" key={"rowpizza"} style={{ position: "relative" }}>
                        <Fade in={updateAlert !== 0} mountOnEnter unmountOnExit timeout={5000}>
                            <Alert onClose={()=>{setUpdateAlert(0)}} variant={(updateAlert == 1) ? "success" : "danger"} style={{ position: "absolute", zIndex: 10 }} dismissible>
                               {message}
                            </Alert>
                        </Fade>

                        {(data.length != 0) ? data.map((pizza: PizzaDataType) => {
                            return (
                                <PizzaCard pizza={pizza} setMessage={setMessage} setUpdateAlert={setUpdateAlert} />
                            );
                        }) : <span className="mt-6 fs-3 ">Oppps Nothing here !!</span>}



                    </Row>
                </Container>

            </Container>
        </>
    )
}





function FormProgress({ container }: { container: number }) {


    const progressState1 = <Container className="d-flex justify-content-center fs-4 mt-4">
        <FaRegCircleDot title="In Progress" className=" text-info" />
        <BsDashLg title="progress" />
        <FaRegCircle title="Incomplete" className=" text-danger" />
        <BsDashLg title="progress" />
        <FaRegCircle title="Incomplete" className=" text-danger" />
    </Container>;

    const progressState2 = <Container className="d-flex justify-content-center fs-4 mt-4">
        <FaRegCircleCheck title="Complete" className=" text-success" />
        <BsDashLg title="progress" />
        <FaRegCircleDot title="In Progress" className=" text-info" />
        <BsDashLg />
        <FaRegCircle title="In Complete" className=" text-danger" />
    </Container>;

    const progressState3 = <Container className="d-flex justify-content-center fs-4 mt-4">
        <FaRegCircleCheck title="Complete" className=" text-success" />
        <BsDashLg title="progress" />
        <FaRegCircleCheck title="Complete" className=" text-success" />
        <BsDashLg title="progress" />
        <FaRegCircleDot title="In Progress" className=" text-info" />
    </Container>;

    return (
        (container == 1) ? progressState1 : (container == 2) ? progressState2 : progressState3
    )
}