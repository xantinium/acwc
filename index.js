#!/usr/bin/env node

import prompts from 'prompts';
import { cleanUp, convertFromKebabCase, generateDist, KNOWN_COMMANDS, parseCommand } from './src/utils.js';
import { initPackageJSON } from './src/configs/package-json.js';
import { getActionType } from './src/prompts/action-type.js';
import { getWebComponentName } from './src/prompts/web-component-name.js';
import { command_start } from './src/commands/start.js';

export const PROJECT_NAME_REGEXP = /^[a-z\d\-]+$/;

async function acwc() {
    const command = parseCommand(process.argv);

    switch (command) {
    case KNOWN_COMMANDS.START:
        command_start();
        return;
    case KNOWN_COMMANDS.TEST:
        console.log('test');
        return;
    case KNOWN_COMMANDS.BUILD:
        console.log('build');
        return;
    }

    // const actionType = getActionType();

    // if (actionType === ACTIONS.INIT) {
    //     wcName = getWebComponentName();

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

    // initPackageJSON();
}

acwc();
