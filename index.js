import { CardinalityEnum } from './enum/CardinalityEnum';
import { DataModeEnum } from './enum/DataModeEnum';
import { DataTypeEnum } from './enum/DataTypeEnum';
import { ElementPositionEnum } from './enum/ElementPositionEnum';
import { checkVersion } from './migrate';
import v1 from './model/v1';

export default v1; // latest

export { 
    v1,
    checkVersion,
    CardinalityEnum,
    DataModeEnum,
    DataTypeEnum,
    ElementPositionEnum,
};