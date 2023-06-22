import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders().set('origin', 'x-requested-with');

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private apollo: Apollo) { }


  introduceSession(): Observable<any> {
    const mutation = gql`
      mutation IntroduceSession {
        introduceSession {
          id
          expiresAt
          addresses {
            address
          }
        }
      }
    `;
    return this.apollo.mutate<any>({
      mutation,
      context: {
        headers: headers
      }
    });
  }

  getSessionDetails(id: string): Observable<any> {
    const query = gql`
      query GetSessionDetails($id: ID!) {
        session(id: $id) {
          addresses {
            address
          }
          mails {
            rawSize
            fromAddr
            toAddr
            downloadUrl
            text
            headerSubject
          }
        }
      }
    `;
      this.apollo.getClient().cache.evict({ fieldName: 'session', args: { id: id } });
    return this.apollo.query<any>({
      query,
      variables: {
        id: id
      },
      context: {
        headers: headers
      }
    });
  }
  
}