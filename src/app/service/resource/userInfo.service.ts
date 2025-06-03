import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class UserInfoService {
    
    token = JSON.parse(localStorage.getItem('usrCompObj') || '{}')?.token;
    customHeader = {
        headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' +
        this.token,
    )};

    constructor(private httpClient: HttpClient) { }
    
  
    uploadImage(file: FormData) {
        
        return this.httpClient.post('https://auth.alore.io:9090/userSettings/uploadImage',file,this.customHeader)
    }

    getUserProfile(){
        return this.httpClient.get("https://auth.alore.io:9090/userSettings/getUserProfile",this.customHeader);
    }

    updateUserProfile(payload : any){
        return this.httpClient.post('https://auth.alore.io:9090/userSettings/updateProfile',payload,this.customHeader)
    }

    resetPassword(password: string){
        return this.httpClient.post('https://auth.alore.io:9090/user/resetPassword?password='+password,{},this.customHeader)
    }

    getUserActivity(){
        return this.httpClient.get("https://auth.alore.io:9090/activity/getByUserId",this.customHeader);
    }

    forgotPassword(email: string){
        return this.httpClient.get("https://auth.alore.io:9090/user/forgetPassword?email="+email,this.customHeader);
    }
}