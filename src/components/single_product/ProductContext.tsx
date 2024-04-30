import { createContext } from "react"
import { Product } from "../../interfaces/interfaces"


export const ProductContext = createContext<Product | null>(null)