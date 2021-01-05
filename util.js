export const uriRegex = /(http:\/\/pflegebrille.de\/schema\/bpmn\/pb-extension\/v)([^"']+)($|"|')/;

export function makeUri(version) {
    return 'http://pflegebrille.de/schema/bpmn/pb-extension/v' + version;
}

export function enumToModdleEnum(name, enumType) {
    const moddleEnum = {
        name,
        literalValues: [],
    };
    for (let p in enumType) {
        if (enumType.hasOwnProperty(p)) {
            moddleEnum.literalValues.push({
                name: enumType[p],
            });
        }
    }
    return moddleEnum;
}