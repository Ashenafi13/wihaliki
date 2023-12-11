import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: '',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'ዋና ገጽ',
        type: 'item',
        url: '/dashboard/default',
        classes: 'nav-item',
        icon: 'feather icon-home',
        breadcrumbs: false
      },
      {
        id: 'questions',
        title: '',
        type: 'group',
        icon: 'feather icon-feather',
        children: [
          {
            id: 'questions_children',
            title: 'ጥያቄዎች',
            type: 'item',
            url: '/basic/questions',
            classes: 'nav-item',
            icon: 'feather icon-feather'
          },
        ]
      },
    ]
  },
  {
    id: 'ui-element',
    title: '',
    type: 'group',
    icon: 'feather icon-file-text',
    children: [
      {
        id: 'basic',
        title: 'ሪፖርት',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'participants',
            title: 'ተሳታፊዎች',
            type: 'item',
            url: '/basic/participants'
          },
          {
            id: 'questions_reports',
            title: 'ጥያቄዎች',
            type: 'item',
            url: '/basic/questions-list'
          },

        ]
      }
    ]
  },
  {
    id: 'settings',
    title: '',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'settings_children',
        title: 'ቅንብሮች',
        type: 'collapse',
        icon: 'feather icon-settings',
        children: [
          {
            id: 'addQuestion',
            title: 'ጥያቄዎችን ይመዝግቡ',
            type: 'item',
            url: '/basic/add-questions'
          },
          {
            id: 'seasons',
            title: 'ምዕራፍ',
            type: 'item',
            url: '/basic/seasons'
          },

        ]
      }
    ]
  },
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
