import React from 'react';
import { useFormik } from 'formik';
import './gist.css'


const MyForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            rollNo: '',
            email: '',
            subjects: {
                'DBMS': '',
                'OS': '',
                'TOC': '',
                'CN': '',
            },
        },
        validate: (values) => {
            const errors = {};

            // Validate that name, rollNo, and email are not empty
            if (!values.name) {
                errors.name = 'Name is required';
            }
            if (!values.rollNo) {
                errors.rollNo = 'Roll Number is required';
            }
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            // Validate that each subject has a selected teacher
            Object.keys(values.subjects).forEach((subject) => {
                if (!values.subjects[subject]) {
                    errors.subjects = errors.subjects || {};
                    errors.subjects[subject] = 'Please select a teacher';
                }
            });

            return errors;
        },
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={`form-group ${formik.touched.name && formik.errors.name ? 'error' : ''}`}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className="error-box">
                        <div className="error">{formik.errors.name}</div>
                    </div>
                ) : null}
            </div>

            <div className={`form-group ${formik.touched.rollNo && formik.errors.rollNo ? 'error' : ''}`}>
                <label htmlFor="rollNo">Roll Number:</label>
                <input
                    type="text"
                    id="rollNo"
                    name="rollNo"
                    onChange={formik.handleChange}
                    value={formik.values.rollNo}
                />
                {formik.touched.rollNo && formik.errors.rollNo ? (
                    <div className="error-box">
                        <div className="error">{formik.errors.rollNo}</div>
                    </div>
                ) : null}
            </div>

            <div className={`form-group ${formik.touched.email && formik.errors.email ? 'error' : ''}`}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error-box">
                        <div className="error">{formik.errors.email}</div>
                    </div>
                ) : null}
            </div>

            <div className={`form-group ${formik.touched.subjects && formik.errors.subjects ? 'error' : ''}`}>
                <p>Subjects:</p>
                {Object.keys(formik.values.subjects).map((subject) => (
                    <div key={subject}>
                        <label htmlFor={`subjects.${subject}`}>{subject}:</label>
                        <select
                            id={`subjects.${subject}`}
                            name={`subjects.${subject}`}
                            onChange={formik.handleChange}
                            value={formik.values.subjects[subject]}
                        >
                            <option value="">Select a teacher</option>
                            <option value="Teacher 1">Teacher 1</option>
                            <option value="Teacher 2">Teacher 2</option>
                            <option value="Teacher 3">Teacher 3</option>
                            <option value="Teacher 4">Teacher 4</option>
                        </select>
                        {formik.touched.subjects && formik.errors.subjects && formik.errors.subjects[subject] ? (
                            <div className="error-box">
                                <div className="error">{formik.errors.subjects[subject]}</div>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default MyForm;