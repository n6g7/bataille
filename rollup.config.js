import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/@vx/curve/build/index.js': ['curveMonotoneX'],
        'node_modules/@vx/group/build/index.js': ['Group'],
        'node_modules/@vx/responsive/build/index.js': ['ParentSize'],
        'node_modules/@vx/scale/build/index.js': ['scaleBand', 'scaleLinear', 'scaleTime'],
        'node_modules/@vx/shape/build/index.js': ['Bar', 'LinePath'],
        'node_modules/react/index.js': ['Component', 'PureComponent', 'createElement']
      }
    }),
    resolve({
      browser: true,
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    babel({
      exclude: 'node_modules/**'
    }),
  ]
}
