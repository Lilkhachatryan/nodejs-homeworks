import React from "react";
import PropTypes from "prop-types"
import { Field, ErrorMessage } from "formik";

const Input = ({
                   id,
                   name,
                   className,
                   label,
                   ...rest
               }) => {

    const classes = () => {
        return (
            {
                radio: 'form-check-input',
                checkbox: 'form-check-input'
            }[rest.type] || 'form-control'
        )
    };

    return (
        <>
            <label htmlFor={rest.type === 'radio' ? id : name}>{label}</label>
            <Field name={name}
                   className={classes()}
                   id={id}
                   {...rest} />
            <ErrorMessage component="div"
                          name={name}
                          className="text-error"/>
        </>
    )
};

Input.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    value: PropTypes.any,
    type: PropTypes.string,
    className: PropTypes.string,
    rows: PropTypes.number
};

export default Input;
