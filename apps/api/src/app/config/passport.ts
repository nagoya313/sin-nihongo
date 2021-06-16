import passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const verify = (jwtPayload: any, done: VerifiedCallback) => {
  if (jwtPayload && jwtPayload.sub) {
    return done(null, jwtPayload);
  }

  return done(null, false);
};

export const initPaspport = () => {
  passport.use(
    new Strategy(
      {
        secretOrKeyProvider: passportJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          jwksUri: `https://${process.env.NX_AUTH0_DOMAIN!}/.well-known/jwks.json`,
        }),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        audience: process.env.NX_API_IDENTIFIER!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        issuer: `https://${process.env.NX_AUTH0_DOMAIN!}/`,
        algorithms: ['RS256'],
      },
      verify
    )
  );
};
