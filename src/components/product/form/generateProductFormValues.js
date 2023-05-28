export const generateProductFormValues = (selectedFormValue) => {
    return {
        name: {
            value: selectedFormValue?.name || "",
            required: true,
            error: "",
            validateInput: (name) => 
            name.length >1 ? null : "name should have at least 2 characters"
        },
        description: {
            value: selectedFormValue?.description || "",
            required: true,
            error: "",
            validateInput: (description) => 
            description.length > 1
            ? null: " description should have at least 2  characters",
        },
        category: {
            value: selectedFormValue?.category || "",
            required: true,
            error: "",
            validateInput: (category) => 
            category.length > 1
            ? null: " category should have at least 2 characters",
        },
        brand: {
            value: selectedFormValue?.brand || "",
            required: true,
            error: "",
            validateInput: (brand) => 
            brand.length > 1
            ? null: " brand should have at least 2 characters",
        },
        price: {
            value: selectedFormValue?.price || "",
            required: true,
            error: "",
            validateInput: (price) => 
            price.length > 1
            ? null: " price should have at least 2 characters",
        },
        
    }
}