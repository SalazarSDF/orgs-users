/**
 * ✅ DX Best Practice
 * Use type aliases for primitive types
 * to improve developer experience
 *
 * @see types/app.d.ts
 */
export type Organization = {
  id: Id;
  name: string;
  type: string;
  link: Url;
  address: Address;
};
