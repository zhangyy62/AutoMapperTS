import AutoMapper from '../src/autoMapper';
import * as assert from 'assert';
import { IConfiguration, IMemberConfigurationOptions } from '../src/interfaces/interfaces';

describe('#simpleMapping', function () {
    it('convert properties', () => {
        var objA = {prop1: 'From A', prop2: 'From A too'};


        AutoMapper.createMap('a', 'b')
        .forMember('testprop1', (opts: IMemberConfigurationOptions) => opts.mapFrom('prop1'));
        console.log('source object', objA);
        var objB = AutoMapper.map('a', 'b', objA);
        console.log('convert property prop1 to testprop1', objB);
        assert.equal(objB, objA);
    });
});