export const SOLDIERS_CACHE_TOKEN = 'soldier_cache';

const save = soldiers => {
  localStorage.setItem(SOLDIERS_CACHE_TOKEN, JSON.stringify(soldiers));
};

const load = () => {
  const cache = JSON.parse(localStorage.getItem(SOLDIERS_CACHE_TOKEN));
  return cache || [];
}

export default { load, save }