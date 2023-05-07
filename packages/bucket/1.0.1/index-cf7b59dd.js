import { importShared } from './__federation_fn_import.js';
import { j as jsx, Button } from './__federation_expose_Button-5c5674eb.js';
import { r as reactDomExports } from './index-938c67f9.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

function App() {
  return /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsx(Button, {}) });
}

const index = '';

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(App, {}) })
);
