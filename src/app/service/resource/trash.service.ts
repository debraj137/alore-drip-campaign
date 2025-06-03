import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TrashService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTrash() {
    return this.httpClient.get(
      `${environment.coreBackendUrl}/trash/getDeletedItems`
    );
  }}
