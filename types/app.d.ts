declare const _brand: unique symbol;

declare global {
  /**
   * Custom utility types
   */
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;

  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Brand<K, T> = K & { [_brand]: T };

  /**
   * Type aliases
   */
  export type Phone = string;

  export type Email = string;

  export type Id = string;

  export type DateIso = string;

  export type Url = string;

  export type Address = string;

  export type Color = string;

  /**
   * Shared kernel
   */

  /**
   * ⚠️ FSD
   *
   * This is a hacky way to export Redux types inferred from @/app
   * and use them in @/shared/model/hooks.ts
   */
  declare type RootState = import("../src/app/appStore").RootState;
  declare type AppDispatch = import("../src/app/appStore").AppDispatch;
  declare module "*.module.css";
}

export {};
