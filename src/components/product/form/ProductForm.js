import React,{useEffect, useState} from 'react';
import { useForm } from '../../../hooks';
import { Button,FormContainer, Input } from '../../atoms';
import { generateProductFormValues } from './generateProductFormValues';
import FileBase from "react-file-base64";
import { useProduct } from '../../../hooks/useProduct';


export const ProductForm = () => {
    const {formValues:ProductFormValues, onFormChange:onProductFormChange, setFormValues} =useForm({defaultFormValue:generateProductFormValues()})

    const {saveProduct, selectedProduct}= useProduct();
    const [image, setImage] = useState("");
    useEffect(()=>{
      if(selectedProduct) {
        setFormValues(generateProductFormValues(selectedProduct));
        setImage(selectedProduct?.image)
      }
    },[selectedProduct]);
    const onSave=()=>{
        const name = ProductFormValues.name.value;
        const description = ProductFormValues.description.value;
        const brand = ProductFormValues.brand.value;
        const category = ProductFormValues.category.value;
        const price = ProductFormValues.price.value;
        saveProduct({
          product:{name,description,brand,category,price,image},
          isUpdating: !!selectedProduct,
          id: selectedProduct._id,        })
    }
  return (
    <FormContainer>
        <Input name="name" value={ProductFormValues.name.value} onChange={onProductFormChange} error={ProductFormValues.name.error} label="Product name"/>
        <Input name="description" value={ProductFormValues.description.value} onChange={onProductFormChange} error={ProductFormValues.description.error} label="Product description"/>
        <Input name="category" value={ProductFormValues.category.value} onChange={onProductFormChange} error={ProductFormValues.category.error} label="Product category"/>
        <Input name="brand" value={ProductFormValues.brand.value} onChange={onProductFormChange} error={ProductFormValues.brand.error} label="Product brand"/>
        <Input name="price" value={ProductFormValues.price.value} onChange={onProductFormChange} error={ProductFormValues.price.error} label="Product price"/>
        <FileBase type = "file" multiple={false} onDone={({base64}) => {
            setImage(base64)
        }}/>
        <Button onClick={onSave}>save product</Button>
        </FormContainer>
  )
}

