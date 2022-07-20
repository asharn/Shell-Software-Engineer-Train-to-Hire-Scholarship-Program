import { useState } from "react";

export const ContactUsForm = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState(null);
    const [department, setDepartment] = useState(null);
    const [question, setQuestion] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !department || !question) {
            setError(true);
            setSuccess(false);
            return;
        }

        setSuccess(true);
        setError(false);
    }

    return (
        <div>
            {success &&
                <h1 data-testid="success-header">Form Submitted!</h1>
            }
            {error &&
                <h1 data-testid="error-header">Error: Please ensure all fields are filled out.</h1>
            }
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        data-testid="email-input"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label>Select a Department:</label>
                    <select
                        data-testid="department-select"
                        value={department}
                        onChange={handleDepartmentChange}
                    >
                        <option value="" />
                        <option value="sales">Sales</option>
                        <option value="marketing">Marketing</option>
                        <option value="it">IT</option>
                    </select>
                </div>
                <div>
                    <label>Enter your Question:</label>
                    <br />
                    <textarea
                        data-testid="question-textarea"
                        value={question}
                        onChange={handleQuestionChange}
                    />
                </div>
                <input
                    data-testid="submit-button"
                    type="submit"
                    value="Submit"
                />
            </form>
        </div>
    );
}