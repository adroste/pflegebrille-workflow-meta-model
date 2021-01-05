import { checkVersion } from './migrate';
import { makeUri } from './util';

const compatible = { compatible: true };
const incompatible = { compatible: false };

describe('checkVersion', () => {
    it('should return incompatible on wrong input', () => {
        expect(checkVersion({ uri: '' }, '')).toEqual(incompatible);
        expect(checkVersion({ uri: makeUri('1.0.0') }, '')).toEqual(incompatible);
    });

    it('should return compatible on same versions', () => {
        const uri = makeUri('1.0.0');
        expect(checkVersion({ uri }, uri)).toEqual(compatible);
    });

    it('should return incompatible on no migrate function', () => {
        const v0 = makeUri('0.0.0');
        const v1 = makeUri('1.0.0');
        expect(checkVersion({ uri: v1 }, v0)).toEqual(incompatible);
    });

    it('should return incompatible on downgrade', () => {
        const v1 = makeUri('1.0.0');
        const v11 = makeUri('1.1.0');
        expect(checkVersion({ uri: v1 }, v11)).toEqual(incompatible);
    });

    it('should return migrate function on same major version upgrade', () => {
        const migrate = {
            compatible: true,
            migrate: expect.any(Function),
        };
        const v1 = makeUri('1.0.0');
        const v11 = makeUri('1.1.0');
        expect(checkVersion({ uri: v11 }, v1)).toEqual(migrate);
    });
});