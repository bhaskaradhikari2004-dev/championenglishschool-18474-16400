import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/ui/file-upload";
import { Loader2, X, ArrowUp, ArrowDown } from "lucide-react";

interface PopupData {
  id: string;
  is_active: boolean;
}

interface PopupImage {
  id: string;
  popup_id: string;
  image_url: string;
  display_order: number;
}

export default function AdminWelcomePopup() {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [images, setImages] = useState<PopupImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPopup();
  }, []);

  const fetchPopup = async () => {
    try {
      const { data: popupData, error: popupError } = await supabase
        .from('welcome_popup')
        .select('*')
        .single();

      if (popupError && popupError.code !== 'PGRST116') throw popupError;

      if (popupData) {
        setPopup(popupData);
        
        const { data: imagesData, error: imagesError } = await supabase
          .from('popup_images')
          .select('*')
          .eq('popup_id', popupData.id)
          .order('display_order', { ascending: true });

        if (imagesError) throw imagesError;
        if (imagesData) setImages(imagesData);
      }
    } catch (error) {
      console.error('Error fetching popup:', error);
      toast({
        title: "Error",
        description: "Failed to load popup data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (checked: boolean) => {
    if (!popup) return;

    try {
      const { error } = await supabase
        .from('welcome_popup')
        .update({ is_active: checked })
        .eq('id', popup.id);

      if (error) throw error;

      setPopup({ ...popup, is_active: checked });
      toast({
        title: "Success",
        description: `Popup ${checked ? 'enabled' : 'disabled'}`,
      });
    } catch (error) {
      console.error('Error updating popup:', error);
      toast({
        title: "Error",
        description: "Failed to update popup status",
        variant: "destructive",
      });
    }
  };

  const handleUploadComplete = async (urls: string[]) => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Not authenticated');

      // Create popup if it doesn't exist
      let popupId = popup?.id;
      if (!popup) {
        const { data: newPopup, error: popupError } = await supabase
          .from('welcome_popup')
          .insert([{ is_active: true, created_by: user.id }])
          .select()
          .single();

        if (popupError) throw popupError;
        popupId = newPopup.id;
        setPopup(newPopup);
      }

      // Insert each uploaded image
      for (const url of urls) {
        const nextOrder = images.length > 0 ? Math.max(...images.map(i => i.display_order)) + 1 : 1;

        const { error: insertError } = await supabase
          .from('popup_images')
          .insert([{
            popup_id: popupId,
            image_url: url,
            display_order: nextOrder + urls.indexOf(url)
          }]);

        if (insertError) throw insertError;
      }

      toast({
        title: "Success",
        description: "Images uploaded successfully",
      });

      fetchPopup();
    } catch (error) {
      console.error('Error saving images:', error);
      toast({
        title: "Error",
        description: "Failed to save images",
        variant: "destructive",
      });
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      const { error } = await supabase
        .from('popup_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });

      fetchPopup();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  const moveImage = async (imageId: string, direction: 'up' | 'down') => {
    const currentIndex = images.findIndex(img => img.id === imageId);
    if (currentIndex === -1) return;
    if (direction === 'up' && currentIndex === 0) return;
    if (direction === 'down' && currentIndex === images.length - 1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const currentImage = images[currentIndex];
    const targetImage = images[targetIndex];

    try {
      const { error: error1 } = await supabase
        .from('popup_images')
        .update({ display_order: targetImage.display_order })
        .eq('id', currentImage.id);

      const { error: error2 } = await supabase
        .from('popup_images')
        .update({ display_order: currentImage.display_order })
        .eq('id', targetImage.id);

      if (error1 || error2) throw error1 || error2;

      fetchPopup();
    } catch (error) {
      console.error('Error reordering images:', error);
      toast({
        title: "Error",
        description: "Failed to reorder images",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome Popup Management</h1>
          <p className="text-muted-foreground">
            Manage up to 3 welcome popup images that appear when users visit the site
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Popup Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {popup && (
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={popup.is_active}
                      onCheckedChange={handleToggleActive}
                    />
                    <Label htmlFor="active">Show popup to visitors</Label>
                  </div>
                )}

                <div className="space-y-4">
                  <Label>Upload Images (Max 3)</Label>
                  <FileUpload
                    bucket="event-images"
                    accept="image/*"
                    multiple={true}
                    maxFiles={3 - images.length}
                    onUploadComplete={handleUploadComplete}
                  />
                  <p className="text-sm text-muted-foreground">
                    {images.length} of 3 images uploaded
                  </p>
                </div>
              </CardContent>
            </Card>

            {images.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Popup Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.image_url}
                          alt={`Popup Image ${index + 1}`}
                          className="w-full h-auto rounded-lg border"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            onClick={() => moveImage(image.id, 'up')}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            onClick={() => moveImage(image.id, 'down')}
                            disabled={index === images.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => deleteImage(image.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-center mt-2 text-muted-foreground">
                          Image {index + 1}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
