import { APP_VERSION, BUILD_DATE, BUILD_TIME } from '@/config/version';

export const VersionFooter = () => {
  // Format the build time for display
  const formattedTime = new Date(BUILD_TIME).toLocaleString();
  
  return (
    <div 
      className="fixed bottom-2 right-2 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors select-none cursor-default"
      title={`Built: ${formattedTime}`}
    >
      v{APP_VERSION} • {BUILD_DATE}
    </div>
  );
};
