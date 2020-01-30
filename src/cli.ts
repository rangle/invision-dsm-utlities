import * as commander from 'commander';
import { transformToTheme } from "./transform-to-theme";
import { downloadDesignTokens } from "./download-design-tokens";

// Event Handlers
const errorHandler = (e: any) => {
    console.error(e);
    process.exit(0);
};

const main = async () => {
    const program = new commander.Command();
    program.version('0.1.0');

    program
        .option('-d, --download <url>', 'download url')
        .option('-t, --transform <filePathToTransform>', 'path to file to transform')
        .option('-o, --out-file <outFilePath>', 'output file path')
        .action(async ( { download: url, transform: filePathToTransform, outFile } ) => {
            if (url && filePathToTransform) {
                console.error('You can only perform one action at a time.');
                process.exit(0);
            }

            if (url) {
                await downloadDesignTokens({ url, outFile });
            } else if (filePathToTransform) {
                await transformToTheme({ filePathToTransform, outFile})
            }

            console.log('Operation completed.');
        });

    try {
        await program.parseAsync(process.argv);
    }
    catch (error) {
        errorHandler(error)
    }
};

main();
