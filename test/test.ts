import AutoMapper from '../src/autoMapper';
import * as assert from 'assert';
import { IConfiguration, IMemberConfigurationOptions } from '../src/interfaces/interfaces';

describe('#simpleMapping', function () {
    it('convert properties', () => {
        var objA = { prop1: 'prop1', prop2: 'prop2' };
        let expectedResult = { testprop1: 'prop1', prop2: 'prop2' };

        AutoMapper.createMap('a', 'b')
            .forMember('testprop1', (opts: IMemberConfigurationOptions) => opts.mapFrom('prop1'));
        console.log('source object', objA);
        var objB = AutoMapper.map('a', 'b', objA);
        console.log('convert property prop1 to testprop1', objB);
        assert.equal(JSON.stringify(expectedResult), JSON.stringify(objB));
    });

    it('ignore properties', () => {
        var objA = { prop1: 'prop1', prop2: 'prop2' };
        let expectedResult = { prop1: 'prop1' };

        AutoMapper.createMap('a', 'b')
            .forSourceMember('prop2', (opts: IMemberConfigurationOptions) => opts.ignore());
        console.log('source object', objA);
        var objB = AutoMapper.map('a', 'b', objA);
        console.log('convert property prop1 to testprop1', objB);
        assert.equal(JSON.stringify(expectedResult), JSON.stringify(objB));
    });
});