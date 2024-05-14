import { CartItem } from "../interfaces/interfaces";

    
export function addCartItem(uid: number, pid: number, quantity: number, cart: CartItem[], setCart: Function) {
    fetch(`http://localhost:3000/cart_items/${uid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "pid": pid, "quantity": quantity })
    })
    .then(res => res.json())
    .then(data => {setCart([...cart.filter(i => i.pid !== pid), data.item])})
    .catch(err => console.log(err));
}


export function removeCartItem(uid: number, pid: number, cart: CartItem[], setCart: Function) {
    fetch(`http://localhost:3000/cart_items/${uid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "pid": pid})
    })
    .then(res => res.json())
    .then(() => setCart([...cart.filter(i => i.pid !== pid)]))
    .catch(err => console.log(err));
}
 
 
export function updateCartItem(uid: number, pid: number, quantity: number, cart: CartItem[], setCart: Function) {
    fetch(`http://localhost:3000/cart_items/${uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "pid": pid, "quantity": quantity })
    })
    .then(res => res.json())
    .then(data => setCart([...cart.filter(i => i.pid !== pid), data.item]))
    .catch(err => console.log(err));
}