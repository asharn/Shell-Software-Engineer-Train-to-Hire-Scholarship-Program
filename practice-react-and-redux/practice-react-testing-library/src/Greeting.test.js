import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

describe('renders Greeting', () => {
    it('Testing of snapshot creation', () =>{
        var component = render(<Greeting />);
        expect(component).toMatchSnapshot();
    });
});