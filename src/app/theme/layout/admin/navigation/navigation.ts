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
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'ዋና ገጽ',
        type: 'item',
        url: '/dashboard/default',
        classes: 'nav-item',
        icon: 'feather icon-home'
      },
      {
        id: 'questions',
        title: 'Forms & Table',
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

      {
        id: 'participants',
        title: 'Forms & Table',
        type: 'group',
        icon: 'feather icon-users',
        children: [
          {
            id: 'participants_children',
            title: 'ተሳታፊ',
            type: 'item',
            url: '/basic/button',
            classes: 'nav-item',
            icon: 'feather icon-users'
          },
        ]
      },
    ]
  },
  {
    id: 'ui-element',
    title: 'UI ELEMENT',
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
            id: 'alert',
            title: 'Alert',
            type: 'item',
            url: '/basic/alert'
          },
          {
            id: 'button',
            title: 'Button',
            type: 'item',
            url: '/basic/button'
          },
          {
            id: 'badges',
            title: 'Badges',
            type: 'item',
            url: '/basic/badges'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Breadcrumbs & Pagination',
            type: 'item',
            url: '/basic/breadcrumb-paging'
          },
          {
            id: 'cards',
            title: 'Cards',
            type: 'item',
            url: '/basic/cards'
          },
          {
            id: 'collapse',
            title: 'Collapse',
            type: 'item',
            url: '/basic/collapse'
          },
          {
            id: 'carousel',
            title: 'Carousel',
            type: 'item',
            url: '/basic/carousel'
          },
          {
            id: 'grid-system',
            title: 'Grid System',
            type: 'item',
            url: '/basic/grid-system'
          },
          {
            id: 'progress',
            title: 'Progress',
            type: 'item',
            url: '/basic/progress'
          },
          {
            id: 'modal',
            title: 'Modal',
            type: 'item',
            url: '/basic/modal'
          },
          {
            id: 'spinner',
            title: 'Spinner',
            type: 'item',
            url: '/basic/spinner'
          },
          {
            id: 'tabs-pills',
            title: 'Tabs & Pills',
            type: 'item',
            url: '/basic/tabs-pills'
          },
          {
            id: 'typography',
            title: 'Typography',
            type: 'item',
            url: '/basic/typography'
          },
          {
            id: 'tooltip-popovers',
            title: 'Tooltip & Popovers',
            type: 'item',
            url: '/basic/tooltip-popovers'
          },
          {
            id: 'toasts',
            title: 'Toasts',
            type: 'item',
            url: '/basic/toasts'
          },
          {
            id: 'other',
            title: 'Other',
            type: 'item',
            url: '/basic/other'
          }
        ]
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
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
