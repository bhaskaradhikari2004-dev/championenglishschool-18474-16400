import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Image, Video } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface AboutMedia {
  id: string;
  title: string;
  description: string | null;
  media_url: string;
  media_type: string;
  section: string;
  display_order: number;
  is_active: boolean;
}

export default function AdminAboutMedia() {
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState<AboutMedia[]>([]);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media_type: "image",
    section: "gallery",
    display_order: 1,
    is_active: true,
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('about_media')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setMedia(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('about-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('about-media')
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from('about_media')
        .insert([{
          ...formData,
          media_url: publicUrl,
          created_by: user.id,
        }]);

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Media uploaded successfully",
      });

      setOpen(false);
      setFormData({
        title: "",
        description: "",
        media_type: "image",
        section: "gallery",
        display_order: 1,
        is_active: true,
      });
      setFile(null);
      fetchMedia();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, mediaUrl: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;

    try {
      const filePath = mediaUrl.split('/').pop();
      if (filePath) {
        await supabase.storage
          .from('about-media')
          .remove([filePath]);
      }

      const { error } = await supabase
        .from('about_media')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Media deleted successfully",
      });
      fetchMedia();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('about_media')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Media ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
      });
      fetchMedia();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">About Media</h1>
            <p className="text-muted-foreground">
              Manage photos and videos for the about section
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Media
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Media</DialogTitle>
                <DialogDescription>
                  Add a new photo or video to the about section
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="media_type">Media Type</Label>
                  <Select
                    value={formData.media_type}
                    onValueChange={(value) => setFormData({ ...formData, media_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Select
                    value={formData.section}
                    onValueChange={(value) => setFormData({ ...formData, section: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gallery">Gallery</SelectItem>
                      <SelectItem value="hero">Hero</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">File</Label>
                  <Input
                    id="file"
                    type="file"
                    accept={formData.media_type === 'image' ? 'image/*' : 'video/*'}
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <Button type="submit" disabled={uploading} className="w-full">
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Media"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((item) => (
            <Card key={item.id} className={!item.is_active ? "opacity-50" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {item.media_type === 'image' ? (
                      <Image className="h-5 w-5 text-primary" />
                    ) : (
                      <Video className="h-5 w-5 text-primary" />
                    )}
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                  <Switch
                    checked={item.is_active}
                    onCheckedChange={() => toggleActive(item.id, item.is_active)}
                  />
                </div>
                <CardDescription>
                  {item.section.charAt(0).toUpperCase() + item.section.slice(1)} • Order: {item.display_order}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {item.media_type === 'image' ? (
                    <img
                      src={item.media_url}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={item.media_url}
                      className="w-full h-48 object-cover rounded-lg"
                      controls
                    />
                  )}
                  {item.description && (
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id, item.media_url)}
                    className="w-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {media.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No media uploaded yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
