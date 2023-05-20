import React, { useEffect, useRef, useState } from "react";


const Form = ({ fields, onSubmit, btnName }) => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateFields(fields, formValues);
    if (Object.keys(errors).length === 0) {
      onSubmit(formValues);
    } else {
      setFormErrors(errors);
    }
  };

  const validateFields = (fields, values) => {
    const errors = {};
    fields.forEach((field) => {
      if (field.required && !values[field.name]) {
        errors[field.name] = `${field.label} is required`;
      } else if (field.validate && !field.validate.test(values[field.name])) {
        errors[field.name] = field.validateMessage || "Invalid format";
      }
    });
    return errors;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="register-form"
      id="login-form"
      autoComplete="off"
    >
      {fields.map((field, i) => {
        return (
          <div className="form-group" key={i}>
            <label>
              <i className={field.icon}></i>
            </label>
            {(field.type === "text" ||
              field.type === "password" ||
              field.type === "email" ||
              field.type === "file" ||
              field.type === "date") && (
              <input
                type={field.type}
                name={field.name}
                value={formValues[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                ref={i === 0 ? firstInputRef : null}
              />
            )}
            {field.type === "select" && (
              <select
                name={field.name}
                value={formValues[field.name] || ""}
                onChange={handleChange}
              >
                {field.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            {formErrors[field.name] && (
              <span style={{ color: "red" }}>{formErrors[field.name]}</span>
            )}
          </div>
        );
      })}
      <div className="form-group form-button">
        <input type="submit" className="form-submit" value={btnName} />
      </div>
    </form>
  );
};

export default Form;
