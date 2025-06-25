import { createContext, useEffect, useState } from "react";
import { MyOrderDataType, PizzaDataType, PizzasInCart, SidesInCart, User } from "./DataTypes";
import axios from "axios";



export let ctx=createContext<any>(null);

export default function FetchData(){
    const [data, setData] = useState<PizzaDataType[]>([]);
    const [reload,setReload]=useState<boolean>(true);
    //true for pizzza false for sides
    const [content, setContent] = useState(true);


    const handleReload=()=>{
        setReload(!reload);
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get("http://localhost:8080/pizzas");
            setData(res.data.data.pizzas);
          } catch (err:any) {
            
          }
        };
      
        fetchData();
      }, [reload]); // empty dependency array = run once on mount

      let initialPizzasInCart:PizzasInCart[];
      let initialSidesInCart:SidesInCart[];
      if((localStorage.getItem("pizzasInCart")!=null)){
        initialPizzasInCart=JSON.parse(localStorage.getItem("pizzasInCart")||"");
      }else{
        initialPizzasInCart=[];
      }
      const [pizzasInCart, setPizzasInCart] = useState<PizzasInCart[]>(initialPizzasInCart);

      if((localStorage.getItem("sidessInCart")!=null)){
        initialSidesInCart=JSON.parse(localStorage.getItem("sidessInCart")||"");
      }else{
        initialSidesInCart=[];
      }
      const [sidesInCart,setSidesInCart]=useState<SidesInCart[]>(initialSidesInCart);


      const changePizzasInCart=(newPizzasInCart:PizzasInCart[]):void=>{
        setPizzasInCart(newPizzasInCart);
        localStorage.setItem("pizzasInCart",JSON.stringify(newPizzasInCart));
      }

      const changeSidesInCart=(newSidesInCart:SidesInCart[]):void=>{
        setSidesInCart(newSidesInCart);
        localStorage.setItem("sidessInCart",JSON.stringify(newSidesInCart));
      }
      return {data, handleReload,pizzasInCart,sidesInCart,changeSidesInCart,changePizzasInCart,content,setContent};      

}




export const auth=()=>{
  const [user,setUser]=useState<User|null>(null);
  
  useEffect(() => {
    const authData = sessionStorage.getItem("auth");
    if (authData) {
      const parsed: User = JSON.parse(authData);
      setUser(parsed);
    }
  }, []);

  
  return {user,setUser}
}

export function Orders(){
  const[orders,setOrders]=useState<any>(null);

  return {orders,setOrders}
}
