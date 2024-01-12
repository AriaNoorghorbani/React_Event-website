import { Link } from "react-router-dom"

export default function Events(){

 const DUMMY_PRODUCTS = [
        {id: 'p1', name: 'First Book'},
        {id: 'p2', name: 'Second Book'},
        {id: 'p3', name: 'Third Book'}]

    return <>
    <h1>Events</h1>
    <ul>{DUMMY_PRODUCTS.map(product => {
        return <li key={product.id}><Link to={product.id}>{product.name}</Link></li>
    })}</ul>
    </>
}