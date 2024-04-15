export default function Boton({texto, hacerClick}){
    return(
        <button className="btn btn-success mb-2" onClick={hacerClick}>{texto}</button>
    )
}