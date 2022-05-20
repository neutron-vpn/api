import {randomBytes} from 'crypto';

/**
 * Token class
 *
 * @export
 * @class Token
 */
export class Token {
  /**
   * Creates an instance of Token.
   * @memberof Token
   */
  constructor() {

  }

  /**
   * Generate a secret part of token
   *
   * @return {string}
   * @memberof Token
   */
  generatePart(): string {
    return randomBytes(4).toString('hex');
  }

  /**
   * Parse ID from token
   *
   * @param {string} token
   * @return {string}
   * @memberof Token
   */
  parseId(token: string): string {
    return token.split('_')[1];
  }

  /**
   * Generate a token
   *
   * @param {number} id
   * @return {string}
   * @memberof Token
   */
  generateToken(id: number): string {
    let base: string = 'n-';
    const firstPart: string = this.generatePart();
    const secondPart: string = this.generatePart();
    base += firstPart;
    base += '-';
    base += secondPart;
    base += '_' + id.toString();

    return base;
  }
}
