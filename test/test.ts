import AutoMapper from '../src/autoMapper';
import * as assert from 'assert';
import { IConfiguration, IMemberConfigurationOptions } from '../src/interfaces/interfaces';

describe('#simpleMapping', function () {
    it('convert properties', () => {
        var objA = { prop1: 'From A', prop2: 'From A too' };
        let expectedResult = { testprop1: 'From A', prop2: 'From A too' };

        AutoMapper.createMap('a', 'b')
            .forMember('testprop1', (opts: IMemberConfigurationOptions) => opts.mapFrom('prop1'));
        console.log('source object', objA);
        var objB = AutoMapper.map('a', 'b', objA);
        console.log('convert property prop1 to testprop1', objB);
        assert.equal(JSON.stringify(expectedResult), JSON.stringify(objB));
    });

    it('ignore properties', () => {
        let objA = { prop1: 'From A', prop2: 'From A too' };
        let expectedResult = { prop1: 'From A' };

        AutoMapper.createMap('a', 'b')
            .forSourceMember('prop2', (opts: IMemberConfigurationOptions) => opts.ignore());
        console.log('source object', objA);
        var objB = AutoMapper.map('a', 'b', objA);
        console.log('convert property prop1 to testprop1', objB);
        assert.equal(JSON.stringify(expectedResult), JSON.stringify(objB));
    });
});