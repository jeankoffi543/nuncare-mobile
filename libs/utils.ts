import { getDistance } from 'geolib';
import { PharmaciesOnDutyResource } from '../types/resources/PharmaciesOnDutyResource';
import { PharmacyResource } from '../types/resources/PharmacyResource';

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `Il y a environ ${minutes} mn`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a environ ${hours} h`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `Il y a ${days} j`;

  const months = Math.floor(days / 30);
  if (months < 12) return `Il y a ${months} mois`;

  const years = Math.floor(months / 12);
  return `Il y a ${years} an${years > 1 ? 's' : ''}`;
};
type Position = {
  latitude: number | undefined;
  longitude: number | undefined;
};

export const getReadableDistance = (from: Position, to: Position) => {
  if (!from?.latitude || !from?.longitude || !to?.latitude || !to?.longitude) {
    return '...';
  }

  const distanceInMeters = getDistance(
    {
      latitude: Number(from?.latitude),
      longitude: Number(from?.longitude),
    },
    {
      latitude: Number(to?.latitude),
      longitude: Number(to?.longitude),
    },
  );
  if (typeof distanceInMeters !== 'number') {
    return '...';
  }

  if (distanceInMeters < 1000) {
    return `${distanceInMeters} m`;
  }

  return `${(distanceInMeters / 1000).toFixed(1)} km`;
};

export const formatPharmacy = (
  pharmacy: PharmaciesOnDutyResource | PharmacyResource | null,
  key: keyof PharmacyResource, // On ne contraint la clé que pour PharmacyResource
): string => {
  if (!pharmacy) {
    return '...';
  }

  // Utiliser le 'type guard' pour affiner le type
  if ('pharmacy' in pharmacy) {
    // TypeScript sait ici que `pharmacy` est de type PharmaciesOnDutyResource
    // Donc, nous pouvons accéder à sa sous-propriété `pharmacy`
    const nestedPharmacy = pharmacy.pharmacy;
    // On vérifie que la clé existe sur le sous-objet avant d'y accéder
    if (nestedPharmacy && nestedPharmacy[key]) {
      return nestedPharmacy[key] as string; // Casting pour retourner une chaîne
    }
  } else {
    // TypeScript sait ici que `pharmacy` est de type PharmacyResource
    // On vérifie que la clé existe sur l'objet avant d'y accéder
    if (pharmacy[key]) {
      return pharmacy[key] as string; // Casting pour retourner une chaîne
    }
  }

  return '...';
};
