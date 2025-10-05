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
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <Users className="h-16 w-16 mx-auto text-primary mb-6" />
          <h1 className="text-4xl font-bold mb-6">Our Leadership</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated leaders who guide Champion English School toward excellence in education
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {leaders.map((leader, index) => (
              <Card key={leader.id} className="overflow-hidden">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Image Section */}
                  <div className={`bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    {leader.image_url ? (
                      <img
                        src={leader.image_url}
                        alt={leader.name}
                        className="w-48 h-48 rounded-full object-cover shadow-lg"
                      />
                    ) : (
                      <div className="w-48 h-48 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="h-24 w-24 text-primary" />
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold text-primary mb-2">{leader.position}</h2>
                        <h3 className="text-xl font-semibold mb-4">{leader.name}</h3>
                      </div>
                      
                      <div className="relative">
                        <Quote className="h-6 w-6 text-primary/30 absolute -top-2 -left-2" />
                        <p className="text-muted-foreground leading-relaxed pl-4 italic">
                          {leader.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Team Unity Message */}
          <Card className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">United in Purpose</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Together, our leadership team is committed to fostering an environment where every student 
                can discover their potential, develop their talents, and achieve their dreams. We work hand 
                in hand to ensure that Champion English School remains a beacon of quality education and 
                character development in our community.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}