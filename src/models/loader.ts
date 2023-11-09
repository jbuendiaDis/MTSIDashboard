export interface Texts {
    topText?: string;
    bottomText?: string;
  }
  
  export interface LoaderContextType {
    loaderState: boolean;
    texts?: Texts;
    handleShowLoader: (config: boolean) => void;
    handleChangeText?: (texts: Texts) => void;
  }
  