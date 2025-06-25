

export interface CreatePizza {
    name: string | null,
    type: string | null,
    imageUrl: null,
    description: string | null,
    priceRegularSize: number | null,
    priceMediumSize: number | null,
    priceLargeSize: number | null,
    file:File | null
}

export interface FormButtonDataType {
    container: number,
    setContainer: React.Dispatch<React.SetStateAction<number>>,
    formData: CreatePizza,
    setWarning: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    handleFormData: React.Dispatch<React.SetStateAction<CreatePizza>>
}


export interface PizzaDataType {
    pizzaId:number|null,
    name: string | null,
    type: string | null,
    imageUrl: null,
    description: string | null,
    priceRegularSize: number | null,
    priceMediumSize: number | null,
    priceLargeSize: number | null,
}


export interface PizzaDataType {
    pizzaId:number|null,
    name: string | null,
    type: string | null,
    imageUrl: null,
    description: string | null,
    priceRegularSize: number | null,
    priceMediumSize: number | null,
    priceLargeSize: number | null,
}


export interface Topping{
    toppingId:number|null,
    name:string|null,
    type:string|null,
    toppingPrice:number|null,
    available:boolean|null
}

export interface Sides{
    sidesId:number|null,
    name:string|null,
    price:number|null,
    available:boolean|null
}

export interface Crust{
    crustId:number|null,
    name:string|null,
}

export interface PizzasInCart{
    pizzaId:number,
    size:string,
    quantity:number,
    amount:number,
    crustId:number,
    toppingsId:number[],
}


export interface SidesInCart{
    sidesId:number,
    quantity:number,
    price:number,
}



export interface CreateOrderDataType{
    customerId:number,
    deliveryAddress:string,
    totalAmount:number,
    pizza:PizzasInCart[],
    sides:SidesInCart[],
}


export interface PizzasInOrder{
    pizzaId:number,
    size:string,
    quantity:number,
    subTotal:number,
    crustId:number,
    toppingsId:number[],
}


export interface SidesInOrder{
    sidesId:number,
    quantity:number,
   
}

export interface MyOrderDataType{
    orderId:number,
    status:string,
    orderTime:string,
    customerId:number,
    deliveryAddress:string,
    totalAmount:number,
    pizza:PizzasInOrder[],
    sides:SidesInOrder[],
}

export interface User{
    id:number,
    type:string,
    address:string
  }