import bsCustomFileInput from 'mdbootstrap/js/modules/bs-custom-file-input';
import(
  /* webpackChunkName: "popper" */
  /* webpackPrefetch: true */
  'mdbootstrap/js/popper.min'
);
import(
  /* webpackChunkName: "bootstrap" */
  /* webpackPrefetch: true */
  'mdbootstrap/js/bootstrap.min'
);
import(
  /* webpackChunkName: "mdb" */
  /* webpackPrefetch: true */
  'mdbootstrap/js/mdb.min'
);
import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import displayController from './modules/displayController';
import './scss/main.scss';

window.bsCustomFileInput = bsCustomFileInput;

const root = document.getElementById('root');

displayController.init(root);
