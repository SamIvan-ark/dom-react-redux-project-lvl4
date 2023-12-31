import filter from 'leo-profanity';

const ruProfanity = filter.getDictionary('ru');
filter.add(ruProfanity);

export default (text) => filter.clean(text);
