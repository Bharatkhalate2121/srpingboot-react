import { Link } from "react-router-dom";
import { Ban } from "lucide-react"; // Optional: You can change the icon
import { Container } from "react-bootstrap";

export default function NothingHere() {
    return (
        <Container className="flex flex-col items-center justify-center w-full h-100  text-center ">
            <Ban className="w-20 h-20 text-red-500 mb-4" />
            <h1 className="text-4xl font-bold mb-2 text-gray-800">Oops! Nothing Here</h1>
            <p className="text-lg text-gray-500 mb-6">
                This is Empty.
            </p>
            <Link
                to="/"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
            >
                Go to Home
            </Link>
        </Container>


    );
}

