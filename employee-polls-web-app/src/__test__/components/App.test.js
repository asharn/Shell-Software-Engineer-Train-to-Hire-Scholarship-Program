import App from '../../components/App';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { connect } from "react-redux";

describe('Snapshot testing for App component for logged in user as well as logout use.', () => {
  test('renders App component for LoggedIn User.', async () => {
    const store = await createStore(rootReducer);
    const mapStateToProps = (state) => {
      let {authedUser} = state
      return {authedUser};
    }
    const render = connect(store, App); // reusable with
    const component = render(mapStateToProps); 
    expect(component).toMatchSnapshot()
  });
})