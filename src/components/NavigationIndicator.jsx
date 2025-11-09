import React from "react";
import { Badge } from "./ui/badge";
import { ChevronRight } from "lucide-react";

export function NavigationIndicator({
  currentSection,
  navigationHistory,
  getSectionDisplayName,
}) {
  if (navigationHistory.length <= 1) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <span>Navigation:</span>
        {navigationHistory.slice(-3).map((section, index, array) => (
          <React.Fragment key={section}>
            <Badge
              variant={section === currentSection ? "default" : "secondary"}
              className="text-xs"
            >
              {getSectionDisplayName(section)}
            </Badge>
            {index < array.length - 1 && <ChevronRight className="h-3 w-3" />}
          </React.Fragment>
        ))}

        {navigationHistory.length > 3 && (
          <>
            <span className="text-muted-foreground">...</span>
            <Badge variant="secondary" className="text-xs">
              +{navigationHistory.length - 3} more
            </Badge>
          </>
        )}
      </div>
    </div>
  );
}
