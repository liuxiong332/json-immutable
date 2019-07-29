// Type definitions for [json-immutable]
// Project: [json-immutable]
// Definitions by: liuxiong

/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ If this module is a UMD module that exposes a global variable 'myLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */
// export as namespace myLib;

/*~ If this module has methods, declare them as functions like so.
 */
export function serialize(data: any, options?: { pretty: boolean }): string;

export function deserialize(json: string, options?: any): any;
