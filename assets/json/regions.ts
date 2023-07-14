type RegionType = {
  name: string;
  first: number;
  last: number;
};

const REGIONS: RegionType[] = [
  {
    name: "National",
    first: 1,
    last: 898,
  },
  {
    name: "Kanto",
    first: 1,
    last: 151,
  },
  {
    name: "Johto",
    first: 152,
    last: 251,
  },
  {
    name: "Hoenn",
    first: 252,
    last: 386,
  },
  {
    name: "Sinnoh",
    first: 387,
    last: 493,
  },
  {
    name: "Unova",
    first: 494,
    last: 649,
  },
  {
    name: "Kalos",
    first: 650,
    last: 721,
  },
  {
    name: "Alola",
    first: 722,
    last: 809,
  },
  {
    name: "Galar",
    first: 810,
    last: 898,
  },
];

export { REGIONS, RegionType };
