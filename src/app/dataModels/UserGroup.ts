export class UserGroup{
  name:string;
  users:string[];
}

export class OtherUser{
  CasLogin:string;
  id:string;
}

export class UserGroupsResponse{
  groups:UserGroup[];
  users:OtherUser[];
}
