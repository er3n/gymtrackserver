import { injectable } from 'tsyringe';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { AuthService, InvalidUsernameOrPassword } from '../service/AuthService';
import config from '../config';

@injectable()
class AuthLoader {
  constructor(private authService: AuthService) {}

  private useLogin = () => {
    passport.use(
      'login',
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          session: false,
        },
        async (username, password, done) => {
          console.log('asd');
          try {
            console.log(username);
            const user = await this.authService.login(username, password);
            return done(null, user, { message: 'Logged in Successfully' });
          } catch (error: any) {
            if (error instanceof InvalidUsernameOrPassword) {
              done(null, false, { message: error.message });
            } else {
              done(error);
            }
          }
        },
      ),
    );
  };

  private usejJwt = () => {
    passport.use(
      new JWTStrategy(
        {
          secretOrKey: config.jwtSecret,
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
          try {
            return done(null, token.user);
          } catch (error) {
            done(error);
          }
        },
      ),
    );
  };

  public load = async () => {
    this.useLogin();
    this.usejJwt();
  };
}

export default AuthLoader;
