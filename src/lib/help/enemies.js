import getRandom from './utils';

function generateEnemy() {
  const FIRSTS = [
    'Alfred',
    'Reginald',
    'Jonathan',
    'Francis',
    'Kemberly',
    'Julianna',
    'Reese',
    'Horace',
    'Polly',
    'Charlotte',
    'Chanel',
    'Peregrine',
  ];
  const MIS = ['J.', 'P.J.', 'K.', 'F.', 'Q.'];
  const LASTS = [
    'Wintermute',
    'Cantelbra',
    'Acrobottom',
    'Astorford',
    'Rallento',
    'Fauntelroy',
    'Pantelfance',
    'Upperton',
    'Winthrope',
  ];

  return `${getRandom(FIRSTS)} ${getRandom(MIS)} ${getRandom(LASTS)}`;
}

export default generateEnemy;
