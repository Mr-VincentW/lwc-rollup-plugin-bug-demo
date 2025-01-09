import html from '@rollup/plugin-html';
import livereload from 'rollup-plugin-livereload';
import lwc from '@lwc/rollup-plugin';
import serve from 'rollup-plugin-serve';
import replace from '@rollup/plugin-replace';

export default args => ({
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'esm'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV ?? 'development'
      ),
      preventAssignment: true
    }),
    html(),
    lwc(),
    ...(args.watch
      ? [
          serve({
            contentBase: 'dist',
            port: 3000
          }),
          livereload('dist')
        ]
      : [])
  ]
});
