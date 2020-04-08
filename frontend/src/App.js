import React from 'react';
import './global.css'
import Routes from './routes';

function App(){
  return (
    <Routes />
  )
}

export default App;


// import React, { useState } from 'react';
// import  Header from './Header';

// function App() {
//   const [counter, setCounter] = useState(0); // o segundo parâmetro da array vai atualizar o valor 

//   function increment(){
//     setCounter(counter + 1);
//   }

//   return (
//     <div>
//       <Header>Contador: {counter}</Header>
//       <button onClick={increment}>Incrementar</button>
//     </div>
//   );
// }


