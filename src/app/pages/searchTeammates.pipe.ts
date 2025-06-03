import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'search'
})

export class SearchPipe implements PipeTransform {
    transform(languages: string[], searchTeammate: any): any{
    
        if(searchTeammate) {
            return searchTeammate;
        }
     }
}