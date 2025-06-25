
import {  useState } from "react";
import { Form, Container} from "react-bootstrap";
import { IoIosImages } from "react-icons/io";
import { CreatePizza as CreatePizzaDataType } from "../../Utils/DataTypes";



export default function CreatePizzaFormComponent({ container,
    formData,
    handleFormData }: {
        container: number,
        formData: CreatePizzaDataType;
        handleFormData: React.Dispatch<React.SetStateAction<CreatePizzaDataType>>
    }) {

    const [fileName, setFileName] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | any) => {
        e.preventDefault();

        const { name, value } = e.target;

        // Check if it's an input and specifically of type "file"
        if (
            e.target instanceof HTMLInputElement &&
            e.target.type === "file" &&
            name === "file"
        ) {
            const file = e.target.files?.[0];
            if (file) {
                setFileName(file.name);
                handleFormData((prev) => (
                    {
                        ...prev,
                        file: file,
                    }));
            }
        } else {
            handleFormData((prev) => ({
                ...prev,
                [name]: name.toLowerCase().includes("price") ? Number(value) : value,
            }));
        }
        console.log(formData)
    };




    const container1 = <Container fluid style={{ height: "275px" }}>
        <Form.Group className="mb-3">
            <Form.Label>Pizza Name</Form.Label>
            <Form.Control type="text" value={formData.name || ""} onChange={handleChange} placeholder="Enter Pizza Name" name="name" />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Pizza Type</Form.Label>
            <Form.Select aria-label="Select Type" name="type" value={formData.type || "veg"} onChange={handleChange} >
                <option >Select Type</option>
                <option value="Veg" >Veg</option>
                <option value="Non Veg">Non Veg</option>
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" onChange={handleChange} value={formData.description || ""} placeholder="Enter Description" rows={2} name="description" />
        </Form.Group>
    </Container>;

    const container2 = <Container fluid className="d-flex align-items-center justify-content-center" style={{ height: "275px" }} >
        <Container >

            <Container className="d-flex align-items-center justify-content-center">

                <Form.Group className="mb-3 ">
                    <Form.Group >
                        <Form.Label htmlFor="imageInput" style={{ cursor: "pointer" }}>
                            <IoIosImages className="text-primary" style={{ fontSize: "60px" }} />
                        </Form.Label>
                        <Form.Control type="file" id="imageInput" name="file" hidden onChange={(e) => handleChange(e)} accept="image/*" />
                    </Form.Group>
                </Form.Group>

            </Container>
            <Container >
                {fileName && <div className="d-flex align-items-center justify-content-center"> {fileName}</div>}
            </Container>
        </Container>

    </Container>;

    const container3 = <Container style={{ height: "275px" }}>

        <Form.Group className="mb-3">
            <Form.Label>Regular Size Price</Form.Label>
            <Form.Control type="number" value={formData.priceRegularSize || 0} onChange={handleChange} placeholder="Enter price for regular size" min={0} name="priceRegularSize" />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Medium Size Price</Form.Label>
            <Form.Control type="number" value={formData.priceMediumSize || 0} onChange={handleChange} placeholder="Enter price for Medium size" min={0} name="priceMediumSize" />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Large Size Price</Form.Label>
            <Form.Control type="number" value={formData.priceLargeSize || 0} onChange={handleChange} placeholder="Enter price for Large size" min={0} name="priceLargeSize" />
        </Form.Group>

    </Container>

    return (
        <Form className="mt-5 mb-4" >

            {(container == 1) ? container1 : (container == 2) ? container2 : container3}

        </Form>
    )


}