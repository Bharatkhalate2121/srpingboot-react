import { useState } from "react";
import { Crust, Sides, Topping } from "./DataTypes";

export default function Data() {
    //0 for all, 1 for veg and 2 for nonveg
    const [type, setType] = useState(0);
    const [topping, setTopping] = useState<Topping[] | null>([
        {
            toppingId: 1,
            name: "Panner",
            type: "Veg",
            toppingPrice: 35,
            available: true
        },
        {
            toppingId: 2,
            name: "Black Olive",
            type: "Veg",
            toppingPrice: 20,
            available: true
        },
        {
            toppingId: 3,
            name: "Capsicum",
            type: "Veg",
            toppingPrice: 25,
            available: true
        },
        {
            toppingId: 4,
            name: "Mushroom",
            type: "Veg",
            toppingPrice: 30,
            available: true
        },
        {
            toppingId: 5,
            name: "Fresh Tomato",
            type: "Veg",
            toppingPrice: 10,
            available: true
        },
        {
            toppingId: 6,
            name: "Chiken Tikka",
            type: "Non Veg",
            toppingPrice: 35,
            available: true
        },
        {
            toppingId: 7,
            name: "Barbeque Chiken",
            type: "Non Veg",
            toppingPrice: 45,
            available: true
        },
        {
            toppingId: 8,
            name: "Grilled Chiken",
            type: "Non Veg",
            toppingPrice: 40,
            available: true
        }
    ])

    const [sides, setSides] = useState<Sides[] | null>([
        {
            sidesId: 1,
            name: "Cold Drink",
            price: 55,
            available: true
        },
        {
            sidesId: 2,
            name: "Mousse Cake",
            price: 90,
            available: true
        }
    ])

    const [crust, setCrust] = useState<Crust[] | null>([
        {
            crustId: 1,
            name: "New hand-tossed"
        },
        {
            crustId: 2,
            name: "Wheat thin-crust"
        },
        {
            crustId: 3,
            name: "Cheese Burst"
        },
        {
            crustId: 4,
            name: "Fresh pan pizza"
        }

    ])


    return { sides, topping, crust, type, setType }
}



