export const setField = (e, field, setter) => {
  setter((current) => ({ ...current, [field]: e.target.value }));
};
