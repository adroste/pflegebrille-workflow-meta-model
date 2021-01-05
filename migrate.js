import { migrateSameMajorVersion } from './migrations/sameMajorVersion';
import semver from 'semver';
import { uriRegex } from './util';

export function checkVersion(moddle, uriOrXml) {
    const moddleUri = moddle.uri.match(uriRegex);
    const xmlUri = uriOrXml.match(uriRegex);
    if (!moddleUri || !xmlUri)
        return { compatible: false };

    const moddleVersion = semver.parse(moddleUri[2]);
    const xmlVersion = semver.parse(xmlUri[2]);
    if (!moddleVersion || !xmlVersion)
        return { compatible: false };

    if (semver.eq(moddleVersion, xmlVersion))
        return { compatible: true };

    if (semver.gt(moddleVersion, xmlVersion)) {
        // return migrations if available
        if (semver.major(moddleVersion) === semver.major(xmlVersion)) {
            return {
                compatible: true,
                migrate: migrateSameMajorVersion(moddle),
            };
        }
    }

    return { compatible: false };
}