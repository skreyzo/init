require('@babel/register');

const React = require('react');
const ReactDOMServer = require('react-dom/server');

const renderTemplate = (reactElement, properties, response) => {
  const reactEL = React.createElement(reactElement, properties);
  const html = ReactDOMServer.renderToStaticMarkup(reactEL);
  response.write('<!DOCTYPE html>');
  response.write(html);
  response.end();
};

module.exports = renderTemplate;