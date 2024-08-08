export declare const PROCESS_DIR: string;
export declare const CURRENT_DIR: string;
export declare function convertFromKebabCase(text: string, style: 'pascal-case' | 'spaced-pascal-case'): string;
export declare enum KNOWN_COMMANDS {
    START = "start",
    TEST = "test",
    BUILD = "build"
}
export declare function parseCommand(args: string[]): string;
export declare function getFileContent(filepath: string): Promise<string>;
export declare function setFileContent(filepath: string, content: string): Promise<void>;
type Params = {
    /** Имя веб-компонента */
    name: string;
    /** Человекопонятное имя веб-компонента */
    title: string;
};
export declare function generateDist(params: Params): Promise<void[]>;
/** Очистка сбилженых файлов */
export declare function cleanUp(): Promise<void>;
export {};
