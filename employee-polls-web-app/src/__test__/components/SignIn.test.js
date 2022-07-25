import { render, screen } from '@testing-library/react';
import SignIn from '../../components/SignIn';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { Router } from 'react-router';
import {createMemoryHistory} from 'history';
import {getTestUsers} from '../utils/getTestUsers'


const mockStore = configureStore([]);


describe('Snapshot testing for SignIn component.', () => {
  
  let store;
    let component;

    let users = getTestUsers();
    const history = createMemoryHistory();
    beforeEach(() => {
      store = mockStore({
        authedUser: 'test-user-id',
        users: users
      });
      
      component = renderer.create(
        <Provider store={store}>
          <Router location={history.location} navigator={history}><SignIn /></Router>
        </Provider>
      );
    });
    
  test('renders SignIn component with screen.debug().', async () => {
    
    render(<Provider store={store}>
      <Router location={history.location} navigator={history}><SignIn /></Router>
    </Provider>);
    screen.debug();
  });

  test('renders SignIn component with toMatchSnapshot.', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

});

describe('Verify username, password and submit button is present.', () => {
  
  let store;
    let component;

    let users = getTestUsers();
    const history = createMemoryHistory();
    beforeEach(() => {
      store = mockStore({
        authedUser: 'test-user-id',
        users: users
      });
      
      component = renderer.create(
        <Provider store={store}>
          <Router location={history.location} navigator={history}><SignIn /></Router>
        </Provider>
      );
    });
    
  test('Veriy username field is there in the SignIn component.', () => {
    component = render(<Provider store={store}>
                  <Router location={history.location} navigator={history}><SignIn /></Router>
                </Provider>);
        var username = component.getByTestId('username')
        expect(username).toBeInTheDocument();
    
  });

  test('Veriy password field is there in the SignIn component.', () => {
    
    component = render(<Provider store={store}>
          <Router location={history.location} navigator={history}><SignIn /></Router>
        </Provider>);
        var password = component.getByTestId('password')
        expect(password).toBeInTheDocument();
    
  });

  test('Veriy Sign In button is there in the SignIn component.', () => {
    component = render(<Provider store={store}>
          <Router location={history.location} navigator={history}><SignIn /></Router>
        </Provider>);
        var signInButton = component.getByTestId('sign-in')
        expect(signInButton).toBeInTheDocument();
    
  });

});