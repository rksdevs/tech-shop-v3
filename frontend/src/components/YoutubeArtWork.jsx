import { cn } from "../lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ui/context-menu";

export function YoutubeArtwork({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  src,
  frameBorder,
  title,
  ...props
}) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            {/* <img
              src={album.cover}
              alt={album.name}
              width={width}
              height={height}
              className={cn(
                `h-auto w-auto object-cover transition-all hover:scale-105 h-${height}px w-${width}px`,
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            /> */}
            <iframe
              src={src}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title}
              height={height}
              aspectRatio={aspectRatio}
              width={250}
            ></iframe>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Go to Youtube</ContextMenuItem>
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {/* <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.name}</h3>
        <p className="text-xs text-muted-foreground">{album.artist}</p>
      </div> */}
    </div>
  );
}
