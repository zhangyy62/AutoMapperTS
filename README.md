# AutoMapperJS
进行对象映射的automapper。学习js和typescript使用。inspired by https://github.com/loedeman/AutoMapper

## 最简单的用法
``` typescript
    class User {
        id: number
        name: string
        age: number
    }
    class UserDTO {
        name: string
        age: number
    }
    Mapper.Initialize(x => x.CreateMap<User, UserDto>());
    let user =  {
        id = 1,
        name = 'jack',
        age = 20
    } as User;
   
    var dto = Mapper.Map<UserDto>(user);
    // dto = { name: 'jack', age: 20}
```