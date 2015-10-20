'use strict';

import React        from 'react.ui/node_modules/react';
import App          from './dist/components/app';
import { exec }     from 'child_process';

const props = {};

function render () {
  React.render(<App { ...props } />, document.getElementById('main'));
}

render();

const findNodes = () => new Promise((ok, ko) => {
  exec('whereis node', (error, stdout) => {
    if ( error ) {
      return ko(error);
    }

    const places = stdout
      .replace(/^node:\s+/, '')
      .split(/\s/)
      .filter(place => place)
      .map(place => place.trim());

    Promise
      .all(places.map(place => new Promise((ok, ko) => {
        exec(`${place} -v`, (error, stdout) => {
          if ( error ) {
            return ok(false);
          }
          ok(stdout);
        });
      })))
      .then(
        results => {
          const nodes = results
            .filter(result => result)
            .map(version => version.trim())
            .map((version, index) => ({
              path : places[index],
              version
            }));

          exec('which node', (error, stdout) => {
            if ( error ) {
              return ko(error);
            }

            ok({
              which : nodes.reduce((which, node, index) => {
                if ( node.path === stdout.trim() ) {
                  which = index;
                }

                return which;
              }, null),
              whereis : nodes
            });
          });
        },
        ko
      );
  });
});

findNodes().then(
  nodes => {
    props.nodes = nodes;
    render();
  },
  error => { throw error }
);
