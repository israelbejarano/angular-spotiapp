import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;
    // el subscribe es una promesa!! tiene success y reject
    this.spotify.getNewReleases().subscribe((data: any) => {
                                      console.log(data);
                                      this.nuevasCanciones = data;
                                      this.loading = false;
                                    },
                                    (errorServicio) => {
                                      this.loading = false;
                                      this.error = true;
                                      console.log(errorServicio);
                                      this.mensajeError = errorServicio.error.error.message;
                                    });
  }

  ngOnInit() {
  }

}
