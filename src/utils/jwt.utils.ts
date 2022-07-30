import { sign, SignOptions, verify } from "jsonwebtoken";

/**
 * generates JWT used for local testing
 */
export function generateToken(payload: any) {
  // read private key value
  const secret = process.env.SECRET as string || 'omaewa';
  const signInOptions: SignOptions = {
    expiresIn: '1h'
  };
  // generate JWT
  return sign(payload, secret, signInOptions);
};

/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
export function validateToken(token: string): Promise<any> {
  const secret = process.env.SECRET as string || 'omaewa  ';
  return new Promise((resolve, reject) => {
    verify(token, secret, (error, decoded: any) => {
      if (error) return reject(error);
      resolve(decoded);
    })
  });
}