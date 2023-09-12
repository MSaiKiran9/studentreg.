import React from 'react';
import { useFormik } from 'formik';
import './gist.css'



const MyForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            rollNo: '',
            email: '',
            branch: '',
            subjects: {
                sub1: {
                    branch: '',
                    teacher: '',
                },
                sub2: {
                    branch: '',
                    teacher: '',
                },
                sub3: {
                    branch: '',
                    teacher: '',
                },
                sub4: {
                    branch: '',
                    teacher: '',
                },
            },
        },
        validate: (values) => {
            const errors = {};

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
            if (!values.branch) {
                errors.branch = 'Branch is required';
            }

            Object.keys(values.subjects).forEach((subject) => {
                if (!values.subjects[subject].branch) {
                    errors.subjects = errors.subjects || {};
                    errors.subjects[subject] = {
                        ...errors.subjects[subject],
                        branch: 'Branch is required',
                    };
                }
                if (!values.subjects[subject].teacher) {
                    errors.subjects = errors.subjects || {};
                    errors.subjects[subject] = {
                        ...errors.subjects[subject],
                        teacher: 'Teacher is required',
                    };
                }
            });

            return errors;
        },
        onSubmit: (values) => {
            if (values.rollNo.length != 10) {
                alert("Roll number can't be less than 10");
            }
            console.log(values);
        },
    });

    const branchOptions = ['CSE', 'IT', 'EEE', 'ECE', 'MECH'];

    const subjectOptions = {
        CSE: ['sub1', 'sub2', 'sub3', 'sub4'],
        IT: ['sub4', 'sub5', 'sub6', 'sub7'],
        EEE: ['sub8', 'sub9', 'sub10', 'sub11'],
        ECE: ['sub12', 'sub13', 'sub14', 'sub15'],
        MECH: ['sub16', 'sub17', 'sub18', 'sub19'],
    };

    const teacherOptions = {
        CSE: [
            'Dr. B.Sateesh Kumar (HOD)',
            'Dr. T.Venugopal',
            'Dr. S.Viswanadha Raju',
            'Sri. M.Uday Kumar',
            'Sri. P.Sreenivasa Rao',
            'Mr. O.Raju',
            'Mr. T.Venkatesh',
            'Mrs. A.Anusha',
        ],
        IT: ['Teacher IT1', 'Teacher IT2', 'Teacher IT3'],
        EEE: ['Teacher EEE1', 'Teacher EEE2', 'Teacher EEE3'],
        ECE: ['Teacher ECE1', 'Teacher ECE2', 'Teacher ECE3'],
        MECH: ['Teacher MECH1', 'Teacher MECH2', 'Teacher MECH3'],
    };

    const handleBranchChange = (event) => {
        const selectedBranch = event.target.value;
        formik.setFieldValue('branch', selectedBranch);

        Object.keys(formik.values.subjects).forEach((subject) => {
            formik.setFieldValue(`subjects.${subject}.branch`, '');
            formik.setFieldValue(`subjects.${subject}.teacher`, '');
        });
    };

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

            <div className={`form-group ${formik.touched.branch && formik.errors.branch ? 'error' : ''}`}>
                <label htmlFor="branch">Branch:</label>
                <select
                    id="branch"
                    name="branch"
                    onChange={handleBranchChange}
                    value={formik.values.branch}
                >
                    <option value="">Select a branch</option>
                    {branchOptions.map((branch) => (
                        <option key={branch} value={branch}>
                            {branch}
                        </option>
                    ))}
                </select>
                {formik.touched.branch && formik.errors.branch ? (
                    <div className="error-box">
                        <div className="error">{formik.errors.branch}</div>
                    </div>
                ) : null}
            </div>

            <div className={`form-group ${formik.touched.subjects && formik.errors.subjects ? 'error' : ''}`}>
                <p>Subjects:</p>
                {subjectOptions[formik.values.branch]?.map((subject) => (
                    <div key={subject}>
                        <label htmlFor={`subjects.${subject}.branch`}>{subject} Branch:</label>
                        <select
                            id={`subjects.${subject}.branch`}
                            name={`subjects.${subject}.branch`}
                            onChange={formik.handleChange}
                            value={formik.values.subjects[subject]?.branch || ''}
                        >
                            <option value="">Select a branch</option>
                            {branchOptions.map((branch) => (
                                <option key={branch} value={branch}>
                                    {branch}
                                </option>
                            ))}
                        </select>
                        {formik.touched.subjects &&
                            formik.errors.subjects &&
                            formik.errors.subjects[subject] &&
                            formik.errors.subjects[subject].branch ? (
                            <div className="error-box">
                                <div className="error">{formik.errors.subjects[subject].branch}</div>
                            </div>
                        ) : null}

                        <label htmlFor={`subjects.${subject}.teacher`}>Teacher:</label>
                        <select
                            id={`subjects.${subject}.teacher`}
                            name={`subjects.${subject}.teacher`}
                            onChange={formik.handleChange}
                            value={formik.values.subjects[subject]?.teacher || ''}
                        >
                            <option value="">Select a teacher</option>
                            {teacherOptions[formik.values.subjects[subject]?.branch]?.map((teacher) => (
                                <option key={teacher} value={teacher}>
                                    {teacher}
                                </option>
                            ))}
                        </select>
                        {formik.touched.subjects &&
                            formik.errors.subjects &&
                            formik.errors.subjects[subject] &&
                            formik.errors.subjects[subject].teacher ? (
                            <div className="error-box">
                                <div className="error">{formik.errors.subjects[subject].teacher}</div>
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