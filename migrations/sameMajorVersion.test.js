import { makeUri } from '../util';
import { migrateSameMajorVersion } from './sameMajorVersion';

describe('migration: sameMajorVersion', () => {

    it('should replace the xml version with moddle version', () => {
        const v100 = makeUri('1.0.0');
        const v110 = makeUri('1.1.0');

        const migrate = migrateSameMajorVersion({ uri: v110 });
        expect(migrate(v100)).toEqual(v110);

        const v100Xml = `<bpmn:definitions xmlns:pb="${v100}" >`;
        const v110Xml = `<bpmn:definitions xmlns:pb="${v110}" >`;
        expect(migrate(v100Xml)).toEqual(v110Xml);
    });

});