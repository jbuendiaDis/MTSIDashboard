import { ReactNode, useMemo, useState } from 'react';
import { LoaderContext } from './LoaderContext';
import { LoaderContextType, Texts } from '../../models/loader';

interface Props {
  children: ReactNode;
}

const LoaderProvider = ({ children }: Props) => {
  const [loaderState, setLoaderState] = useState<boolean>(false);
  const [texts, setTexts] = useState<Texts>({
    topText: '',
    bottomText: '',
  });

  const handleChangeText = ({ topText, bottomText }: Texts) =>
    setTexts({ topText, bottomText });

  const contextValue: LoaderContextType = useMemo(
    () => ({
      loaderState,
      texts,
      handleShowLoader: setLoaderState,
      handleChangeText,
    }),
    [loaderState, texts]
  );

  return (
    <LoaderContext.Provider value={contextValue}>
      {children}
    </LoaderContext.Provider>
  );
};

export { LoaderProvider };
