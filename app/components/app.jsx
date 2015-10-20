'use strict';

import React          from 'react.ui/node_modules/react';
import Table          from 'react.ui/dist/components/table';
import Group          from 'react.ui/dist/components/group';
import Button         from 'react.ui/dist/components/button';

class App extends React.Component {
  render () {
    const { nodes } = this.props;

    let which = {};

    let alternatives;

    if ( nodes ) {
      which = nodes.whereis[nodes.which];
      alternatives = nodes.whereis
        .filter((node, index) => index !== nodes.which)
        .map(node => (
          <tr key={ node.path }>
            <td>{ node.path }</td>
            <td>{ node.version }</td>
          </tr>
        ));
    }

    return (
      <section>
        <header role="banner">
          <h1>Noodles</h1>

          <nav>
            <Group>
              <Button>Node</Button>
            </Group>
          </nav>
        </header>

        <article>
          <header>
            <h2>Node executables</h2>
          </header>

          <p>In this section, you will find all the node executables available in your machine.</p>

          <article>
            <header>
              <h3>Official</h3>
            </header>

            <p>The official executable is the one that is called by default when you call node.</p>

            <Table block>
              <thead>
                <tr>
                  <td>Path</td>
                  <td>Version</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{ which.path }</td>
                  <td>{ which.version }</td>
                </tr>
              </tbody>
            </Table>

          </article>

          <article>
            <header>
              <h3>Alternative</h3>
            </header>

            <p>You might have more than 1 node executable installed on your machine. Here are the alternatives we found there:</p>

            <Table block>
              <thead>
                <tr>
                  <td>Path</td>
                  <td>Version</td>
                </tr>
              </thead>
              <tbody>
                { alternatives }
              </tbody>
            </Table>

          </article>
        </article>

      </section>
    );
  }
}

export default App;
