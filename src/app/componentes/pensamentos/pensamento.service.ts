import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private httpClient: HttpClient) { }

  listar(pagina: number, filtro: string): Observable<Pensamento[]> {
    const itensPorPagina = 6;
    let params = new HttpParams().set('_page', pagina).set('_limit', itensPorPagina)
    if (filtro.trim().length > 2) {
      params = params.set('q', filtro)
    }

    return this.httpClient.get<Pensamento[]>(this.API, { params });
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.httpClient.get<Pensamento>(url)
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.httpClient.post<Pensamento>(this.API, pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.httpClient.delete<Pensamento>(url)
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.httpClient.put<Pensamento>(url, pensamento)
  }

}
