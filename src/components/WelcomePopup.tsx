import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PopupImage {
  id: string;
  image_url: string;
  display_order: number;
}

export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<PopupImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    fetchActivePopup();
  }, []);

  useEffect(() => {
    // Show popup on first load after images are fetched
    if (!hasShown && images.length > 0) {
      const timer = setTimeout(() => {
        setOpen(true);
        setCurrentIndex(0);
        setHasShown(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [images, hasShown]);

  const fetchActivePopup = async () => {
    try {
      const { data: popupData, error: popupError } = await supabase
        .from('welcome_popup')
        .select('id')
        .eq('is_active', true)
        .single();

      if (popupError) throw popupError;

      if (popupData) {
        const { data: imagesData, error: imagesError } = await supabase
          .from('popup_images')
          .select('*')
          .eq('popup_id', popupData.id)
          .order('display_order', { ascending: true });

        if (imagesError) throw imagesError;

        if (imagesData && imagesData.length > 0) {
          setImages(imagesData);
        }
      }
    } catch (error) {
      // Silently handle error when no popup is configured
      if (error && typeof error === 'object' && 'code' in error && error.code !== 'PGRST116') {
        console.error('Error fetching welcome popup:', error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    
    // Show next popup after a short delay if there are more
    if (currentIndex < images.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setOpen(true);
      }, 500); // Half second delay between popups
    }
  };

  if (images.length === 0 || currentIndex >= images.length) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl p-0 overflow-hidden border-0">
        <div className="relative w-full">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet={currentImage.image_url}
              width="640"
            />
            <source
              media="(max-width: 1024px)"
              srcSet={currentImage.image_url}
              width="1024"
            />
            <img
              src={currentImage.image_url}
              alt={`Welcome Banner ${currentIndex + 1}`}
              className="w-full h-auto object-contain max-h-[85vh] sm:max-h-[80vh] md:max-h-[75vh]"
              loading="eager"
              decoding="async"
            />
          </picture>
          {images.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-white w-4 sm:w-6'
                      : index < currentIndex
                      ? 'bg-white/50'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
