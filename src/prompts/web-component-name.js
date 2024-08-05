import prompts from 'prompts';

export async function getWebComponentName() {
    const { wcName } = await prompts({
        type: 'text',
        name: 'wcName',
        message: 'Name of web component',
        validate: (v) => {
            if (v.length === 0) {
                return 'Name should not be empty'
            }

            if (!PROJECT_NAME_REGEXP.test(v)) {
                return `Name should match the pattern: ${PROJECT_NAME_REGEXP}`;
            }

            return true;
        },
    });

    return wcName;
}
