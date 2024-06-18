import getRandom from './utils';

function generateDepartment() {
  const PREFIXES = [
    'Consumer',
    'Applied',
    'Heavy',
    'Agile',
    'Advanced',
    'Artificial',
    'Offworld',
    'Flubber',
    '"Defence"',
  ];
  const SUFFIXES = [
    'Nanotech',
    'Logistics',
    'Applications',
    'Biotech',
    'Infotech',
    'Intelligence',
    'Innovations',
    'Robotics',
  ];

  return `${getRandom(PREFIXES)} ${getRandom(SUFFIXES)}`;
}

export default generateDepartment;
