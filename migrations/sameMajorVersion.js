import { uriRegex } from '../util';

/**
 * Migrate function that replaces the xml uri version
 * with the moddle uri version without changing anything
 */
export const migrateSameMajorVersion = moddle => xml => {
    const moddleUri = moddle.uri.match(uriRegex);
    const moddleVersion = moddleUri[2];
    
    return xml.replace(uriRegex, `$1${moddleVersion}$3`);
};