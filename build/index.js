const path = require('path');

const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

const pathResolve = (...p) => path.resolve(__dirname, ...p);

const builds = {
  cjs: {
    inputOptions: {
      input: pathResolve('../src/index.js')
    },
    outputOptions: {
      file: pathResolve('../dist/travis-token-test.common.js'),
      format: 'cjs'
    }
  },
  esm: {
    inputOptions: {
      input: pathResolve('../src/index.js')
    },
    outputOptions: {
      file: pathResolve('../dist/travis-token-test.es.js'),
      format: 'es'
    }
  },
  umd: {
    inputOptions: {
      input: pathResolve('../src/index.js'),
      plugins: [babel()]
    },
    outputOptions: {
      file: pathResolve('../dist/travis-token-test.js'),
      name: 'TravisTokenTest',
      format: 'umd'
    }
  },
  'umd.min': {
    inputOptions: {
      input: pathResolve('../src/index.js'),
      plugins: [babel(), uglify()]
    },
    outputOptions: {
      file: pathResolve('../dist/travis-token-test.min.js'),
      name: 'TravisTokenTest',
      format: 'umd'
    }
  }
};

del.sync(pathResolve('../dist'));

Object.keys(builds).forEach(async key => {
  const { inputOptions, outputOptions } = builds[key];
  const bundle = await rollup.rollup({ ...inputOptions });

  await bundle.write({ ...outputOptions });
});
