import { createContext, useState } from 'react';

const Context = createContext();
function ContextProvider(props) {
  const [state, setState]=useState();
  return (
    <Context.Provider value={{ /* Your data here */ }}>
      {props.children}

    </Context.Provider>
  );

}



export default { Context, ContextProvider };
