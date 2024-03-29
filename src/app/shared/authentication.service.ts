import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}
 
loginStatus = new BehaviorSubject<boolean>(this.isUserLoggedIn());
username = new BehaviorSubject<String>(sessionStorage.getItem("username"));
userrole = new BehaviorSubject<String>(sessionStorage.getItem("userrole"));

loginStatus1 = new BehaviorSubject<boolean>(this.isUserLoggedIn());
username1 = new BehaviorSubject<String>(sessionStorage.getItem("username"));
userrole1 = new BehaviorSubject<String>(sessionStorage.getItem("userrole"));

  authenticate(email, password) {
    
    return this.http
      .post<any>("http://localhost:8080/auth/authenticate", {
        email,
        password,
      })
      .pipe(
        map((userData) => {
          if(sessionStorage.getItem("isRemember")=="true")
          {
           sessionStorage.setItem("username", userData.username);
           sessionStorage.setItem("userrole", userData.roles);
           sessionStorage.setItem("token", "Bearer " + userData.token);
              //emit values so that subscriber will get updated value
          this.loginStatus.next(true);
          this.username.next(sessionStorage.getItem("username"));
          this.userrole.next(sessionStorage.getItem("userrole"));
          return userData;
          }
          else
          {
          sessionStorage.setItem("username", userData.username);
          sessionStorage.setItem("userrole", userData.roles);
          sessionStorage.setItem("token", "Bearer " + userData.token);

          //emit values so that subscriber will get updated value
          this.loginStatus1.next(true);
          this.username1.next(sessionStorage.getItem("username"));
          this.userrole1.next(sessionStorage.getItem("userrole"));
          return userData;
          }

        })
      );
  }
  //authentication logic
  //will decide whether user is logged or not
  //will get to know role and can be used to return in getROle()

  isUserLoggedIn() {
    if(sessionStorage.getItem("isRemember")=="true")
    {
      let username = sessionStorage.getItem("username");
      return !(username === null);
    }
    else
    {      
    let username = sessionStorage.getItem("username");
    return !(username === null);
    }
  
  }
  //getting user role
  getRole() {
    if(sessionStorage.getItem("isRemember")=="true")
      return sessionStorage.getItem("userrole");
    else    
      return sessionStorage.getItem("userrole");
  }

  //getting username ->email 
  getUsername() {
    if(sessionStorage.getItem("isRemember")=="true")
      return sessionStorage.getItem("username");
    else 
      return sessionStorage.getItem("username");
  }
  //logout
  logout() {
    if(sessionStorage.getItem("isRemember")=="true")
    {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userrole");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("isRemember");
      //emit values
      this.loginStatus.next(false);
      this.username.next(null);
      this.userrole.next(null);
    }
    else
    {
      sessionStorage.removeItem("isRemember");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("userrole");
      sessionStorage.removeItem("userid");
      sessionStorage.removeItem("isRemember");
      //emit values
      this.loginStatus1.next(false);
      this.username1.next(null);
      this.userrole1.next(null);
    }
  }
}
