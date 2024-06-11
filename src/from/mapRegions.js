export function mapRegions(
  parsedBlockComment,
  sourceEnergy = undefined,
  energyUnits = 'eV',
) {
  const regions = [];
  if (parsedBlockComment.regions) {
    return parsedBlockComment.regions;
  }
  return regions;
}
