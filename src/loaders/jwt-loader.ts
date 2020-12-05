import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
export default async () => {
  const jwtStrategy = new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    },
    (jwtPayload, done) => {
      console.log(jwtPayload);

      console.log('sesx');

      const user = {
        username: 'eren',
      };

      done(false, user);
    },
  );

  passport.use(jwtStrategy);
};
