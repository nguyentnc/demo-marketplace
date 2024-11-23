declare module "@tailwindcss/forms";
declare module "@tailwindcss/aspect-ratio";

declare module "*.svg" {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  export default ReactComponent;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): promise<void>;
}

type ValueOf<T> = T[keyof T];

declare let window: Window & typeof globalThis;
