import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  artista: any = {};
  loadingArtist: boolean;
  topTracks: any[] = [];

  constructor(private router: ActivatedRoute, private spotifyService: SpotifyService) {
    this.loadingArtist = true;
    this.router.params.subscribe(params => {
      // console.log(params);
      this.getArtist(params['id']);
      this.getTopTracks(params['id']);
    });
   }

  ngOnInit() {
  }

  getArtist(id: string) {
    this.loadingArtist = true;
    this.spotifyService.getArtist(id).subscribe( artista => {
      // console.log(artista);
      this.artista = artista;
      this.loadingArtist = false;
    });
  }

  getTopTracks(id: string) {
    this.loadingArtist = true;
    this.spotifyService.getTopTracks(id).subscribe( topTracks => {
      console.log(topTracks);
      this.topTracks = topTracks;
      this.loadingArtist = false;
    });
  }

}
