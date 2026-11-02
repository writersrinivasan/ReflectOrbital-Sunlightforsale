// Simple, honest physics for a sun-reflecting mirror in orbit.
// A flat mirror cannot focus sunlight tighter than the Sun's own angular size
// (~0.53°), so the spot on the ground grows with distance.

export const SOLAR_CONSTANT = 1361; // W/m² above the atmosphere
export const SUN_ANGULAR_DIAMETER_RAD = 0.00931; // ≈ 0.533°
export const NOON_SUN_GROUND = 1000; // W/m², standard "1 sun" at ground level
export const LUX_PER_WATT = 93; // luminous efficacy of sunlight, lm/W
export const FULL_MOON_LUX = 0.25;

export type ReflectionInput = {
  mirrorSideM: number; // square mirror side length
  altitudeKm: number;
  mirrorCount: number; // mirrors pointing at the same spot
  reflectivity?: number; // 0..1
  atmosphere?: number; // 0..1 transmission
  farmMw?: number; // nameplate of a solar farm inside the spot
};

export function simulateReflection({
  mirrorSideM,
  altitudeKm,
  mirrorCount,
  reflectivity = 0.9,
  atmosphere = 0.75,
  farmMw = 100,
}: ReflectionInput) {
  const distanceM = altitudeKm * 1000;
  const spotDiameterM = distanceM * SUN_ANGULAR_DIAMETER_RAD + mirrorSideM;
  const spotAreaM2 = Math.PI * (spotDiameterM / 2) ** 2;
  const mirrorAreaM2 = mirrorSideM ** 2;

  const perMirror = (SOLAR_CONSTANT * mirrorAreaM2 * reflectivity * atmosphere) / spotAreaM2;
  const irradiance = perMirror * mirrorCount;
  const lux = irradiance * LUX_PER_WATT;
  const percentOfNoon = (irradiance / NOON_SUN_GROUND) * 100;
  const farmOutputMw = farmMw * Math.min(irradiance / NOON_SUN_GROUND, 1.2);

  return {
    spotDiameterKm: spotDiameterM / 1000,
    spotAreaKm2: spotAreaM2 / 1e6,
    mirrorAreaM2,
    irradianceWm2: irradiance,
    perMirrorWm2: perMirror,
    lux,
    fullMoons: lux / FULL_MOON_LUX,
    percentOfNoon,
    farmOutputMw,
  };
}

export function mirrorsNeeded(targetWm2: number, mirrorSideM: number, altitudeKm: number) {
  const { perMirrorWm2 } = simulateReflection({ mirrorSideM, altitudeKm, mirrorCount: 1 });
  return Math.ceil(targetWm2 / perMirrorWm2);
}

export function fmt(n: number, digits = 2) {
  if (n === 0) return "0";
  if (Math.abs(n) >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (Math.abs(n) >= 10) return n.toFixed(1);
  if (Math.abs(n) >= 0.01) return n.toFixed(digits);
  return n.toExponential(1);
}
