# AutoMapperJS
For personal learning and practice. This is a lib which ignore properties or mapping.   
[中文文档](./README.cn.md)

inspired by https://github.com/loedeman/AutoMapper.

## start

```
npm install
npm run test
```

## simple
``` typescript
    var objA = { prop1: 'From A', prop2: 'From A too' };
    let expectedResult = { testprop1: 'From A', prop2: 'From A too' };

    AutoMapper.createMap('a', 'b')
        .forMember('testprop1', (opts: IMemberConfigurationOptions) => opts.mapFrom('prop1'));
    var objB = AutoMapper.map('a', 'b', objA); 
    // objB = { testprop1: 'prop1', prop2: 'prop2' }
```