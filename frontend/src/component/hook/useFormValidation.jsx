import { useState } from "react";

/**
 * Custom Hook for form validation.
 * @param {Object} initialValues - Initial state values.
 * @param {Object} validationRules - Validation rules for each field.
 */
const useFormValidation = (initialValues, validationRules) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });

        if (validationRules[name]) {
            const errorMessage = validationRules[name](value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: errorMessage || null,
            }));
        }
    };

    // Handle image upload validation
    const validateImageUpload = (e) => {
        const files = Array.from(e.target.files);
        let newErrors = "";

        if (files.length === 0) {
            newErrors = "Please upload at least one image.";
        } else {
            for (let file of files) {
                const allowedExtensions = [".webp", ".jpeg", ".jpg", ".JPEG", ".JPG"];
                if (!allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
                    newErrors = "Only .webp, .jpeg, and .jpg images are allowed.";
                    break;
                }
            }
        }

        setValues({ ...values, images: files });
        setErrors((prevErrors) => ({ ...prevErrors, images: newErrors }));
    };

    // Validate all fields before submitting
    const validateForm = () => {
        let newErrors = {};
        Object.keys(validationRules).forEach((field) => {
            const errorMessage = validationRules[field](values[field]);
            if (errorMessage) {
                newErrors[field] = errorMessage;
            }
        });

        // Check image validation
        if (!values.images || values.images.length === 0) {
            newErrors["images"] = "Please upload at least one .webp image.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return {
        values,
        setValues,
        errors,
        handleChange,
        validateImageUpload,
        validateForm,
    };
};

export default useFormValidation;
