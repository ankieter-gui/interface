export class UserGroup{
  name:string;
  users:string[];
}

export class OtherUser{
  name:string;
  uid:string;
}

export class UserGroupsResponse{
  groups:UserGroup[];
  users:OtherUser[];
}
