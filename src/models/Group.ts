import { Permission } from './Permission';

export type Group = {
  id: number;
  name: string;
};

export type GroupDetail = Group & {
  permission: Permission[];
};

export type ApiGetGroups = {
  groups: GroupDetail[];
};

export type ApiGetGroup = {
  group: GroupDetail;
};
