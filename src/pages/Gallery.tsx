import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image, Camera, FolderOpen, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  created_at: string;
}

interface Album {
  name: string;
  coverImage: string;
  photoCount: number;
  photos: GalleryItem[];
}

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group photos by category to create albums
  const albums: Album[] = Array.from(
    galleryItems.reduce((acc, item) => {
      const category = item.category || 'general';
      if (!acc.has(category)) {
        acc.set(category, {
          name: category,
          coverImage: item.image_url,
          photoCount: 0,
          photos: []
        });
      }
      const album = acc.get(category)!;
      album.photoCount++;
      album.photos.push(item);
      return acc;
    }, new Map<string, Album>())
  ).map(([_, album]) => album);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!selectedAlbum) return;
    const total = selectedAlbum.photos.length;
    if (direction === 'prev') {
      setLightboxIndex((prev) => (prev - 1 + total) % total);
    } else {
      setLightboxIndex((prev) => (prev + 1) % total);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading gallery...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <Camera className="h-16 w-16 mx-auto text-primary mb-6" />
          <h1 className="text-4xl font-bold mb-6">Photo Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore memories from our school events, activities, and daily life at Champion English School
          </p>
        </div>
      </section>

      {/* Albums or Photos View */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {selectedAlbum ? (
            <>
              {/* Back to Albums Button */}
              <Button 
                variant="ghost" 
                className="mb-6 gap-2"
                onClick={() => setSelectedAlbum(null)}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Albums
              </Button>
              
              <div className="mb-8">
                <h2 className="text-3xl font-bold capitalize">{selectedAlbum.name}</h2>
                <p className="text-muted-foreground">{selectedAlbum.photoCount} photos</p>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {selectedAlbum.photos.map((photo, index) => (
                  <div 
                    key={photo.id} 
                    className="aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={photo.image_url}
                      alt={photo.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                      <div className="p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm font-medium line-clamp-1">{photo.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {albums.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold mb-8 text-center">Photo Albums</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {albums.map((album) => (
                      <Card 
                        key={album.name} 
                        className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                        onClick={() => setSelectedAlbum(album)}
                      >
                        <div className="aspect-[4/3] relative overflow-hidden">
                          {/* Album Cover with stacked effect */}
                          <div className="absolute inset-0 bg-muted rounded transform rotate-2 scale-95 translate-y-1"></div>
                          <div className="absolute inset-0 bg-muted rounded transform -rotate-1 scale-97 translate-y-0.5"></div>
                          <img
                            src={album.coverImage}
                            alt={album.name}
                            className="object-cover w-full h-full relative z-10 group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"></div>
                          
                          {/* Photo count badge */}
                          <div className="absolute top-3 right-3 z-30">
                            <Badge className="bg-black/50 backdrop-blur-sm text-white border-0">
                              {album.photoCount} photos
                            </Badge>
                          </div>
                          
                          {/* Folder icon overlay */}
                          <div className="absolute bottom-3 left-3 z-30 flex items-center gap-2 text-white">
                            <FolderOpen className="h-5 w-5" />
                            <span className="font-semibold capitalize">{album.name}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <Image className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                  <h2 className="text-2xl font-semibold mb-4">No Photo Albums Available</h2>
                  <p className="text-muted-foreground">
                    Check back soon for photos from our school events and activities!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-0">
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Buttons */}
            {selectedAlbum && selectedAlbum.photos.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 z-50 text-white hover:bg-white/20 h-12 w-12"
                  onClick={() => navigateLightbox('prev')}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 z-50 text-white hover:bg-white/20 h-12 w-12"
                  onClick={() => navigateLightbox('next')}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Image */}
            {selectedAlbum && selectedAlbum.photos[lightboxIndex] && (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={selectedAlbum.photos[lightboxIndex].image_url}
                  alt={selectedAlbum.photos[lightboxIndex].title}
                  className="max-w-full max-h-[80vh] object-contain"
                />
                <div className="text-white text-center">
                  <p className="text-lg font-medium">{selectedAlbum.photos[lightboxIndex].title}</p>
                  {selectedAlbum.photos[lightboxIndex].description && (
                    <p className="text-sm text-white/70">{selectedAlbum.photos[lightboxIndex].description}</p>
                  )}
                  <p className="text-xs text-white/50 mt-2">
                    {lightboxIndex + 1} / {selectedAlbum.photos.length}
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}