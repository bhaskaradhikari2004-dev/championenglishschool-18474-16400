import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Leader {
  id: string;
  name: string;
  position: string;
  message: string;
  image_url?: string;
  display_order: number;
  is_active: boolean;
}


export default function Leadership() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      const { data, error } = await supabase
        .from('leadership')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setLeaders(data || []);
    } catch (error) {
      console.error('Error fetching leaders:', error);
      setLeaders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading leadership information...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Leadership Team */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {leaders.map((leader, index) => (
              <div key={leader.id} className="space-y-6">
                {/* Section Title */}
                <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-12">
                  Message from the {leader.position}
                </h2>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
                  {/* Image Section */}
                  <div className="flex justify-center lg:justify-end">
                    {leader.image_url ? (
                      <img
                        src={leader.image_url}
                        alt={leader.name}
                        className="w-full max-w-md rounded-3xl object-cover shadow-xl"
                      />
                    ) : (
                      <div className="w-full max-w-md aspect-square rounded-3xl bg-muted flex items-center justify-center">
                        <Users className="h-32 w-32 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="space-y-6">
                    {/* Quote Mark */}
                    <Quote className="h-16 w-16 text-muted-foreground/30" />
                    
                    {/* Message Text */}
                    <p className="text-lg leading-relaxed text-foreground/80">
                      {leader.message}
                    </p>

                    {/* Read More Link */}
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 text-[#FFA500] hover:text-[#FF8C00] font-medium transition-colors"
                    >
                      Read More →
                    </a>

                    {/* Name in Script Font */}
                    <div className="pt-4 space-y-1">
                      <p className="text-3xl font-script text-foreground">
                        {leader.name}
                      </p>
                      <p className="text-lg italic text-foreground/70">
                        {leader.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}