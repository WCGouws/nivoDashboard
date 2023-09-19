import ReactToHtmlPlugin from 'react-to-html-webpack-plugin';
export default  {
    entry: '/src/index.jsx',
    output: {
        path: path.resolve(__dirname,''),
        filename: '',
    },
    plugins: [
        new ReactToHtmlPlugin(
            {
                entry: '',
                filename: '',
            }
        ),
    ],
}
