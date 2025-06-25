
import { useContext, useEffect, useState } from "react";
import {  Container, Button, Alert, Spinner, Fade } from "react-bootstrap";
import { FormButtonDataType } from "../../Utils/DataTypes";
import axios from "axios";
import { ctx } from "../../Utils/FetchData";




export default function CreatePizzaFormSubmit({ container, setContainer, formData, setWarning, setMessage, handleFormData }: FormButtonDataType) {

    

    const [disabled, setDisabled] = useState<boolean>(true);
    const [submit, setSubmit] = useState<boolean>(false);
    const [spinner, setSpinner] = useState<boolean>(false);
    //0 for no operation, 1 for success & 2 for failure
    const [status, setStatus] = useState<number>(0);
    const [resMessage, setResMessage] = useState<String>("");


    const pizzaCtx = useContext(ctx);

    useEffect(() => {
      const fetchData = async () => {
        if (pizzaCtx && typeof pizzaCtx.handleReload === 'function') {
          pizzaCtx.handleReload();
        } else {

        }
      };
    
      fetchData();
    }, [status]);
    

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setSpinner(true);

        const delay = (ms:any) => new Promise(resolve => setTimeout(resolve, ms));
        const startTime = Date.now();

        try {
            const res = await axios.post("http://localhost:8080/mypizza", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            const elapsed = Date.now() - startTime;
            const minTime = 1000; // 1 second
            if (elapsed < minTime) {
                await delay(minTime - elapsed);
            }

            setStatus(1);
            setResMessage(res.data.message);
            setContainer(1);
            handleFormData({
                name: null,
                type: null,
                imageUrl: null,
                description: null,
                priceRegularSize: null,
                priceMediumSize: null,
                priceLargeSize: null,
                file: null
            })

        } catch (err: any) {
            setStatus(2);
            setResMessage(err.response.data.error.code + ":" + err.response.data.error.message);
        } finally {
            setSpinner(false);
        }
    };



    function handleNextSubmit(e:any) {
        if (e.target.id === "previous") {
            setContainer(container - 1);
        }
        else if (submit) {
            if (formData.priceRegularSize != 0 && formData.priceMediumSize != 0 && formData.priceLargeSize != 0 &&
                formData.priceRegularSize != null && formData.priceMediumSize != null && formData.priceLargeSize != null) {
                handleSubmit(e);
            }
            else {
                setWarning(true);
                setMessage("Price Can't be zero");
            }

        } else {

            if (container == 1 && formData.name != null && formData.name != "" && formData.description != null && formData.description !== "" &&
                formData.type != null && formData.type != "Select Type") {
                setContainer(container + 1);
            }
            else if (container == 2 && formData.file != null) {
                setContainer(container + 1);
            }
            else {

                (container == 1) ?
                    setMessage("Please Fill All Fields") :
                    setMessage("Please Select File");
                setWarning(true);

            }
        }


    }

    useEffect(() => {
        (container > 1) ? setDisabled(false) : setDisabled(true);
        (container == 3) ? setSubmit(true) : setSubmit(false);
    }, [container]);

    return (
        <>
            {spinner &&
                <Container className="rounded d-flex align-items-center justify-content-center" fluid style={{ width: "100%", height: "100%", top: 0, left: 0, backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)", position: "absolute" }}>
                    <Spinner animation="border" className="text-danger" />;
                </Container>
            }
            {(status == 1) &&
                <Fade in={true} mountOnEnter unmountOnExit>
                    <Alert variant="success" onClose={() => setStatus(0)} style={{ maxWidth: "90%", top: 10, left: "5%", right: "5%", backdropFilter: "blur(4px)", position: "absolute" }} dismissible>
                        {resMessage}
                    </Alert>
                </Fade>}
            {(status == 2) &&
                <Fade in={true} mountOnEnter unmountOnExit>
                    <Alert variant="danger" onClose={() => setStatus(0)} style={{ maxWidth: "90%", top: 10, left: "5%", right: "5%", backdropFilter: "blur(4px)", position: "absolute" }} dismissible>
                        {resMessage}
                    </Alert>
                </Fade>
            }
            < Container className="d-flex justify-content-center my-3">
                <Button variant="dark" id="previous" className="me-5 w-50" onClick={handleNextSubmit} disabled={disabled}>Previous</Button>
                <Button variant="dark" id="next" onClick={handleNextSubmit} style={{ backgroundColor: (submit) ? "green" : "black" }} className="w-50 ">{submit ? "Submit" : "Next"}</Button>
            </ Container>
        </>
    )

}