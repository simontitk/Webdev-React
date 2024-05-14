
export interface Category {
    id: number,
    name: string,
    description: string
}


export interface Product {
    id: number,
    name: string,
    brand: string,
    description: string,
    picture_uri: string,
    volume: number,
    amount: number,
    rating: number,
    price: number,
    discounted: boolean,
    categories: Category[] 
    // API does not return categories for products within orders !
}


export interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    city: string,
    street: string,
    password: string,
    payment_method: string
}


export interface OrderProducts {
    oid: number,
    pid: number,
    quantity: number,
    product: Product
}


export interface Order {
    id: number,
    total_price: number,
    order_date: string,
    uid: number,
    user: User,
    products: OrderProducts[]
}


export interface CartItem {
    pid: number,
    quantity: number,
    product: Product
}