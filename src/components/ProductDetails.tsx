import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from 'react-router-dom';
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from '../services/ProductService';

type ProductDetailsProps = {
    product: Product
}

export async function action({params}: ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteProduct(+params.id);
        return redirect('/');
    }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const isAvailable = product.availability;

    const fetcher = useFetcher();
    const navigate = useNavigate();

  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(+product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method='POST'>
                <button
                    type='submit'
                    name='id'
                    value={product.id}
                    className={`${isAvailable ? 'text-black' : 'text-red-600'}
                    rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover: cursor-pointer`}
                >
                    {isAvailable ? 'Disponible' : 'No disponible' }
                </button>
            </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 items-center">
                <button 
                    className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-center text-xs hover: cursor-pointer'
                    onClick={() => navigate(`products/${product.id}/edit`, {
                        state: {
                            product
                        }
                    })}
                >Editar</button>
                
                <Form className='w-full'
                    method='POST'
                    action={`products/${product.id}/delete`}
                    onSubmit={ e => {
                        if(!confirm('Eliminar?')) {
                            e.preventDefault();
                        }
                    }}
                >                    
                    <input
                        type='submit'
                        className='bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-center text-xs hover: cursor-pointer'
                        value='Eliminar'
                    />
                </Form>


            </div>
        </td>
    </tr> 
  )
}
