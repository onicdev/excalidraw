import React, { useEffect, useRef } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { createRoot } from "react-dom/client";
import { canvasToBlob } from "../data/blob";
import { NonDeletedExcalidrawElement } from "../element/types";
import { CanvasError } from "../errors";
import { t } from "../i18n";
import { getSelectedElements, isSomeElementSelected } from "../scene";
import { exportToCanvas } from "../scene/export";
import { AppState, BinaryFiles } from "../types";
import { DEFAULT_EXPORT_PADDING } from "../constants";
import { ExportType } from "../scene/types";
import { exportCanvas } from "../data";
import { muteFSAbortError } from "../utils";
import { isImageFileHandle } from "../data/blob";

export const ErrorCanvasPreview = () => {
  return (
    <div>
      <h3>{t("canvasError.cannotShowPreview")}</h3>
      <p>
        <span>{t("canvasError.canvasTooBig")}</span>
      </p>
      <em>({t("canvasError.canvasTooBigTip")})</em>
    </div>
  );
};

const renderPreview = (
  content: HTMLCanvasElement | Error,
  previewNode: HTMLDivElement,
) => {
  unmountComponentAtNode(previewNode);
  previewNode.innerHTML = "";
  if (content instanceof HTMLCanvasElement) {
    previewNode.appendChild(content);
  } else {
    render(<ErrorCanvasPreview />, previewNode);
  }
};

export type ExportCB = (
  elements: readonly NonDeletedExcalidrawElement[],
  scale?: number,
) => void;

const CanvasExportPreview = ({
  exportedElements,
  appState,
  files,
  exportPadding = DEFAULT_EXPORT_PADDING,
}: {
  appState: AppState;
  exportedElements: readonly NonDeletedExcalidrawElement[];
  files: BinaryFiles;
  exportPadding?: number;
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { exportBackground, viewBackgroundColor } = appState;

  useEffect(() => {
    const previewNode = previewRef.current;
    if (!previewNode) {
      return;
    }
    exportToCanvas(exportedElements, appState, files, {
      exportBackground,
      viewBackgroundColor,
      exportPadding,
    })
      .then((canvas) => {
        // if converting to blob fails, there's some problem that will
        // likely prevent preview and export (e.g. canvas too big)
        return canvasToBlob(canvas).then(() => {
          renderPreview(canvas, previewNode);
        });
      })
      .catch((error) => {
        console.error(error);
        renderPreview(new CanvasError(), previewNode);
      });
  }, [
    appState,
    files,
    exportedElements,
    exportBackground,
    exportPadding,
    viewBackgroundColor,
  ]);

  return (
    <div>
      <div className="ExportDialog__preview" ref={previewRef} />
    </div>
  );
};

const renderCanvasExportPreview = ({
  elements,
  appState,
  files,
  onExportToPng,
  onExportToSvg,
  onExportToClipboard,
}: {
  elements: readonly NonDeletedExcalidrawElement[];
  appState: AppState;
  files: BinaryFiles;
  onExportToPng: ExportCB;
  onExportToSvg: ExportCB;
  onExportToClipboard: ExportCB;
}) => {
  const someElementIsSelected = isSomeElementSelected(elements, appState);

  const exportedElements = someElementIsSelected
    ? getSelectedElements(elements, appState, true)
    : elements;

  const render = () => {
    createRoot(
      document.getElementById("canvas-export-preview") as HTMLElement,
    ).render(
      <React.StrictMode>
        <CanvasExportPreview
          exportedElements={exportedElements}
          appState={appState}
          files={files}
        />
      </React.StrictMode>,
    );
  };
  return {
    render,
    onExportToPng,
    onExportToSvg,
    onExportToClipboard,
  };
};

export const initCanvasExportPreview = ({
  elements,
  appState,
  files,
  setAppState,
}: {
  elements: readonly NonDeletedExcalidrawElement[];
  appState: AppState;
  files: BinaryFiles;
  setAppState: React.Component<any, AppState>["setState"];
}) => {
  const createExporter =
    (type: ExportType): ExportCB =>
    async (exportedElements) => {
      const fileHandle = await exportCanvas(
        type,
        exportedElements,
        appState,
        files,
        {
          exportBackground: appState.exportBackground,
          name: appState.name,
          viewBackgroundColor: appState.viewBackgroundColor,
        },
      )
        .catch(muteFSAbortError)
        .catch((error) => {
          console.error(error);
          setAppState({ errorMessage: error.message });
        });

      if (
        appState.exportEmbedScene &&
        fileHandle &&
        isImageFileHandle(fileHandle)
      ) {
        setAppState({ fileHandle });
      }
    };

  const onExportToPng = createExporter("png");
  const onExportToSvg = createExporter("svg");
  const onExportToClipboard = createExporter("clipboard");

  return renderCanvasExportPreview({
    elements,
    appState,
    files,
    onExportToPng,
    onExportToSvg,
    onExportToClipboard,
  });
};
