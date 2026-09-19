export const getInitials = (name: string | undefined) => {
  if (!name) return "";

  const cleanName = name.trim();
  const nameParts = cleanName.split(" ");

  if (nameParts.length === 1) {
    return nameParts[0].substring(0, 2).toUpperCase();
  }

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};
