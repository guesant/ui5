import styles from "./Editor.module.css";
import EditorFooter from "./EditorFooter";
import EditorHeader from "./EditorHeader";
import EditorLeft from "./EditorLeft";
import EditorRight from "./EditorRight";
import EditorToolbar from "./EditorToolbar";
import { EditorContextProvider } from "./Hooks/EditorContextProvider";

const Editor = () => {
  return (
    <div className={styles.editor}>
      <EditorContextProvider
        children={
          <>
            <EditorHeader />
            <EditorToolbar />
            <EditorLeft />
            <EditorRight />
            <EditorFooter />
          </>
        }
      />
    </div>
  );
};

export default Editor;
