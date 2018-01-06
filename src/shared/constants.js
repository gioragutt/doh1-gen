export const DEFAULT_ATTENDENCE = 'ביחידה'
export const ATTENDENCE_VALUES = [
  DEFAULT_ATTENDENCE,
  'מחוץ ליחידה אחר',
  'מחוץ ליחידה בתפקיד',
  'חופש',
  'בהד1',
  'חו"ל',
  'יום ד\'',
  'מיוחדת',
  'חופשת מחלה',
  'מחלת בן/בת זוג',
  'מחלת ילד',
  'קורס/הכשרה',
].sort((a, b) => a.localeCompare(b, 'he'))
