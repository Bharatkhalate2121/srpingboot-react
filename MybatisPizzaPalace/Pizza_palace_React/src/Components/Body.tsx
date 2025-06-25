

import React, { useContext, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FaLeaf, FaShippingFast, FaRegClock, FaStar, FaFire } from "react-icons/fa";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { ctx } from "../Utils/FetchData";

const carouselImages = [
    "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg",
    "https://tinyurl.com/pizza-002",
    "https://rp-media.faasos.io/catalog/images/PYHHZVOHFW6U.jpeg?d=375&tr=w-0.5,h-0.5",
    "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
    "https://rp-media.faasos.io/catalog/images/FMKFIW428CNP.jpeg?d=375&tr=w-0.5,h-0.5",
    "https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2024-11/Personal-Pan-Pizzas_Product_HOR_BOTW_088.jpg?itok=W5fDm-Yb"
];

// Custom arrow buttons



const featureList = [
    { icon: <FaLeaf />, label: "Fresh Ingredients" },
    { icon: <FaShippingFast />, label: "Fast Delivery" },
    { icon: <FaRegClock />, label: "24/7 Service" },
    { icon: <FaStar />, label: "Top Rated" },
    { icon: <FaFire />, label: "Hot Deals" }
];

const Body = () => {

    
    const navigate=useNavigate();
    const appCtx = useContext(ctx);


    const handleVegClick = (e) => {
        appCtx.setType(1);
        navigate('/allpizzas'); 
             
    };

    const handleNonVegClick = (e) => {
        appCtx.setType(2)        
        navigate('/allpizzas'); 
    };


    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 }
            }
        ]
    };


    return (
        <Container fluid className="p-3">
            {/* Carousel Section */}
            <Slider {...settings} className="mb-4 px-4">
                {carouselImages.map((img, idx) => (
                    <div key={idx}>
                        <Card className="m-2 shadow">
                            <Card.Img src={img} style={{ height: "250px", objectFit: "cover" }} />
                        </Card>
                    </div>
                ))}
            </Slider>

            {/* Feature Section */}
            <Row className="text-center justify-content-center my-4 gap-3">
                {featureList.map((feat, index) => (
                    <Col key={index} xs={6} sm={4} md={2}>
                        <motion.div
                            className="p-3 rounded bg-light shadow-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="fs-3 text-danger">{feat.icon}</div>
                            <div className="mt-2 fw-bold">{feat.label}</div>
                        </motion.div>
                    </Col>
                ))}
            </Row>

            <Container className="my-4">
                <Row className="justify-content-center">
                    <Col md={4} className="mb-4">
                        <Card className="shadow" id="veg" onClick={handleVegClick} style={{cursor:"pointer"}}>
                            <Card.Img
                                variant="top"
                                src="https://tinyurl.com/pizza-002"
                                style={{ height: '200px', objectFit: 'cover' }}
                                id="veg"
                            />
                            <Card.Body id="veg">
                                <Card.Title id="veg">Veg Pizza</Card.Title>
                                <Card.Text id="veg">Delicious vegetarian pizzas loaded with farm-fresh toppings.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} className="mb-4">
                        <Card className="shadow" id="nonVeg" onClick={handleNonVegClick}>
                            <Card.Img
                                variant="top"
                                src="https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2024-11/Personal-Pan-Pizzas_Product_HOR_BOTW_088.jpg?itok=W5fDm-Yb"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>Non-Veg Pizza</Card.Title>
                                <Card.Text>Meaty and mouthwatering non-veg pizzas made for indulgence.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default Body;
