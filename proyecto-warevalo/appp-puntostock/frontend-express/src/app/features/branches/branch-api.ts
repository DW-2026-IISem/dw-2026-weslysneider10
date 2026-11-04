import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Branch, CreateBranch, UpdateBranch } from '../../core/models/branch.model';

interface BranchesResponse {
  branches: Branch[];
}

interface BranchResponse {
  branch: Branch;
}

@Injectable({ providedIn: 'root' })
export class BranchApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/sucursales`;

  list(): Observable<Branch[]> {
    return this.http.get<BranchesResponse>(this.base)
      .pipe(map(response => response.branches));
  }

  getById(id: number): Observable<Branch> {
    return this.http.get<BranchResponse>(`${this.base}/${id}`)
      .pipe(map(response => response.branch));
  }

  create(payload: CreateBranch): Observable<Branch> {
    return this.http.post<BranchResponse>(this.base, payload)
      .pipe(map(response => response.branch));
  }

  update(id: number, payload: UpdateBranch): Observable<Branch> {
    return this.http.put<BranchResponse>(`${this.base}/${id}`, payload)
      .pipe(map(response => response.branch));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.base}/${id}/deactivate`, {});
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
