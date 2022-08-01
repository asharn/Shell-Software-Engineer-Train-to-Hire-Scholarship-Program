import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ContactUsForm } from './Exercise4ReactDOMTesting';

describe('ContactUsForm', () => {
    it('will display an error if the email is not provided.', () => {
        var component = render(<ContactUsForm />);
        var department = component.getByTestId('department-select');
        fireEvent.change(department, { target: { value: 'marketing' } });
        var question = component.getByTestId('question-textarea');
        fireEvent.change(question, { target: { value: 'Why this test case is need?' } });
        var submitButton = component.getByTestId('submit-button');
        fireEvent.click(submitButton);
        expect(component.getByTestId('error-header')).toBeInTheDocument();
        expect(component.queryByTestId('success-header')).not.toBeInTheDocument();
    });

    it('will display an error if the department is not provided.', () => {
        var component = render(<ContactUsForm />);
        var email = component.getByTestId('email-input');
        fireEvent.change(email, { target: { value: 'Mike' } });
        var question = component.getByTestId('question-textarea');
        fireEvent.change(question, { target: { value: 'Why this test case is need?' } });
        var submitButton = component.getByTestId('submit-button');
        fireEvent.click(submitButton);
        expect(component.getByTestId('error-header')).toBeInTheDocument();
        expect(component.queryByTestId('success-header')).not.toBeInTheDocument();
    });

    it('will display an error if the question is not provided.', () => {
        var component = render(<ContactUsForm />);
        var email = component.getByTestId('email-input');
        fireEvent.change(email, { target: { value: 'Mike' } });
        var department = component.getByTestId('department-select');
        fireEvent.change(department, { target: { value: 'marketing' } });
        var submitButton = component.getByTestId('submit-button');
        fireEvent.click(submitButton);
        expect(component.getByTestId('error-header')).toBeInTheDocument();
        expect(component.queryByTestId('success-header')).not.toBeInTheDocument();
    });

    it('will display a success message if all fields are provided.', () => {
        var component = render(<ContactUsForm />);
        var email = component.getByTestId('email-input');
        fireEvent.change(email, { target: { value: 'Mike' } });
        var department = component.getByTestId('department-select');
        fireEvent.change(department, { target: { value: 'marketing' } });
        var question = component.getByTestId('question-textarea');
        fireEvent.change(question, { target: { value: 'Why this test case is need?' } });
        var submitButton = component.getByTestId('submit-button');
        fireEvent.click(submitButton);
        expect(component.getByTestId('success-header')).toBeInTheDocument();
        expect(component.queryByTestId('error-header')).not.toBeInTheDocument();
    });
});