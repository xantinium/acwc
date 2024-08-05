import prompts from 'prompts';

export const ACTIONS = {
    INIT: 'init',
    UPDATE: 'update',
};

export async function getActionType() {
    const { actionType } = await prompts({
        type: 'select',
        name: 'actionType',
        message: 'Select the action you want to perform',
        choices: [
            {
                title: 'Init new web component',
                value: ACTIONS.INIT,
            },
            {
                title: 'Update an existing web component',
                value: ACTIONS.UPDATE,
                disabled: true,
            },
        ],
    });

    return actionType;
}