import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-5 text-light" style={{ backgroundColor: "#870f19" }}>
      <Container fluid className="py-4 px-5">
        <Row>
          {/* Brand */}
          <Col md={4} className="mb-3">
            <h4>🍕 Pizza Palace</h4>
            <p>Delivering hot and fresh pizzas straight to your door. Taste the tradition.</p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Home</a></li>
              <li><a href="#" className="footer-link">Menu</a></li>
              <li><a href="#" className="footer-link">About</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
            </ul>
          </Col>

          {/* Socials */}
          <Col md={4} className="mb-3">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3 fs-5">
              <a href="#" className="text-light"><FaFacebookF /></a>
              <a href="#" className="text-light"><FaInstagram /></a>
              <a href="#" className="text-light"><FaTwitter /></a>
              <a href="#" className="text-light"><FaYoutube /></a>
            </div>
          </Col>
        </Row>

        <hr className="border-light" />

        <Row className="text-center">
          <Col>
            <p className="mb-0">© {new Date().getFullYear()} Pizza Palace. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
