import fs from "fs";
import fsAsync from "fs/promises";

export async function getFilesAsync(path: string) {
    console.log("Path Query:", path);

    const pathExists = fs.existsSync(path);
    if (!pathExists)
        throw new Error(`Path '${path}' does not exist!`);

    const isDirectory = fs.lstatSync(path).isDirectory();
    if (!isDirectory)
        throw new Error(`Path '${path}' is not a directory!`);

    const files = await fsAsync.readdir(path);
    return files;
}