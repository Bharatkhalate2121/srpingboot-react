
import { Navbar, Container, Nav } from "react-bootstrap";
import { MdOutlineFastfood } from "react-icons/md";
import { LiaPizzaSliceSolid } from "react-icons/lia";
import "@fontsource/permanent-marker"
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ctx } from "../Utils/FetchData";




export default function Header() {
    const appContext = useContext(ctx);
    const navigate = useNavigate();

    const handleSidesClick = (e) => {
        appContext.setContent(false);
        navigate('/allpizzas');
    };

    const handleClick = (e) => {
        appContext.setContent(true);
        navigate('/allpizzas');
    };

    const handleLogOut = () => {
        appContext.setUser(null);
        sessionStorage.removeItem("auth");
    };




    const redirect = (e) => {
        (e.target.id == "home") ? navigate("/") : (e.target.id == "login") ? navigate('/login') : (e.target.id == "manage") ? navigate('/admin/manage') : (e.target.id == "order") ? navigate('/user/myorders'):(e.target.id == "viewAll") ? navigate('/admin/viewallorders') : "";
    }
    return (
        <>
            <Navbar className="d-flex justify-content-between" style={{ backgroundColor: "#870f19" }}>
                <Container className="d-flex justify-content-between" >
                    <Navbar.Brand id="home" onClick={redirect} className="d-flex " style={{ cursor: "pointer" }} ><MdOutlineFastfood className="fs-1 row text-white" />
                        <span className="fs-6 text-white mt-3 ms-3 font-poppins " style={{ fontFamily: 'Permanent Marker, cursive' }}>Pizza_Palace</span>
                        <LiaPizzaSliceSolid className="text-white" />
                    </Navbar.Brand>
                    <Navbar.Text>
                        <Nav className="me-auto text-white">
                            <Nav.Link className="text-white" id="home" onClick={redirect} >Home</Nav.Link>
                            <Nav.Link className="text-white" id="pizza" onClick={handleClick} >Pizza</Nav.Link>
                            <Nav.Link className="text-white" id="side" onClick={handleSidesClick}>Sides</Nav.Link>
                            {appContext.user != null && appContext.user.type == "admin" &&
                                <>  <Nav.Link className="text-white" id="manage" onClick={redirect}>ManagePizzas</Nav.Link>
                                    <Nav.Link className="text-white" id="viewAll" onClick={redirect}>View All Orders</Nav.Link>
                                </>
                            }
                            {appContext.user != null ?
                                <>
                                    <Nav.Link className="text-white" id="order" onClick={redirect}>My Orders</Nav.Link>
                                    <Nav.Link className="text-white" id="manage" onClick={handleLogOut}>Logout</Nav.Link> </> :
                                <Nav.Link className="text-white" id="login" onClick={redirect}>Login</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Text>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}