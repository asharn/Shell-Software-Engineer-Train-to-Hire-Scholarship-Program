import { render, screen } from '@testing-library/react';
import GreetingWithProps from './GreetingWithProps';

describe('renders GreetingWithProps', () => {
    it('Testing of snapshot creation with props.name', () =>{
        var component = render(<GreetingWithProps name={'Mike'}/>);
        expect(component).toMatchSnapshot();
    });

    it('Testing of snapshot creation with no props.name', () =>{
        var component = render(<GreetingWithProps />);
        expect(component).toMatchSnapshot();
    });
});