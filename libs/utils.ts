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
