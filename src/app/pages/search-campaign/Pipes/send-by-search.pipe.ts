import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sendBySearch'
})
export class SendBySearchPipe implements PipeTransform {

  transform(userArray: any, selectedSender: any) {

    if (userArray !== undefined) {
      if (userArray.length == 0 || selectedSender == '')
        return userArray;

      const users = [];

      for (const user of userArray) {
        let email = user.userEmailId.toLowerCase()
        let senderValue = selectedSender.toLowerCase();

        if (email.includes(selectedSender))
          users.push(user);
      }

      if (users.length == 0)
        users.push({
          userEmailId: "No user found"
        })

      return users


    }
  }

}
