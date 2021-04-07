import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as H from 'history';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './app/store';

declare global {
  interface Window {
    renderPrefecture: (containerId: string, history: H.History) => void;
    unmountPrefecture: (containerId: string) => void;
  }
}

window.renderPrefecture = (containerId, history) => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </React.StrictMode>,
    document.getElementById(containerId)
  );

  serviceWorker.unregister();
};

window.unmountPrefecture = (containerId) => {
  ReactDOM.unmountComponentAtNode(
    document.getElementById(containerId) as HTMLElement
  );
};
