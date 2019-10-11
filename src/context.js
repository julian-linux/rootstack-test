import React from "react";

const Context = React.createContext({ data: [] });

export const Provider = Context.Provider;

export const Consumer = Context.Consumer;

export default Context;
