#!/usr/bin/env node

import prompts from 'prompts';
import { cleanUp, convertFromKebabCase, generateDist } from './src/utils.js';
import { initPackageJSON } from './src/configs/package-json.js';

export const PROJECT_NAME_REGEXP = /^[a-z\d\-]+$/;

export const ACTIONS = {
    INIT: 'init',
    UPDATE: 'update',
};

async function acwc() {
    // const { actionType } = await prompts({
    //     type: 'select',
    //     name: 'actionType',
    //     message: 'Select the action you want to perform',
    //     choices: [
    //         {
    //             title: 'Init new web component',
    //             value: ACTIONS.INIT,
    //         },
    //         {
    //             title: 'Update an existing web component',
    //             value: ACTIONS.UPDATE,
    //             disabled: true,
    //         },
    //     ],
    // });

    // if (actionType === ACTIONS.INIT) {
    //     const { wcName } = await prompts({
    //         type: 'text',
    //         name: 'wcName',
    //         message: 'Name of web component',
    //         validate: (v) => {
    //             if (v.length === 0) {
    //                 return 'Name should not be empty'
    //             }

    //             if (!PROJECT_NAME_REGEXP.test(v)) {
    //                 return `Name should match the pattern: ${PROJECT_NAME_REGEXP}`;
    //             }
    
    //             return true;
    //         },
    //     });

    //     await cleanUp();

    //     try {
    //         await generateDist({
    //             name: convertFromKebabCase(wcName, 'pascal-case'),
    //         });
    //     } catch (err) {
    //         cleanUp();

    //         console.error(err);
    //     }
    // }

    initPackageJSON();
}

acwc();
