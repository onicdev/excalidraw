import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { createPortal } from "react-dom";
import { canvasToBlob } from "../data/blob";
import { NonDeletedExcalidrawElement } from "../element/types";
import { CanvasError } from "../errors";
import { t } from "../i18n";
import { getSelectedElements, isSomeElementSelected } from "../scene";
import { exportToCanvas } from "../scene/export";
import { AppState, BinaryFiles } from "../types";
import { DEFAULT_EXPORT_PADDING } from "../constants";

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

type CanvasExportPreviewProps = {
  appState: AppState;
  elements: readonly NonDeletedExcalidrawElement[];
  files: BinaryFiles;
  onExportToPng: ExportCB;
  onExportToSvg: ExportCB;
  onExportToClipboard: ExportCB;
};

type CanvasExportPreviewState = {
  modalRootEl: HTMLElement;
  el: HTMLDivElement;
};

export class CanvasExportPreview extends React.Component<
  CanvasExportPreviewProps,
  CanvasExportPreviewState
> {
  exportedElements: readonly NonDeletedExcalidrawElement[] = [];

  constructor(props: CanvasExportPreviewProps) {
    super(props);

    this.state = {
      modalRootEl: document.getElementById(
        "canvas-export-preview",
      ) as HTMLElement,
      el: document.createElement("div"),
    };
    // @ts-ignore
    this.previewRef = React.createRef();
  }

  componentDidMount() {
    this.state.modalRootEl.appendChild(this.state.el);
    window.addEventListener("exportCanvasToPng", this.exportToPng);
    window.addEventListener("exportCanvasToSvg", this.exportToSvg);
    window.addEventListener("exportCanvasToClipboard", this.exportToClipboard);
    this.renderCanvas();
  }

  componentDidUpdate(): void {
    this.renderCanvas();
  }

  componentWillUnmount() {
    this.state.modalRootEl.removeChild(this.state.el);
    window.removeEventListener("exportCanvasToPng", this.exportToPng);
    window.removeEventListener("exportCanvasToSvg", this.exportToSvg);
    window.removeEventListener(
      "exportCanvasToClipboard",
      this.exportToClipboard,
    );
  }

  renderCanvas = () => {
    // @ts-ignore
    const previewNode = this.previewRef.current;

    if (!previewNode) {
      return;
    }

    const { exportBackground, viewBackgroundColor } = this.props.appState;
    const exportPadding = DEFAULT_EXPORT_PADDING;

    const someElementIsSelected = isSomeElementSelected(
      this.props.elements,
      this.props.appState,
    );
    this.exportedElements = someElementIsSelected
      ? getSelectedElements(this.props.elements, this.props.appState, true)
      : this.props.elements;

    exportToCanvas(
      this.exportedElements,
      this.props.appState,
      this.props.files,
      {
        exportBackground,
        viewBackgroundColor,
        exportPadding,
      },
    )
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
  };

  exportToPng = () => {
    this.props.onExportToPng(this.exportedElements);
  };

  exportToSvg = () => {
    this.props.onExportToSvg(this.exportedElements);
  };

  exportToClipboard = () => {
    this.props.onExportToClipboard(this.exportedElements);
  };

  // @ts-ignore
  render(): React.ReactPortal {
    // @ts-ignore
    return createPortal(
      // @ts-ignore
      <div className="ExportDialog__preview" ref={this.previewRef} />,
      this.state.el,
    );
  }
}
