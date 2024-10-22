/* === POPUP === */

import { productoActivo, setProductoActivo } from "../../main";
import { handleDeleteProduct } from "../services/product";

const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener('click', ()=>{
    closeModal();
});

//FUNCIONES ABRIR Y CERRAR MODAL
export const openModal = ()=>{
    const modal = document.getElementById("modalPopUP");
    modal.style.display = "flex";
    const buttonDelete = document.getElementById("deleteButton");
    if(productoActivo){
        buttonDelete.style.display = "block";
    }else{
        buttonDelete.style.display = "none";
    }

    if(productoActivo){
        const nombre = document.getElementById("nombre"),
          imagen = document.getElementById("img"),
          precio = document.getElementById("precio"),
          categoria = document.getElementById("categoria");

          nombre.value = productoActivo.nombre;
          categoria.value = productoActivo.categoria;
          imagen.value = productoActivo.imagen;
          precio.value = productoActivo.precio;
    }
};

export const closeModal = ()=>{
    const modal = document.getElementById("modalPopUP");
    modal.style.display = "none";
    setProductoActivo(null);
    resetModal();
};

const resetModal = ()=>{
    const nombre = document.getElementById("nombre"),
          imagen = document.getElementById("img"),
          precio = document.getElementById("precio"),
          categoria = document.getElementById("categoria");

          nombre.value = "";
          categoria.value = "Seleccione una categoría";
          imagen.value = "";
          precio.value = 0;
};

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener('click', ()=>{
    handlebuttonDelete();
});

const handlebuttonDelete = ()=>{
handleDeleteProduct();
};