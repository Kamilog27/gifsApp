import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey:string="hKr3X3Ca4Dufy8SK4gSvQTArpYzn7Zxy";
  private servicioUrl:string="http://api.giphy.com/v1/gifs"
  private _historial:string[]=[]
  public resultados:Gif[]=[]
  get historial(){
    
    return [...this._historial];
  }
  constructor(private http:HttpClient) {
    localStorage.getItem('historial')
    this._historial=JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || []
    
   }

  buscarGifs(query:string){
    query=query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10)
      localStorage.setItem('historial',JSON.stringify(this._historial))
    }
  const params=new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit',"10")
    .set('q',query);
  this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((res)=>{
        console.log(res.data)
        this.resultados=res.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados))
      })
    
  }

}
