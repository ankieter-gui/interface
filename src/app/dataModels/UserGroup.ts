export class UserGroup{
  name:string;
  users:string[];
}

export class OtherUser{
  casLogin:string;
  id:string;
}

export class UserGroupsResponse{
  groups:UserGroup[];
  users:OtherUser[];
}
