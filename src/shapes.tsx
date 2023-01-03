import {
  ArrowIcon,
  DiamondIcon,
  DiamondIconSolid,
  EllipseIcon,
  EllipseIconSolid,
  StickerIcon,
  StickerIconSolid,
  // EraserIcon,
  // FreedrawIcon,
  // ImageIcon,
  LineIcon,
  RectangleIcon,
  RectangleIconSolid,
  SelectionIcon,
  SelectionIconSolid,
  // TextIcon,
} from "./components/icons";
import { KEYS } from "./keys";

export const SHAPES = [
  {
    icon: SelectionIcon,
    solidIcon: SelectionIconSolid,
    value: "selection",
    key: KEYS.V,
    numericKey: KEYS["1"],
    fillable: true,
  },
  {
    icon: StickerIcon,
    solidIcon: StickerIconSolid,
    value: "sticker",
    key: KEYS.S,
    numericKey: KEYS["2"],
    fillable: true,
  },
  {
    icon: RectangleIcon,
    solidIcon: RectangleIconSolid,
    value: "rectangle",
    key: KEYS.R,
    numericKey: KEYS["3"],
    fillable: true,
  },
  {
    icon: DiamondIcon,
    solidIcon: DiamondIconSolid,
    value: "diamond",
    key: KEYS.D,
    numericKey: KEYS["4"],
    fillable: true,
  },
  {
    icon: EllipseIcon,
    solidIcon: EllipseIconSolid,
    value: "ellipse",
    key: KEYS.O,
    numericKey: KEYS["5"],
    fillable: true,
  },
  {
    icon: ArrowIcon,
    solidIcon: null,
    value: "arrow",
    key: KEYS.A,
    numericKey: KEYS["6"],
    fillable: true,
  },
  {
    icon: LineIcon,
    solidIcon: null,
    value: "line",
    key: KEYS.L,
    numericKey: KEYS["7"],
    fillable: true,
  },
  {
    icon: (
      // fa-pencil
      <svg viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M15.399 3.13256C16.909 1.62248 19.3574 1.62248 20.8674 3.13256C22.3775 4.64263 22.3775 7.09095 20.8674 8.60103L9.61215 19.8563C8.90715 20.5613 8.00925 21.0419 7.03159 21.2374L3.32953 21.9778C2.55213 22.1333 1.86671 21.4479 2.02219 20.6705L2.7626 16.9684C2.95814 15.9908 3.43868 15.0928 4.14368 14.3879L15.399 3.13256ZM19.4391 4.56094C18.7179 3.83974 17.5486 3.83974 16.8274 4.56094L14.5115 6.87681L17.1232 9.48851L19.4391 7.17264C20.1603 6.45144 20.1603 5.28214 19.4391 4.56094ZM15.6948 10.9169L13.0831 8.3052L5.57206 15.8162C5.14906 16.2392 4.86074 16.778 4.74342 17.3646L4.27042 19.7296L6.63543 19.2566C7.22202 19.1393 7.76076 18.8509 8.18376 18.4279L15.6948 10.9169Z"
        />
      </svg>
    ),
    solidIcon: (
      <svg viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.8674 3.13256C19.3574 1.62248 16.909 1.62248 15.399 3.13256L13.0783 5.45326L18.5467 10.9217L20.8674 8.60103C22.3775 7.09095 22.3775 4.64264 20.8674 3.13256ZM17.1325 12.3359L11.6641 6.86748L4.14368 14.3879C3.43868 15.0928 2.95814 15.9908 2.7626 16.9684L2.02219 20.6705C1.86671 21.4479 2.55213 22.1333 3.32953 21.9778L7.03159 21.2374C8.00925 21.0419 8.90715 20.5613 9.61215 19.8563L17.1325 12.3359Z"
        />
      </svg>
    ),
    value: "freedraw",
    key: [KEYS.P, KEYS.X],
    numericKey: KEYS["8"],
    fillable: true,
  },
  {
    icon: (
      // fa-font
      <svg viewBox="0 0 24 24">
        <path d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5C19 5.55228 18.5523 6 18 6H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V6H6C5.44772 6 5 5.55228 5 5Z" />
      </svg>
    ),
    solidIcon: null,
    value: "text",
    key: KEYS.T,
    numericKey: KEYS["9"],
    fillable: false,
  },
  {
    icon: (
      // fa-image
      <svg viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M18 4H6C4.89543 4 4 4.89543 4 6V18C4 18.8016 4.47158 19.493 5.15245 19.8121L12.4518 12.4849C14.4089 10.5204 17.5908 10.5237 19.5437 12.4922L20 12.9522V6C20 4.89543 19.1046 4 18 4ZM20 15.792L18.1238 13.9008C16.9521 12.7197 15.043 12.7177 13.8687 13.8964L7.78828 20H18C19.1046 20 20 19.1046 20 18V15.792ZM6 2C3.79086 2 2 3.79086 2 6V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V6C22 3.79086 20.2091 2 18 2H6ZM9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10ZM9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z"
        />
      </svg>
    ),
    solidIcon: (
      <svg viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M18 4H6C4.89543 4 4 4.89543 4 6V18C4 18.8016 4.47158 19.493 5.15245 19.8121L12.4518 12.4849C14.4089 10.5204 17.5908 10.5237 19.5437 12.4922L20 12.9522V6C20 4.89543 19.1046 4 18 4ZM6 2C3.79086 2 2 3.79086 2 6V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V6C22 3.79086 20.2091 2 18 2H6ZM9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z"
        />
      </svg>
    ),
    value: "image",
    key: null,
    numericKey: KEYS["0"],
  },
  // {
  //   icon: EraserIcon,
  //   value: "eraser",
  //   key: KEYS.E,
  //   numericKey: KEYS["0"],
  //   fillable: false,
  // },
] as const;

export const findShapeByKey = (key: string) => {
  const shape = SHAPES.find((shape, index) => {
    return (
      (shape.numericKey != null && key === shape.numericKey.toString()) ||
      (shape.key &&
        (typeof shape.key === "string"
          ? shape.key === key
          : (shape.key as readonly string[]).includes(key)))
    );
  });
  return shape?.value || null;
};
