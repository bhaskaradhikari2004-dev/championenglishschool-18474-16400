import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

interface AboutInfo {
  id: string;
  mission: string;
  vision: string;
  values: string;
  welcome_title: string;
  welcome_description: string;
}

export default function AdminAboutInfo() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [info, setInfo] = useState<AboutInfo | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAboutInfo();
  }, []);

  const fetchAboutInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('about_info')
        .select('*')
        .single();

      if (error) throw error;
      setInfo(data);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!info) return;

    setSaving(true);

    try {
      const { error } = await supabase
        .from('about_info')
        .update({
          mission: info.mission,
          vision: info.vision,
          values: info.values,
          welcome_title: info.welcome_title,
          welcome_description: info.welcome_description,
          updated_at: new Date().toISOString()
        })
        .eq('id', info.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "About information updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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

  if (!info) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">No about information found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">About Information</h1>
          <p className="text-muted-foreground">
            Manage the about section content displayed on the homepage and about page
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Section</CardTitle>
              <CardDescription>
                Content shown in the welcome section on the homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcome-title">Welcome Title</Label>
                <Input
                  id="welcome-title"
                  value={info.welcome_title}
                  onChange={(e) => setInfo({ ...info, welcome_title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcome-description">Welcome Description</Label>
                <Textarea
                  id="welcome-description"
                  value={info.welcome_description}
                  onChange={(e) => setInfo({ ...info, welcome_description: e.target.value })}
                  required
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mission, Vision & Values</CardTitle>
              <CardDescription>
                Core values and goals of the institution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea
                  id="mission"
                  value={info.mission}
                  onChange={(e) => setInfo({ ...info, mission: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vision">Vision Statement</Label>
                <Textarea
                  id="vision"
                  value={info.vision}
                  onChange={(e) => setInfo({ ...info, vision: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="values">Core Values</Label>
                <Textarea
                  id="values"
                  value={info.values}
                  onChange={(e) => setInfo({ ...info, values: e.target.value })}
                  required
                  rows={3}
                  placeholder="Separate values with commas"
                />
                <p className="text-sm text-muted-foreground">
                  Enter values separated by commas (e.g., Excellence, Integrity, Innovation)
                </p>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" disabled={saving} size="lg">
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
