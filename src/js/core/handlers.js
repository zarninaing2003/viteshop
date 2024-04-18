import { createProduct, productRender } from "./product.js";
import { addRecordQuantity, createRecord, deleteRecord, subRecordQuantity, updateRecord, updateRecordTotal } from "./record.js";
import { createForm, inventorySheet, newProductCreateForm, productGroup, productSelect, recordTotal, rowGroup } from "./selectors.js";
import products from "./variables.js";

 export const createFormHandler = (e) => {
    e.preventDefault();

//   Data
    const  formData =  new FormData(createForm);
    const currentProductId = parseInt(formData.get("productSelect"));
    const currentProduct =  products.find(el =>el.id  === currentProductId);
    const currentQuantity  = parseInt(formData.get("inputQuantity"));

    // is existed row
    const isExistedRow  = rowGroup.querySelector(`[row-product-id='${currentProductId}']`) ;
    // console.log(isExistedRow);

    if(isExistedRow){
    //  const currentQuantityElement = isExistedRow.querySelector(".row-quantity");
    //  const currentCost  = isExistedRow.querySelector(".row-cost");
    //  const currentPrice  = isExistedRow.querySelector(".row-product-price");
     
    //  currentQuantityElement.innerText = parseInt(currentQuantityElement.innerText) +currentQuantity;
    //  currentCost.innerText  =  currentPrice.innerText * currentQuantityElement.innerText;
        updateRecord(isExistedRow.getAttribute("row-product-id"),currentQuantity);
    }else{
        // append row to data
            rowGroup.append(createRecord(currentProduct,currentQuantity))
        }
        
        // calculate total
        // updateRecordTotal();
        createForm.reset();
 }

export const rowGroupHandler  = (event) => {
    if(event.target.classList.contains("row-del-btn")){
        deleteRecord(event);
    }else if(event.target.classList.contains("row-q-add")){
        // addRecordQuantity(event);
        updateRecord(event.target.closest(".row").getAttribute("row-product-id"), 1);
    }else if(event.target.classList.contains("row-q-sub")){
        // subRecordQuantity(event);
        updateRecord(event.target.closest(".row").getAttribute("row-product-id"), -1);

    };
    // console.log("U del btn");
}


export const manageInventoryBtnHandler  = () => {
    // console.log("U click");
    inventorySheet.classList.toggle("-translate-x-full");
}

export const newProductCreateFormHandler  = (event) => {
    event.preventDefault();

    const formData = new FormData(newProductCreateForm);
    const newProduct  = {
        id: Date.now(),
        name:formData.get("new_product_name"),
        price:formData.get("new_product_price"),
    }

    productGroup.append(createProduct(newProduct));
    productSelect.append(new Option(newProduct.name,newProduct.id));
    products.push(newProduct);
    productRender(products);
    newProductCreateForm.reset();
    // console.log("U submit");    
}


export const printBtnHandler =  () => {
    window.print();
}

