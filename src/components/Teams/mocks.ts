import {type Team} from './types';

export const teamsMock: Team[] = [
  {
    iri: '/api/teams/1',
    id: 1,
    name: 'Management',
    color: '#FFC9C9',
    abbreviation: 'M',
    teamPermissions: []
  },
  {
    iri: '/api/teams/2',
    id: 2,
    name: 'Front of the house',
    color: '#A5A4D4',
    abbreviation: 'F',
    teamPermissions: []
  },
  {
    iri: '/api/teams/3',
    id: 3,
    name: 'Back of the house',
    color: '#C1E0B9',
    abbreviation: 'B',
    teamPermissions: []
  }
]
