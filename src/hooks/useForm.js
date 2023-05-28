import React, {useState} from "react";

export const useForm =({defaultFormValue})=>{
const[formValues,setFormValues]= useState(defaultFormValue);
const onFormChange = (e) => {
    const{name,value} =e.target;
    const{validateInput}=formValues[name] ;
    setFormValues((prevFormValues)=>{
        return {
            ...prevFormValues,
            [name]:{
                ...prevFormValues[name],
                value,
                error:validateInput ? validateInput(value): undefined,
            },
        };
    });
 };

const clearForm =(obj)=>{
    setFormValues(obj);
} ;
return {
    formValues,
    onFormChange,
    clearForm,
    setFormValues,
}
};
const x ={
    email: {
        value: "",
        required: true,
        error:null,
        validateInput:(email)=>
        email.includes("@gmail.com") ? "" : "email is not valid",
    },
    password: {
        value: "",
        required: true,
        error:null,
        validateInput:(password)=>
        password.length >6 ? "": "password should have at least 6 characters"
    },
};