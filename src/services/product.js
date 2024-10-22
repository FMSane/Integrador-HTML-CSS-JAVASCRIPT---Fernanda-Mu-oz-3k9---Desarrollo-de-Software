//==== PRODUCTOS ====

import Swal from "sweetalert2";
import { closeModal } from "../views/modal";
import { handleGetProductLocalStorage, setInLocalStorage } from "../persistence/localStorage";
import { handleGetProductsToStore, handleRenderList } from "../views/store";
import { productoActivo } from "../../main";


// === PRODUCT ===

// Guardar o modificar elementos
const acceptButton = document.getElementById("acceptButton");
acceptButton.addEventListener('click', ()=>{
    handleSaveOrModifyElements();
});

const handleSaveOrModifyElements = ()=>{
    const nombre = document.getElementById("nombre").value,
          imagen = document.getElementById("img").value,
          precio = document.getElementById("precio").value,
          categoria = document.getElementById("categoria").value;
    
    let object = null;

    if(productoActivo){
        object = {
            ...productoActivo,
            nombre,
            imagen,
            precio,
            categoria,
        };
    }else{
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categoria,
        };

    }

    Swal.fire({
        title: "Correcto!",
        text: "Producto guardado correctamente",
        icon: "success"
      });

    setInLocalStorage(object);
    handleGetProductsToStore();
    closeModal();

};

//eliminar elemento

export const handleDeleteProduct = ()=>{

    Swal.fire({
        title: "¿Desea eliminar un elemento?",
        text: "Si lo elimina, será permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar."
      }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage();
            const result = products.filter((el)=> el.id !== productoActivo.id);
            //setear el nuevo array
            localStorage.setItem("products", JSON.stringify(result));
            const newProducts = handleGetProductLocalStorage();
            handleRenderList(newProducts);
            closeModal();
        }else{
            closeModal();
        }
      });

};