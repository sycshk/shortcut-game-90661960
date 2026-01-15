import { APP_VERSION, BUILD_DATE } from '@/config/version';

export const VersionFooter = () => {
  return (
    <div className="fixed bottom-2 right-2 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors select-none">
      <span title={`Built: ${BUILD_DATE}`}>
        v{APP_VERSION}
      </span>
    </div>
  );
};
