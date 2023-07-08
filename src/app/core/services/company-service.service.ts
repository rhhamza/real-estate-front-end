import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Company } from "../models/company.model";
import { ICompany } from "../interfaces/company";

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  private apiUrl = "http://localhost:8091/Realstate/company"; // Adjust the API URL as per your backend endpoint
 
  constructor(private http: HttpClient) {}

  getAllCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(`${this.apiUrl}/all`);
  }

  getCompanyById(id: string): Observable<Company> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Company>(url);
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.apiUrl}/add`, company);
  }

  updateCompany(id: string, company: Company): Observable<Company> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Company>(url, company);
  }

  deleteCompany(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  acceptCompany(id: string): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}/accept/${id}`, null);
  }

  rejectCompany(id: string): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}/reject/${id}`, null);
  }


}
