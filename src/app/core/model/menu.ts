import { NavItem } from "src/app/core/model/nav-item";


export let menu: NavItem[] = [
  {
    displayName: 'Rooms',
    iconName: 'home',
    route: 'rooms',
    isParent: false,
  },
  {
    displayName: 'Incident Reports',
    iconName: 'report_problem',
    route: 'incidents',
    isParent: false,
  },
  {
    displayName: 'Monthly Due',
    iconName: 'today',
    route: 'monthly-due',
    isParent: false,
  },
  {
    displayName: 'Security',
    iconName: 'security',
    route: 'security',
    isParent: true,
    children: [
      {
        displayName: 'Accounts',
        iconName: 'account_circle',
        route: 'security/users',
        isParent: false,
      },
      {
        displayName: 'Roles',
        iconName: 'supervisor_account',
        route: 'security/roles',
        isParent: false,
      },
    ]
  }
];
