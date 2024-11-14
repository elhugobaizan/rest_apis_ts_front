import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Products, { action as productsAction, loader as productsLoader } from './views/Products';
import NewProduct, { action as newProductAction } from './views/NewProduct';
import EditProduct, { action as editProductAction, loader as editProductLoader } from './views/EditProduct';
import { action as deleteProductAction } from './components/ProductDetails';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: productsAction
            },
            {
                path: 'products/new',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'products/:id/edit',  //ROA pattern - Resource Oriented design
                element: <EditProduct />,
                action: editProductAction,
                loader: editProductLoader
            },
            {
                path: 'products/:id/delete',
                action: deleteProductAction
            }
        ]
    }
]);