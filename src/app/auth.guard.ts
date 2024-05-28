import { CanActivateFn } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {

  const allowedRoles = route.data['allowedRoles'];

  //
  // Decode the JSON Web Token (JWT)
  //
  const tokenString = localStorage.getItem('accessToken') as string;
  const decodedToken: any = jwtDecode(tokenString);
  const roleUser = decodedToken.roleUser;

  if (roleUser && allowedRoles && allowedRoles.includes(roleUser)) {
    return true;

  } else {
    return false;

  }
};
