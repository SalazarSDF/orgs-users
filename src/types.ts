// name, middleName,lastName, emila
export type User = {
  id: "string";
  firstName: "string";
  lastName: "string";
  middleName: "string";
  Phone: "string";
  Email: "string";
  DateOfBirth: "string";
};
export type Organization = {
  id: "string";
  name: "string";
  type: "string";
  address: "string";
  link: "string";
  users: User[];
};

export enum FormTypes {
  organization = "organization",
  user = "user",
}
