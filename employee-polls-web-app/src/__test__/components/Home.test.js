import { render, screen } from '@testing-library/react';
import Home from '../../components/Home';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

const mockStore = configureStore([]);

describe('Snapshot testing for Home component.', () => {
    let store;
    let component;

    beforeEach(() => {
      store = mockStore({
        myState: 'sample text',
      });

      component = renderer.create(
        <Provider store={store}>
          <Home />
        </Provider>
      );
    });
    
  test('renders Home component with toMatchSnapshot.', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders App component screen debug.', () => {
    render(<Provider store={store}><Home /></Provider>);
    screen.debug();
   });


})