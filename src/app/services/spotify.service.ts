import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root' // este providedIn lo que hace es que ya no es necesario irnos al app.module.ts y hacer
                     // el import del servicio y meterlo en el providers.
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'put here the Bearer that spotify gives to you'
    });
    return this.http.get(url, { headers });
  }

  getNewReleases(): any {
    return this.getQuery('browse/new-releases')
                .pipe(map(data => data['albums'].items));
  }

  getArtists(termino: string): any {
    return this.getQuery(`search?query=${termino}&type=artist&market=ES&offset=0&limit=15`)
                .pipe(map(data => data['artists'].items));
  }

  getArtist(id: string): any {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string): any {
    return this.getQuery(`artists/${id}/top-tracks?country=es`)
                .pipe(map(data => data['tracks']));
  }

  // metodo basico
  /*getNewReleases(): any {
    const headers = new HttpHeaders({
      'Authorization': 'put here the Bearer that spotify gives to you'
    });
    return this.http.get('https://api.spotify.com/v1/browse/new-releases', {headers})
                    .pipe(map((data: any) => {
                      return data.albums.items;
                    }));
  }*/

  /*getArtist(termino: string): any {
    const headers = new HttpHeaders({
      'Authorization': 'put here the Bearer that spotify gives to you'
    });
    return this.http.get(`https://api.spotify.com/v1/search?query=${termino}&type=artist&market=ES&offset=0&limit=15`, {headers})
                    .pipe(map(data => data['artists'].items));
  }*/
}
