declare namespace Express {
    export interface Request {
        id: any;
        email: any;
        user: any;
        file: any;
        query:any;
        id_project: any;
        session: any;
    }
    export interface Response {
        id: any;
        email: any;
        user: any;
        file: any;
        session: any;
    }
  }

  declare namespace jsonwebtoken {
    export function verify(
      token: string,
      secretOrPublicKey: string | undefined,
      options?: VerifyOptions
    ): { email: string };
  }
  