import { Request } from 'express';
import * as joiful from 'joiful';
import { authenticate } from 'passport';
import { AuthChecker, buildSchema, registerEnumType } from 'type-graphql';
import { OrderDirection } from '@sin-nihongo/graphql-interfaces';

const validate = (argValue: Record<string, unknown> | null | undefined) => {
  const { error } = joiful.validate(argValue);
  if (error) {
    throw error;
  }
};

type Context = { req: Request };

const authChecker: AuthChecker<Context> = ({ context }) => {
  console.log(context);
  return new Promise<boolean>((resolve, reject) => {
    authenticate('jwt', (err, user) => {
      if (err) {
        return reject(err);
      }
      if (!user) {
        return resolve(false);
      }
      return resolve(true);
    })(context.req);
  });
};

export const buildGlaphQLSchema = () => {
  const resolvers = ['apps/api/src/app/resolvers/*.ts'] as const;

  registerEnumType(OrderDirection, {
    name: 'OrderDirection',
    description: '並び替え順',
  });

  return buildSchema({ resolvers, validate, authChecker });
};
