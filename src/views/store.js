import { openModal } from "./modal";
import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";

/* === STORE === */

//funcion que se encarga de traer elementos y llamar al render
export const handleGetProductsToStore = ()=>{
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
};

//se encarga de filtrar y renderizar la sección con todos sus respectivos elementos
export const handleRenderList = (productosIn)=>{
    
    //filtrado de arrays por categoría
    const burgers = productosIn.filter((el) => el.categoria === "Hamburguesas");
    const papas = productosIn.filter((el) => el.categoria === "Papas");
    const gaseosas = productosIn.filter((el) => el.categoria === "Gaseosas");

    //renderiza los elementos de la sección
    const renderProductGroup = (productos, title)=>{
        console.log(productos);
        if(productos.length>0){
            const productosHTML = productos.map((producto, index)=>{
                return `
                <div class='containerTargetItem' id='product-${producto.categoria}-${index}'>
                    <div>
                        <img src='${producto.imagen}'/>
                        <div class='productName'>
                            <h2>${producto.nombre}</h2>
                        </div>
                        <div class='targetProps'>
                            <p><b >Precio:</b> $${producto.precio}</p>
                        </div>
                    </div>
                </div>`;
            });
            
            //retorna la sección con todos los elementos dentro
            return `
            <section class='sectionStore'>
                <div class='containerTitleSection'>
                    <h3>${title}</h3>
                </div>
                <div class='containerProductStore'>
                    ${productosHTML.join("")}
                </div>
            </section>`;
        
        }else{
            return "";
        }
    };

    //renderizar cada uno de los productos dentro de su categoría
    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
        ${renderProductGroup(burgers, "Hamburguesas")}
        ${renderProductGroup(papas, "Papas")}
        ${renderProductGroup(gaseosas, "Gaseosas")}
    `;

    //añaden los eventos de manera dinámica
    const addEvents = (productsIn)=>{
        if(productsIn){
        productsIn.forEach((element, index)=>{
            const productContainer = document.getElementById(`product-${element.categoria}-${index}`);
                productContainer.addEventListener('click', ()=>{
                    setProductoActivo(element);
                    openModal();
                });
        });
        }
    };

    addEvents(burgers);
    addEvents(papas);
    addEvents(gaseosas);
};