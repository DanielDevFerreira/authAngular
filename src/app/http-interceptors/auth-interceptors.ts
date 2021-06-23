import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { AuthService } from "../account/shared/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ){}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getAuthorizationToken();
        let request: HttpRequest<any> = req;

        if(token && !this.authService.isTokenExpired(token)){
            // o request é imutavel, ou seja, não é possivel mudar nada
            // Faço o clone para conseguir mudar as propriedades
            // Passo o token de autenticação no header
            request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        //retorno o request com o erro tratado
        return next.handle(request).pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse){
        if (error.error instanceof ErrorEvent){
            // erro de cliente-side ou de rede
            console.error('Ocorreu um erro:', error.error.message);
        }else{
            //Error retornando pelo backend
            console.error(
                `Código do erro ${error.status},` +
                `Erro: ${JSON.stringify(error.error)}`
            );
        }

        //retornar um observable com uma mensagem amigavel
        return throwError('Ocorreu um erro, tente novamente');
    }
}