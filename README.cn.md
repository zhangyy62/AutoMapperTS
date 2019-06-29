# AutoMapperJS
进行对象映射的automapper。学习js和typescript使用。  
inspired by https://github.com/loedeman/AutoMapper

## 上手

```
npm install
npm run test
```

## 例子
``` typescript
    var objA = { prop1: 'From A', prop2: 'From A too' };
    let expectedResult = { testprop1: 'From A', prop2: 'From A too' };

    AutoMapper.createMap('a', 'b')
        .forMember('testprop1', (opts: IMemberConfigurationOptions) => opts.mapFrom('prop1'));
    var objB = AutoMapper.map('a', 'b', objA); 
    // objB = { testprop1: 'prop1', prop2: 'prop2' }
```