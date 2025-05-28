import { useRecoilValue } from 'recoil';
import { languageState } from '../state/PrimaryState';

export const useTextLanguage = ({ vietnamese, english }) => {
  const selectedLanguage = useRecoilValue(languageState);

  if (selectedLanguage === 'vie') return vietnamese;
  else return english;
};
