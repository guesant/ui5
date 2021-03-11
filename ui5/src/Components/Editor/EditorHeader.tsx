import { useModal } from "@guesant/ui5-lib";
import {
  AllOverflowMenuItemProps,
  OverflowMenu,
  OverflowMenuItem,
} from "carbon-components-react";
import { createElement, Fragment, useContext } from "react";
import styles from "./Editor.module.css";
import { EditorContext } from "./Hooks/EditorContext";
import { IModalComponent } from "./Modals/IModalComponent";
import { ModalNewProject } from "./Modals/ModalNewProject";
import { ModalOpenProject } from "./Modals/ModalOpenProject";

type SupportedHeaderModals = "openProject" | "newProject";

/* Modals */

const ModalItemOpenProject: IHeaderModalItem = [
  ModalOpenProject,
  "openProject",
];

const ModalItemNewProject: IHeaderModalItem = [ModalNewProject, "newProject"];

const HeaderModals: IHeaderModalItem[] = [
  ModalItemNewProject,
  ModalItemOpenProject,
];

type IHeaderModalItem = [IModalComponent, SupportedHeaderModals];

/* End Modals */

/* Menu */

const MenuItemNewProject: IHeaderMenuItem = [
  { itemText: "Novo" },
  "newProject",
];

const MenuItemOpenProject: IHeaderMenuItem = [
  { itemText: "Abrir" },
  "openProject",
];
const HeaderMenuItems: IHeaderMenuItem[] = [
  MenuItemOpenProject,
  MenuItemNewProject,
];

type IHeaderMenuItem =
  | [
      AllOverflowMenuItemProps,
      SupportedHeaderModals,
      { strictProject?: boolean },
    ]
  | [AllOverflowMenuItemProps, SupportedHeaderModals];

/* End Menu */

const EditorHeader = () => {
  const { currentProject } = useContext(EditorContext);
  const { isOpened, openActionCreator } = useModal<SupportedHeaderModals>();
  return (
    <div className={styles.editorHeader}>
      <OverflowMenu>
        {HeaderMenuItems.map(([props, action, config], idx) => (
          <OverflowMenuItem
            {...props}
            key={action ?? idx}
            onClick={() => action && openActionCreator(action)(true)}
            {...{ disabled: config?.strictProject && !currentProject }}
          />
        ))}
      </OverflowMenu>
      {HeaderModals.map(([component, name]) => (
        <Fragment
          key={name}
          children={createElement(component, {
            isOpen: isOpened(name),
            setIsOpen: openActionCreator(name),
          })}
        />
      ))}
    </div>
  );
};

export default EditorHeader;
