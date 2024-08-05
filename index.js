#!/usr/bin/env node

import { cleanUp, convertFromKebabCase, generateDist, KNOWN_COMMANDS, parseCommand } from './src/utils.js';
import { command_start } from './src/commands/start.js';
import { initPackageJSON } from './src/configs/package-json.js';

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

    cleanUp();

    const packageJSON = await initPackageJSON();

    await generateDist({
        name: convertFromKebabCase(packageJSON.name, 'pascal-case'),
        title: convertFromKebabCase(packageJSON.name, 'spaced-pascal-case'),
    });
}

acwc();
