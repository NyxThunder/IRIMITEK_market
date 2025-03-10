import { useState } from "react";

/**
 * Custom Hook for form validation.
 * @param {Object} initialValues - Initial state values.
 * @param {Object} validationRules - Validation rules for each field.
 * @param {Object} config - Configuration options (e.g., enable/disable image validation)
 */
const useFormValidation = (initialValues, validationRules, config = {}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));

        // Validate field only if form was already submitted
        if (isSubmitted) {
            validateField(name, value);
        }
    };

    // Validate a single field
    const validateField = (name, value) => {
        if (validationRules[name]) {
            const errorMessage = validationRules[name](value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: errorMessage || null,
            }));
        }
    };

    // Handle image upload validation (if enabled)
    const validateImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        let newErrors = "";

        if (config.imageValidation !== false) { // Allow skipping image validation if needed
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
        }

        // Convert images to Base64
        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result); // Converts to Base64
                reader.onerror = (error) => reject(error);
            });
        };

        try {
            const base64Images = await Promise.all(files.map(file => convertToBase64(file)));
            setValues((prevValues) => ({
                ...prevValues,
                images: base64Images, // Store images properly
            }));
            setErrors((prevErrors) => ({ ...prevErrors, images: newErrors }));
        } catch (error) {
            console.error("Image conversion error:", error);
        }
    };

    // Validate all fields before submitting
    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        Object.keys(validationRules).forEach((field) => {
            const errorMessage = validationRules[field](values[field]);
            if (errorMessage) {
                newErrors[field] = errorMessage;
                isValid = false;
            }
        });

        // **Only validate images if image validation is enabled**
        if (config.imageValidation !== false) {
            if (!values.images || values.images.length === 0) {
                newErrors["images"] = "Please upload at least one image.";
                isValid = false;
            }
        }

        setErrors(newErrors);
        setIsSubmitted(true);
        return isValid;
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
