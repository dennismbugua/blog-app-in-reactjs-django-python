import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


// const root = ReactDOM.createRoot(document.getElementById("app"));
// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );


ReactDOM.createRoot(
  document.getElementById("root"),
)
.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);