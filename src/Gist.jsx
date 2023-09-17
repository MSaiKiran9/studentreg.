import React, { useState } from 'react';
import { useFormik } from 'formik';
import './gist.css'
const MyForm = () => {
    const [displayFormorSuccess, setDisplayFormorSuccess] = useState(0);
    const [trackError, setTrackError] = useState("");
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            rollNo: '',
            email: '',
            branch: '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Name is required';
            }
            if (!values.rollNo) {
                errors.rollNo = 'Roll Number is required';
            }
            else if (values.rollNo.length != 10) {
                errors.branch = "Roll number length must be 10";
            }
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.branch) {
                errors.branch = 'Branch is required';
            }
            // const selectedBranch = values.branch;
            // const selectedSubjects = subjectOptions[selectedBranch];

            // if (selectedSubjects) {
            //     selectedSubjects.forEach((subject) => {
            //         const subjectErrors = {};

            //         if (!values.subjects[subject]?.branch) {
            //             subjectErrors.branch = 'Branch is required';
            //         }

            //         if (!values.subjects[subject]?.teacher) {
            //             subjectErrors.teacher = 'Teacher is required';
            //         }

            //         if (Object.keys(subjectErrors).length > 0) {
            //             errors.subjects = errors.subjects || {};
            //             errors.subjects[subject] = subjectErrors;
            //         } else if (errors.subjects && errors.subjects[subject]) {
            //             // Clear errors for this subject if there are no errors
            //             delete errors.subjects[subject];
            //         }
            //     });
            // }
            // Object.keys(values.subjects).forEach((subject) => {
            //     if (!values.subjects[subject].branch) {
            //         errors.subjects = errors.subjects || {};
            //         errors.subjects[subject] = {
            //             ...errors.subjects[subject],
            //             branch: 'Branch is required',
            //         };
            //     } else if (errors.subjects && errors.subjects[subject]?.branch) {
            //         delete errors.subjects[subject].branch;
            //     }

            //     if (!values.subjects[subject].teacher) {
            //         errors.subjects = errors.subjects || {};
            //         errors.subjects[subject] = {
            //             ...errors.subjects[subject],
            //             teacher: 'Teacher is required',
            //         };
            //     } else if (errors.subjects && errors.subjects[subject]?.teacher) {
            //         delete errors.subjects[subject].teacher;
            //     }
            // });
            console.log(errors.subjects, errors);
            return errors;
        },
        onSubmit: (values) => {
            alert("submit page");
            console.log(values);
            const sendDataToServer = async (values) => {
                try {
                    const response = await fetch('http://localhost:3000/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values),
                    });

                    if (response.ok) {
                        console.log('Data sent successfully');
                        setDisplayFormorSuccess(1);
                        let data = await response.json();
                        console.log(data.message);
                        formik.resetForm();
                    } else {
                        console.error('Failed to send data');
                        setDisplayFormorSuccess(-1);
                    }
                } catch (error) {
                    alert(error);
                    console.log(error);
                    setDisplayFormorSuccess(-1);
                    setTrackError(prev => error.message);

                }
            };
            sendDataToServer(values);
        },
    });
    const branchOptions = ['CSE', 'IT', 'EEE', 'ECE', 'MECH'];
    const SubjectandTeacher = {
        'CSE': [['Digital Electronics', 'R.Rajender'], ['Data Structures', 'Dr. V.Kamakshi Prasad'], ['Computer Oriented Statistical Methods ', 'M.Maruthi'], ['Computer Organization and Architecture', 'P.Sreenivasa Rao'], ['Object Oriented Programming through Java', 'M.Uday Kumar (CSE)'], ['Data Structures Lab', 'Dr. B.Sateesh Kumar , P.Sreenivasa Rao & T.Venkatesh'], ['Object Oriented Programming through Java Lab', 'M.Uday Kumar, Dr. S.Vishwanadha Raju & O.Raju'], ['Data Visualization - R Programming / Power BI', 'T.Venkatesh'], ['Gender Sensitization Lab', 'G.Prashanth, Dr Ch.Jaiwanth Rao & K.Gouthami']],
        'IT': [['Digital Electronics', 'Dr. Srinivas.K'], ['Data Structures', 'Dr. S.Suresh Kumar'], ['Computer Oriented Statistical Methods', 'M.Maruthi'], ['Computer Organization and MicroProcessor', 'B.Madhukar'], ['Introduction to IOT', 'B.Rajesh'], ['Digital Electronics Lab', 'Dr. Srinivas.K,Dr. B.Prabhakar & M.Tirupathamma'], ['Data Structures Lab', 'Dr.S.Suresh Kumar & T.Rajashekar'], ['Internet Of Things Lab', 'B.Rajesh & B.Madhukar'], ['Data Visualization - R Programming / Power BI', 'Dr. S.Suresh Kumar & K.Vivek'], ['Gender Sensitization Lab', 'G.Prashanth']],
        'EEE': [['Numerical Methods and Complex Variables', 'M.Maruthi'], ['Electrical Machines-I', 'K.Dileep Kalyan'], ['Analog Electronic Circuits', 'N.Manoj'], ['Power System - I', 'P.Sangeetha'], ['Electro Magnetic Fields', 'K.Prashanth'], ['Electrical Machines Laboratory-I', 'S.Jagadeesh Kumar & Dileep Kalyan'], ['Analog Electronics Circuits Laboratory', 'Dr. Srinivas K & Dr. B.Prabhakar'], ['Electrical Simulation tools Laboratory', 'Jayanth & Prashanth'], ['Gender sensitization Laboratory', 'Dr. Jaiwanth Rao']],
        'ECE': [['Numerical Methods and Complex Variables', 'Dr. P.Vinod Kumar '], ['Analog Circuits', 'Dr. B.Prabhakar'], ['Network Analysis and Synthesis', 'G. Sujatha'], ['Digital Logic Design', 'S.Praveen Kumar'], ['Signals and Systems', 'M.Tirupathamma'], ['Analog Circuits Laboratory', 'M.Srinivas'], ['Digital Logic Design Laboratory', 'S.Praveen Kumar & R.Rajender'], ['Basic Simulation Laboratory', 'M. Tirupathamma & G.Sujatha'], ['Constitution Of India', 'Dr. Ch.Jaiwanth Rao']],
        'MECH': [['Probability , Statistics & complex Variables', 'Dr.P. Vinod Kumar'], ['Mechanics Of Solids', 'Dr. Suresh Arjula'], ['Metallurgy & Material Science', 'S.Vijay Mohan'], ['Production Technology', 'K.Grace Prashanthi'], ['Thermodynamics', 'C.Shivaraj'], ['Production Technology Laboratory', 'M.SriKanth & K.Graceprashanthi'], ['Material Science & Mechanics Of Solids Laboratory', 'Dr. Suresh Arjula & N.Balakrishna'], ['Computer Aided Machine Drawing', 'Dr. Suresh Arjula & B.Narsaiah'], ['Constitution Of India', 'V.Rakesh Kumar']]
    }
    const handleBranchChange = (event) => {
        const selectedBranch = event.target.value;
        formik.setFieldValue('branch', selectedBranch);
        Object.keys(formik.values.subjects).forEach((subject) => {
            formik.setFieldValue(`subjects.${subject}.branch`, '');
            formik.setFieldValue(`subjects.${subject}.teacher`, '');
        });

    };
    console.log(displayFormorSuccess);
    return (
        displayFormorSuccess == 0 ? <form onSubmit={formik.handleSubmit}>
            <h1 id='main-heading'>2-1 : Selected</h1>
            <div className={`form-group ${formik.touched.branch && formik.errors.branch ? 'error' : ''}`}>
                <label id='branch-main-1' htmlFor="branch">Select your Branch:</label>
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
            <div className={`form-group ${formik.touched.name && formik.errors.name ? 'error' : ''}`}>
                <label id='label-items' htmlFor="name">Fill Your Personal Data:<br /><br />Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onKeyDown={handleKeyPress}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className="error-box">
                        <div className="error">{formik.errors.name}</div>
                    </div>
                ) : null}
            </div>
            <div className={`form-group ${formik.touched.rollNo && formik.errors.rollNo ? 'error' : ''}`}>
                <label id='label-items' htmlFor="rollNo">Roll Number:</label>
                <input
                    type="text"
                    id="rollNo"
                    name="rollNo"
                    onChange={formik.handleChange}
                    value={formik.values.rollNo}
                    onKeyDown={handleKeyPress}
                />
                {formik.touched.rollNo && formik.errors.rollNo ? (
                    <div className="error-box">
                        <div className="error">{formik.errors.rollNo}</div>
                    </div>
                ) : null}
            </div>
            <div className={`form-group ${formik.touched.email && formik.errors.email ? 'error' : ''}`}>
                <label id='label-items' htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onKeyDown={handleKeyPress}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error-box">
                        <div className="error">{formik.errors.email}</div>
                    </div>
                ) : null}
            </div>
            <div>
                <div id='before-table-label'>2-1 subjects & Teacher's list :</div><br />
                {formik.values.branch !== "" ? (
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Teacher</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SubjectandTeacher[formik.values.branch].map((obj, index) => (
                                <tr key={index}>
                                    <td>{obj[0]}</td>
                                    <td>{obj[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div></div>
                )}


            </div>
            <button id='submit' type="submit">Submit</button>
        </form> : displayFormorSuccess === 1 ? (<div class="success-message">

            <div class="success-content">
                <div class="success-heading">Form Successfully Submitted!</div>
                <div class="success-description">
                    Thank you for submitting the form. A confirmation email has been sent to your email address.
                </div>
            </div>
        </div>)
            : (<div class="error-message">
                <div class="error-content">
                    <div class="error-heading">Submission Unsuccessful !</div>
                    <div class="error-description">
                        The form could not be submitted. Please ensure that your credentials are correct and try again.

                    </div>
                </div>
            </div>
            )
    );
};

export default MyForm;
