#!/usr/bin/env node

const { program } = require('commander');
const shell = require("shelljs");
const fs = require('fs');

const jsonConfigObj = {
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@api/*": [
                "./src/api/*"
            ],
            "@styles/*": [
                "./src/styles/*"
            ],
            "@components/*": [
                "./src/components/*"
            ],
            "@assets/*": [
                "./src/assets/*"
            ],
            "@screens/*": [
                "./src/screens/*"
            ],
            "@navigation/*": [
                "./src/navigation/*"
            ],
            "@utils/*": [
                "./src/utils/*"
            ],
            "@types/*": [
                "./src/types/*"
            ],
            "@redux/*": [
                "./src/redux/*"
            ]
        }
    }
};

const babelObj = "module.exports = {\n" +
    "  presets: ['module:metro-react-native-babel-preset'],\n" +
    "  plugins: [\n" +
    "    [\n" +
    "      'module-resolver',\n" +
    "      {\n" +
    "        root: ['./src/'],\n" +
    "        alias: {\n" +
    "          '@navigation': './src/navigation',\n" +
    "          '@styles': './src/styles',\n" +
    "          '@utils': './src/utils',\n" +
    "          '@components': './src/components',\n" +
    "          '@assets': './src/assets',\n" +
    "          '@api': './src/api',\n" +
    "          '@screens': './src/screens',\n" +
    "          '@redux': './src/redux',\n" +
    "          '@types': './src/types',\n" +
    "        },\n" +
    "      },\n" +
    "    ],\n" +
    "    'react-native-reanimated/plugin',\n" +
    "  ],\n" +
    "};\n";


program
    .name('crnp')
    .description('Create new React Native project with predefined folder structure')
    .version('0.1.0')
    .argument('<directory>', 'Directory to install RN project')
    .action((directory) => {
        console.log('Initializing RN project in folder:', directory);
        //shell.mkdir(directory);

        if (shell.exec('npx --package react-native-cli react-native init '+directory).code !== 0) {
            shell.echo('Error: "react-native init" failed');
            shell.exit(1);
        }


        shell.cd(directory);

       fs.writeFile(`jsconfig.json`, JSON.stringify(jsonConfigObj, null, 4), {
           encoding: "utf8",
           flag: "w",
       }, () => console.warn('JSON file is written'));

       fs.writeFile(`babel.config.js`, babelObj, {
           encoding: "utf8",
           flag: "w",
       }, () => console.warn('Babel file is written'));


        shell.mkdir('src');
        console.log('src directory created');


        shell.mkdir(`src/assets`);
        shell.mkdir(`src/assets/images`);
        console.log('assets and images directory created');
        shell.mkdir(`src/navigation`);
        console.log('navigation directory created');
        shell.mkdir(`src/redux`);
        console.log('redux directory created');
        shell.mkdir(`src/styles`);
        console.log('styles directory created');
        shell.mkdir(`src/components`);
        console.log('components directory created');
        shell.mkdir(`src/screens`);
        console.log('screens directory created');
        shell.mkdir(`src/utils`);
        console.log('utils directory created');
        shell.mkdir(`src/api`);
        console.log('api directory created');
        shell.mkdir(`src/types`);
        console.log('types directory created');

        //npm installs

        if (shell.exec('yarn add @react-native-async-storage/async-storage @react-native-community/masked-view @react-native-community/netinfo @react-navigation/bottom-tabs @react-navigation/native @react-navigation/native-stack @reduxjs/toolkit axios date-fns formik jwt-decode lottie-ios lottie-react-native react-native-elements react-native-flash-message react-native-keyboard-aware-scrollview react-native-pager-view react-native-reanimated react-native-safe-area-context react-native-screens react-native-splash-screen react-native-swiper-flatlist react-native-tab-view react-native-vector-icons react-native-webview react-query react-redux redux redux-logger redux-persist yup').code !== 0) {
            shell.echo('Error: packages failed to install');
            shell.exit(1);
        }
        console.log('NECESSARY MODULES ARE INSTALLED');

        if (shell.exec('yarn add babel-plugin-module-resolver -D').code !== 0) {
            shell.echo('Error: babl plugin module resolver failed');
            shell.exit(1);
        }

        if (shell.exec('npx pod-install').code !== 0) {
            shell.echo('pod install failed');
            shell.exit(1);
        }

        console.log('FINISHED SUCCESSFULLY!');



    });

program.parse();
