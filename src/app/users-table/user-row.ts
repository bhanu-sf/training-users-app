import { User } from "./user";

export interface UserRow extends User {
  isEditing: boolean;
  edited?: any;
}