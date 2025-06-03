import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createBySearch'
})
export class CreateBySearchPipe implements PipeTransform {

  transform(userArray: any, createBySearch: any) {

    if (userArray !== undefined) {
      if (userArray.length == 0 || createBySearch == '')
        return userArray;

      const users = [];

      for (const user of userArray) {
        let fullName = user.firstName.toLowerCase() + " " + user.lastName.toLowerCase();
        createBySearch = createBySearch.toLowerCase();

        if (fullName.includes(createBySearch))
          users.push(user);
      }

      if (users.length == 0)
        users.push({
          firstName: "No user found"
        })

      return users

    }


  }

}
