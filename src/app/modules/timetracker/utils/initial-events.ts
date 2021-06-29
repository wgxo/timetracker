import { addHours } from 'date-fns';
import { colors } from './colors';
import { CalendarEvent } from 'angular-calendar';
import { BDMetaData } from '../models/bd-metadata.model';
import { Category } from '../enums/category.enum';

export const INITIAL_EVENTS: CalendarEvent<BDMetaData>[] = [
  {
    start: new Date('05/03/2021 08:00'),
    end: addHours(new Date('05/03/2021 08:00'), 0.50),
    title: 'CI Sync',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/03/2021 08:00'),
    end: addHours(new Date('05/03/2021 08:00'), 1.00),
    title: 'Team dashboarding exercise',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/03/2021 08:00'),
    end: addHours(new Date('05/03/2021 08:00'), 1.00),
    title: 'Systems arch weekly - How Pinterest works',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/03/2021 08:00'),
    end: addHours(new Date('05/03/2021 08:00'), 5.50),
    title: 'SCM-720 - Update ticket description for SOX audit tickets',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/04/2021 08:00'),
    end: addHours(new Date('05/04/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/04/2021 08:00'),
    end: addHours(new Date('05/04/2021 08:00'), 1.00),
    title: 'Dashboarding discussion',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/04/2021 08:00'),
    end: addHours(new Date('05/04/2021 08:00'), 6.50),
    title: 'Troubleshoot SOX audit ticket issue',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/05/2021 08:00'),
    end: addHours(new Date('05/05/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/05/2021 08:00'),
    end: addHours(new Date('05/05/2021 08:00'), 4.00),
    title: 'OOO',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/05/2021 08:00'),
    end: addHours(new Date('05/05/2021 08:00'), 3.50),
    title: 'troubleshoot SOX emergency landing audit tickets',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/06/2021 08:00'),
    end: addHours(new Date('05/06/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/06/2021 08:00'),
    end: addHours(new Date('05/06/2021 08:00'), 0.50),
    title: 'EngProd Team meeting',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/06/2021 08:00'),
    end: addHours(new Date('05/06/2021 08:00'), 2.00),
    title: 'continued troubleshooting SOX emergency landing audit tickets',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/06/2021 08:00'),
    end: addHours(new Date('05/06/2021 08:00'), 5.00),
    title: 'tests with emergency landing tickets',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/07/2021 08:00'),
    end: addHours(new Date('05/07/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/07/2021 08:00'),
    end: addHours(new Date('05/07/2021 08:00'), 1.00),
    title: 'EngProd retro',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/07/2021 08:00'),
    end: addHours(new Date('05/07/2021 08:00'), 1.50),
    title: 'tested close Jira ticket option in phab UI',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/07/2021 08:00'),
    end: addHours(new Date('05/07/2021 08:00'), 5.00),
    title: 'continued performing tests with emergency landing tickets for audit',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/10/2021 08:00'),
    end: addHours(new Date('05/10/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/10/2021 08:00'),
    end: addHours(new Date('05/10/2021 08:00'), 1.00),
    title: 'CLR kickoff meeting',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/10/2021 08:00'),
    end: addHours(new Date('05/10/2021 08:00'), 1.00),
    title: 'Systems arch weekly - How Pinterest works',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/10/2021 08:00'),
    end: addHours(new Date('05/10/2021 08:00'), 1.00),
    title: 'CLR sprint planning',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/10/2021 08:00'),
    end: addHours(new Date('05/10/2021 08:00'), 4.50),
    title: 'Github setup user workspace and repo',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/11/2021 08:00'),
    end: addHours(new Date('05/11/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/11/2021 08:00'),
    end: addHours(new Date('05/11/2021 08:00'), 1.50),
    title: 'went over kanban dashboard',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/11/2021 08:00'),
    end: addHours(new Date('05/11/2021 08:00'), 6.00),
    title: 'started working on CLR-5',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/12/2021 08:00'),
    end: addHours(new Date('05/12/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/12/2021 08:00'),
    end: addHours(new Date('05/12/2021 08:00'), 4.00),
    title: 'tested phab db access from Jenkins worker',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/12/2021 08:00'),
    end: addHours(new Date('05/12/2021 08:00'), 3.50),
    title: 'CALR-5 - phabricator survey',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/13/2021 08:00'),
    end: addHours(new Date('05/13/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/13/2021 08:00'),
    end: addHours(new Date('05/13/2021 08:00'), 0.50),
    title: 'EngProd Team meeting',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/13/2021 08:00'),
    end: addHours(new Date('05/13/2021 08:00'), 1.00),
    title: 'EngProd RFC/demo meeting',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/13/2021 08:00'),
    end: addHours(new Date('05/13/2021 08:00'), 1.00),
    title: 'Dashboarding excercise',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/13/2021 08:00'),
    end: addHours(new Date('05/13/2021 08:00'), 5.00),
    title: 'continue with phabricator survey ticket',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/14/2021 08:00'),
    end: addHours(new Date('05/14/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/14/2021 08:00'),
    end: addHours(new Date('05/14/2021 08:00'), 1.00),
    title: 'CALR retro',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/14/2021 08:00'),
    end: addHours(new Date('05/14/2021 08:00'), 2.00),
    title: 'troubleshoot phab access from jenkins worker',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/14/2021 08:00'),
    end: addHours(new Date('05/14/2021 08:00'), 4.50),
    title: 'continue with phabricator survey queries',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/17/2021 08:00'),
    end: addHours(new Date('05/17/2021 08:00'), 1.00),
    title: 'CI Sync',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/17/2021 08:00'),
    end: addHours(new Date('05/17/2021 08:00'), 1.00),
    title: 'Systems architecture weekly',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/17/2021 08:00'),
    end: addHours(new Date('05/17/2021 08:00'), 6.00),
    title: 'worked on phabricator repo languages survey',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/18/2021 08:00'),
    end: addHours(new Date('05/18/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/18/2021 08:00'),
    end: addHours(new Date('05/18/2021 08:00'), 1.00),
    title: 'monthly slack AMA',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/18/2021 08:00'),
    end: addHours(new Date('05/18/2021 08:00'), 6.50),
    title: 'continue working on phab repo language survey',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/19/2021 08:00'),
    end: addHours(new Date('05/19/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/19/2021 08:00'),
    end: addHours(new Date('05/19/2021 08:00'), 4.00),
    title: 'CALR-16 phab repo languages survey',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/19/2021 08:00'),
    end: addHours(new Date('05/19/2021 08:00'), 3.50),
    title: 'played around with cloc and linguist for repository survey',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/20/2021 08:00'),
    end: addHours(new Date('05/20/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/20/2021 08:00'),
    end: addHours(new Date('05/20/2021 08:00'), 0.50),
    title: 'EngProd Team meeting',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/20/2021 08:00'),
    end: addHours(new Date('05/20/2021 08:00'), 0.50),
    title: 'meeting with Shriman',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/20/2021 08:00'),
    end: addHours(new Date('05/20/2021 08:00'), 6.50),
    title: 'continue with phabricator repo languages ticket CALR-16',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/21/2021 08:00'),
    end: addHours(new Date('05/21/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/21/2021 08:00'),
    end: addHours(new Date('05/21/2021 08:00'), 1.00),
    title: 'CALR retro',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/21/2021 08:00'),
    end: addHours(new Date('05/21/2021 08:00'), 0.50),
    title: 'meeting with Rodrigo',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/21/2021 08:00'),
    end: addHours(new Date('05/21/2021 08:00'), 6.00),
    title: 'finishing up CALR-16 and repo languages query',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/24/2021 08:00'),
    end: addHours(new Date('05/24/2021 08:00'), 1.00),
    title: 'CLR sprint planning',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/24/2021 08:00'),
    end: addHours(new Date('05/24/2021 08:00'), 0.50),
    title: 'meeting with Shriman',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/24/2021 08:00'),
    end: addHours(new Date('05/24/2021 08:00'), 3.00),
    title: 'Github admin training',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/24/2021 08:00'),
    end: addHours(new Date('05/24/2021 08:00'), 3.50),
    title: 'worked on top repositories report script',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/25/2021 08:00'),
    end: addHours(new Date('05/25/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/25/2021 08:00'),
    end: addHours(new Date('05/25/2021 08:00'), 1.00),
    title: 'Infra all hands',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/25/2021 08:00'),
    end: addHours(new Date('05/25/2021 08:00'), 3.00),
    title: 'Github admin training',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/25/2021 08:00'),
    end: addHours(new Date('05/25/2021 08:00'), 3.50),
    title: 'get top contributors per repository script',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/26/2021 08:00'),
    end: addHours(new Date('05/26/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/26/2021 08:00'),
    end: addHours(new Date('05/26/2021 08:00'), 0.50),
    title: 'Werner/Ron sync',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/26/2021 08:00'),
    end: addHours(new Date('05/26/2021 08:00'), 1.00),
    title: 'Pinlabs',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/26/2021 08:00'),
    end: addHours(new Date('05/26/2021 08:00'), 1.00),
    title: 'Appdoundation forum',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/26/2021 08:00'),
    end: addHours(new Date('05/26/2021 08:00'), 5.00),
    title: 'CALR-27 - determine languages used by repos',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/27/2021 08:00'),
    end: addHours(new Date('05/27/2021 08:00'), 0.50),
    title: 'standup',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/27/2021 08:00'),
    end: addHours(new Date('05/27/2021 08:00'), 0.50),
    title: 'EngProd Team meeting',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/27/2021 08:00'),
    end: addHours(new Date('05/27/2021 08:00'), 7.00),
    title: 'CALR-16 - languages per repo reports',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },
  {
    start: new Date('05/28/2021 08:00'),
    end: addHours(new Date('05/28/2021 08:00'), 8.00),
    title: 'OOO pintentions',
    meta: {
      task: {category: Category.DEVELOPMENT, name: 'Features development'},
      project: 'Customer - Infrastructure',
    },
    color: colors.blue,

  },

];
