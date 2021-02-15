import { enumToModdleEnum, makeUri } from '../util';

import { CardinalityEnum } from '../enum/CardinalityEnum';
import { DataModeEnum } from '../enum/DataModeEnum';
import { DataTypeEnum } from '../enum/DataTypeEnum';
import { ElementPositionEnum } from '../enum/ElementPositionEnum';

/**
 * Important hints for changing/extending the model:
 * - YOU MUST increment version number in uri on change! (see: https://semver.org/)
 * - Remember to update ALL included templates as well!
 * - If you change something, it certainly breaks existing workflows!
 * - IDs (isId: true) must not begin with a number, spec: https://www.w3.org/TR/REC-xml/#NT-NameChar
 * - use `moddle.ids.nextPrefixed` for id generation
 * - DO NOT use two or more body properties with the same type,
 *   by default matching on import is done by type, 
 *   so it will only work for the first property,
 *   UNLESS you change serialization mode for given properties 
 *   via: `xml: { serialize: "xsi:type" }`
 * - changing the serialize type is a BREAKING CHANGE
 * - DO NOT inherit from bpmn:BaseElement or other bpmn types
 * - ExtensionElements must inherit from Element, 
 *   otherwise they magically disappear on re-import
 * - TRY NOT to extend bpmn elements with custom properties, 
 *   its buggy sometimes and against the spec
 * - if you use / do anything that has not already been done 
 *   in any of the types below, you can be certain that it will 
 *   not work properly without further digging into bpmn-js, moddle & co
 *   (importer & treewalker are some little bitches that are not under my control)
 */


/**
 * ## VERSION
 * 
 * Format: '<MAJOR>.<MINOR>.<PATCH>' (see: https://semver.org/)
 * 
 * MAJOR: increment on backwards incompatible change / breaking change
 * MINOR: increment on backwards compatible change (e.g. adding a type)
 * PATCH: always 0 (there are no non-breaking patches for a meta model)
 */
const VERSION = '1.0.0';

/**
 * table of contents:
 * 1. Assets
 * 2. Data & DataTypes
 * 3. Activity extensions
 * 4. Function types
 * 5. Functions for UserTask
 * 6. Functions for ServiceTask
 */
export default {
    name: "Pflegebrille BPMN Extension",
    uri: makeUri(VERSION),
    prefix: "pb",
    xml: {
        tagAlias: "lowerCase"
    },
    enumerations: [
        enumToModdleEnum('DataTypeEnum', DataTypeEnum),
        enumToModdleEnum('ElementPositionEnum', ElementPositionEnum),
    ],
    types: [

        /**
         * 1. Assets
         */
        {
            name: "Assets",
            superClass: ["Element"],
            meta: {
                bpmnExtension: ["bpmn:Definitions"],
            },
            properties: [
                {
                    name: "assets",
                    isMany: true,
                    type: "Asset",
                },
            ]
        },
        {
            name: "Asset",
            properties: [
                {
                    name: "id",
                    isAttr: true,
                    type: "String",
                    isId: true,
                },
                {
                    name: "name",
                    isAttr: true,
                    type: "String",
                }
            ]
        },


        /**
         * 2. Data & DataTypes
         */
        {
            name: "Data",
            superClass: ["Element"],
            meta: {
                bpmnExtension: ["bpmn:Definitions"],
            },
            properties: [
                {
                    name: "data",
                    isMany: true,
                    type: "Datum",
                }
            ]
        },
        {
            name: "Datum",
            properties: [
                {
                    name: "id",
                    isAttr: true,
                    type: "String",
                    isId: true,
                },
                {
                    name: "name",
                    isAttr: true,
                    type: "String",
                },
                {
                    name: "type",
                    isAttr: true,
                    type: "DataTypeEnum",
                },
                {
                    name: "isCollection",
                    isAttr: true,
                    type: "Boolean",
                },
            ]
        },


        /**
         * 3. Activity extensions
         */
        {
            name: "MediaText",
            superClass: ["Element"],
            meta: {
                bpmnExtension: ["bpmn:ManualTask"],
            },
            properties: [
                {
                    name: "text",
                    isAttr: true,
                    type: "String",
                },
                {
                    name: "mediaAssetRef",
                    isAttr: true,
                    isReference: true,
                    type: "Asset",
                }
            ]
        },
        {
            name: "ServiceTaskExtension",
            superClass: ["Element"],
            meta: {
                bpmnExtension: ["bpmn:ServiceTask"],
            },
            properties: [
                {
                    name: "function",
                    type: "Function",
                },
            ]
        },
        {
            name: "UserTaskExtension",
            superClass: ["Element"],
            meta: {
                bpmnExtension: ["bpmn:UserTask"],
            },
            properties: [
                {
                    name: "function",
                    type: "Function",
                },
            ]
        },


        /**
         * 4. Function types
         */
        {
            name: "Function",
            isAbstract: true,
        },
        {
            name: "PatientContextFunction",
            isAbstract: true,
            superClass: ["Function"],
            properties: [
                {
                    name: "patientInput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.INPUT,
                        dataType: DataTypeEnum.PATIENT,
                        dataCardinality: CardinalityEnum.SINGLE
                    }
                },
            ]
        },
        {
            name: "WoundContextFunction",
            isAbstract: true,
            superClass: ["Function"],
            properties: [
                {
                    name: "woundInput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.INPUT,
                        dataType: DataTypeEnum.WOUND,
                        dataCardinality: CardinalityEnum.SINGLE
                    }
                },
            ]
        },


        /**
         * 5. Functions for UserTask
         */
        {
            name: "PainScale",
            superClass: ["Function"],
            properties: [
                {
                    name: "painValueOutput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.OUTPUT,
                        dataType: DataTypeEnum.NUMERIC_VALUE,
                        dataCardinality: CardinalityEnum.SINGLE
                    }
                },
            ]
        },
        {
            name: "PatientSelect",
            superClass: ["Function"],
            properties: [
                {
                    name: "patientOutput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.OUTPUT,
                        dataType: DataTypeEnum.PATIENT,
                        dataCardinality: CardinalityEnum.SINGLE
                    }
                },
            ]
        },
        {
            name: "WoundDetection",
            superClass: ["Function"],
            properties: [
                {
                    name: "woundPictureInput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.INPUT,
                        dataType: DataTypeEnum.IMAGE,
                        dataCardinality: CardinalityEnum.SINGLE
                    }
                },
                {
                    name: "woundMeasurementOutput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.OUTPUT,
                        dataType: DataTypeEnum.WOUND_MEASUREMENT,
                        dataCardinality: CardinalityEnum.SINGLE
                    }
                },
            ]
        },
        {
            name: "WoundPicture",
            superClass: ["Function"],
            properties: [
                {
                    name: "woundPictureOutput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.OUTPUT,
                        dataType: DataTypeEnum.IMAGE,
                        dataCardinality: CardinalityEnum.SINGLE
                    }
                },
            ]
        },
        {
            name: "WoundSelect",
            superClass: ["PatientContextFunction"],
            properties: [
                {
                    name: "woundOutput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.OUTPUT,
                        dataType: DataTypeEnum.WOUND,
                        dataCardinality: CardinalityEnum.SINGLE
                    }
                },
            ]
        },


        /**
         * 6. Functions for ServiceTask
         */
        {
            name: "ConcatData",
            superClass: ["Function"],
            properties: [
                {
                    name: "firstInput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.INPUT,
                        dataType: DataTypeEnum.ANY,
                        dataCardinality: CardinalityEnum.ANY
                    }
                },
                {
                    name: "secondInput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.INPUT,
                        dataType: DataTypeEnum.ANY,
                        dataCardinality: CardinalityEnum.ANY
                    }
                },
                {
                    name: "collectionOutput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.OUTPUT,
                        dataType: DataTypeEnum.ANY,
                        dataCardinality: CardinalityEnum.MULTIPLE
                    }
                },
            ]
        },
        {
            name: "DeleteDataFromCollection",
            superClass: ["Function"],
            properties: [
                {
                    name: "position",
                    isAttr: true,
                    type: "ElementPositionEnum",
                },
                {
                    name: "collectionInput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.INPUT,
                        dataType: DataTypeEnum.ANY,
                        dataCardinality: CardinalityEnum.MULTIPLE
                    }
                },
                {
                    name: "collectionOutput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.OUTPUT,
                        dataType: DataTypeEnum.ANY,
                        dataCardinality: CardinalityEnum.MULTIPLE
                    }
                },
            ]
        },
        {
            name: "SelectDataFromCollection",
            superClass: ["Function"],
            properties: [
                {
                    name: "position",
                    isAttr: true,
                    type: "ElementPositionEnum",
                },
                {
                    name: "collectionInput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.INPUT,
                        dataType: DataTypeEnum.ANY,
                        dataCardinality: CardinalityEnum.MULTIPLE
                    }
                },
                {
                    name: "dataOutput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.OUTPUT,
                        dataType: DataTypeEnum.ANY,
                        dataCardinality: CardinalityEnum.SINGLE
                    }
                },
            ]
        },
        {
            name: "PostWoundHistoryEntry",
            superClass: [
                "PatientContextFunction",
                "WoundContextFunction",
            ],
            properties: [
                {
                    name: "woundHistoryEntryInput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.INPUT,
                        dataType: DataTypeEnum.WOUND_HISTORY_ENTRY,
                        dataCardinality: CardinalityEnum.SINGLE
                    }
                },
            ]
        },
        {
            name: "CreateWoundHistoryEntry",
            superClass: ["Function"],
            properties: [
                {
                    name: "woundHistoryEntryOutput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.OUTPUT,
                        dataType: DataTypeEnum.WOUND_HISTORY_ENTRY,
                        dataCardinality: CardinalityEnum.SINGLE
                    }
                },
                {
                    name: "woundImageInput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.INPUT,
                        dataType: DataTypeEnum.IMAGE,
                        dataCardinality: CardinalityEnum.ANY,
                        dataOptional: true,
                    }
                },
                {
                    name: "woundMeasurementInput",
                    isAttr: true,
                    isReference: true,
                    type: "Datum",
                    meta: {
                        dataMode: DataModeEnum.INPUT,
                        dataType: DataTypeEnum.WOUND_MEASUREMENT,
                        dataCardinality: CardinalityEnum.SINGLE
                    }
                },
            ]
        }

    ],
}