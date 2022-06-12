export class User {
  [key: string]: any
  id: number = 0;
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: string;
  address?: string;
  editable?: boolean;
  active?: boolean;
  onBoarding?: string;
  salary?: number;
}
