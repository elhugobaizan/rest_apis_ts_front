import { safeParse } from "valibot";
import axios from "axios";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import { toBoolean } from "../utils";

const API_URL = import.meta.env.DEV ? 'http://localhost:4000' : 'https://rest-apis-ts-server-0bc7.onrender.com';
type ProductData = {
    [k: string]: FormDataEntryValue
}

export async function addProduct(formData: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: formData.name,
            price: +formData.price
        })
        if(result.success) {
            const url = `${API_URL}/api/products`;
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            });
        } else {
            throw new Error('Datos no validos');
        }     
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${API_URL}/api/products`;
        const { data } = await axios.get(url);
        const result = safeParse(ProductsSchema, data.data);
        if(result.success) {
            return result.output;
        }
    } catch (error) {
        console.log(error)        
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const url = `${API_URL}/api/products/${id}`;
        const { data } = await axios.get(url);
        const result = safeParse(ProductSchema, data.data);
        if(result.success) {
            return result.output;
        }
    } catch (error) {
        console.log(error)        
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: data.price,
            availability: toBoolean(data.availability.toString())
        });
        if(result.success) {
            const url = `${API_URL}/api/products/${id}`;
            await axios.put(url, result.output);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${API_URL}/api/products/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.log(error);
    }
}

export async function updateAvailability(id: Product['id']) {
    try {
        const url = `${API_URL}/api/products/${id}`;
        await axios.patch(url);
    } catch (error) {
        console.log(error);
    }
}