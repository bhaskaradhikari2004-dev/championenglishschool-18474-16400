import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Bell, Image, Trophy, Users, Phone, GraduationCap, ArrowRight, Sparkles, MapPin, Clock, Target, Eye, Heart, BookOpen, Award, Lightbulb, Baby, Quote } from "lucide-react";
import { WelcomePopup } from "@/components/WelcomePopup";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import heroSchool from "@/assets/hero-school.jpg";
import aboutStudents from "@/assets/about-students.jpg";
import aboutExcellence from "@/assets/about-excellence.jpg";
import aboutCommunity from "@/assets/about-community.jpg";
import aboutHolistic from "@/assets/about-holistic.jpg";

interface AboutInfo {
  mission: string;
  vision: string;
  values: string;
  welcome_title: string;
  welcome_description: string;
}

interface Leader {
  id: string;
  name: string;
  position: string;
  message: string;
  image_url?: string;
  display_order: number;
}

const Index = () => {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  
  // Scroll animations
  const heroAnim = useScrollAnimation(0.1);
  const leadershipAnim = useScrollAnimation(0.2);
  const aboutAnim = useScrollAnimation(0.2);
  const childCareAnim = useScrollAnimation(0.2);
  const contactAnim = useScrollAnimation(0.2);

  useEffect(() => {
    fetchAboutInfo();
    fetchLeaders();
  }, []);

  const fetchAboutInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('about_info')
        .select('*')
        .single();

      if (error) throw error;
      if (data) setAboutInfo(data);
    } catch (error) {
      console.error('Error fetching about info:', error);
    }
  };

  const fetchLeaders = async () => {
    try {
      const { data, error } = await supabase
        .from('leadership')
        .select('*')
        .eq('is_active', true)
        .ilike('position', '%principal%')
        .order('display_order', { ascending: true })
        .limit(1);

      if (error) throw error;
      if (data) setLeaders(data);
    } catch (error) {
      console.error('Error fetching leaders:', error);
    }
  };

  return (
    <Layout>
      <WelcomePopup />
      
      {/* Hero Section - Clean & Modern */}
      <section 
        ref={heroAnim.ref}
        className="relative text-white overflow-hidden"
      >
        <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSchool})` }}
          >
            {/* Simple Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Hero Content - Centered */}
          <div className={`absolute inset-0 flex items-center justify-center text-center px-4 transition-all duration-1000 ${
            heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="w-full max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                Champion English School
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-95 max-w-2xl mx-auto font-light">
                Unleashing the Champion within everyone
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all text-base px-8">
                  <Link to="/contact">
                    Schedule a Visit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section 
        ref={leadershipAnim.ref}
        className="py-6 md:py-8 lg:py-10 bg-background relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="space-y-8">
            {leaders.length > 0 ? (
              leaders.map((leader, index) => (
                <div 
                  key={leader.id} 
                  className={`space-y-4 transition-all duration-1000 ${
                    leadershipAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Section Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
                    Message from the {leader.position}
                  </h2>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center max-w-5xl mx-auto">
                    {/* Image Section */}
                    <div className={`flex justify-center lg:justify-${index % 2 === 0 ? 'end' : 'start'} ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      {leader.image_url ? (
                        <img
                          src={leader.image_url}
                          alt={leader.name}
                          className="w-full max-w-xs lg:max-w-sm rounded-2xl object-cover shadow-lg"
                        />
                      ) : (
                        <div className="w-full max-w-xs lg:max-w-sm aspect-square rounded-2xl bg-muted flex items-center justify-center">
                          <Users className="h-16 w-16 lg:h-20 lg:w-20 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Text Content */}
                    <div className={`space-y-3 lg:space-y-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      {/* Quote Mark */}
                      <Quote className="h-8 w-8 lg:h-10 lg:w-10 text-muted-foreground/30" />
                      
                      {/* Message Text */}
                      <p className="text-sm lg:text-base leading-relaxed text-foreground/80">
                        {leader.message}
                      </p>

                      {/* Read More Link */}
                      <a 
                        href="/leadership" 
                        className="inline-flex items-center gap-2 text-[#FFA500] hover:text-[#FF8C00] font-medium transition-colors text-sm"
                      >
                        Read More →
                      </a>

                      {/* Name in Script Font */}
                      <div className="pt-3 space-y-1">
                        <p className="text-xl lg:text-2xl font-script text-foreground">
                          {leader.name}
                        </p>
                        <p className="text-sm lg:text-base italic text-foreground/70">
                          {leader.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No leadership information available.</p>
              </div>
            )}
          </div>

          {/* View All Button */}
          {leaders.length > 0 && (
            <div className={`text-center mt-6 lg:mt-8 transition-all duration-1000 delay-600 ${
              leadershipAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <Button asChild className="hover-scale group">
                <Link to="/leadership">
                  Meet Our Full Leadership Team
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* About Section - Clean White */}
      <section 
        ref={aboutAnim.ref}
        className="py-16 md:py-20 lg:py-24 bg-white dark:bg-background"
      >
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            aboutAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Champion English School
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {aboutInfo?.welcome_description || 'At Champion English School, we are committed to providing quality education that shapes character, builds confidence, and prepares our students for success in every aspect of life.'}
            </p>
          </div>

          {/* Feature Cards - Simple & Clean */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {[
              { 
                icon: Award, 
                title: 'Academic Excellence', 
                text: 'Focus on academic excellence with experienced faculty',
                image: aboutExcellence,
                delay: 100
              },
              { 
                icon: Users, 
                title: 'Strong Community', 
                text: 'Building a supportive and inclusive learning community',
                image: aboutCommunity,
                delay: 200
              },
              { 
                icon: Lightbulb, 
                title: 'Holistic Development', 
                text: 'Nurturing mind, body, and character for complete growth',
                image: aboutHolistic,
                delay: 300
              }
            ].map((item) => (
              <Card 
                key={item.title}
                className={`group overflow-hidden hover:shadow-xl transition-all duration-500 bg-background border ${
                  aboutAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">
                      {item.title}
                    </CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Mission, Vision, Values - Clean Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 transition-all duration-1000 delay-400 ${
            aboutAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {[
              { 
                icon: Target, 
                title: 'Our Mission', 
                text: aboutInfo?.mission || 'Provide holistic education that develops excellence and character.'
              },
              { 
                icon: Eye, 
                title: 'Our Vision', 
                text: aboutInfo?.vision || 'Be a leading institution nurturing confident global citizens.'
              },
              { 
                icon: Heart, 
                title: 'Our Values', 
                text: aboutInfo?.values || 'Excellence, integrity, respect, and innovation.'
              }
            ].map((item) => (
              <Card 
                key={item.title} 
                className="text-center hover:shadow-xl transition-all duration-500 bg-muted/30 border"
              >
                <CardHeader className="pb-4">
                  <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-3">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <div className={`text-center mt-12 transition-all duration-1000 delay-600 ${
            aboutAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Button asChild size="lg" className="group">
              <Link to="/about">
                Discover More About Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Child Care Center Section - Clean */}
      <section 
        ref={childCareAnim.ref}
        className="py-16 md:py-20 lg:py-24 bg-muted/30"
      >
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            childCareAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Champion Child Care Centre
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discovering a world of learning and wonder, preparing children for a lifetime of joyful learning and academic success
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className={`bg-background hover:shadow-xl transition-all duration-500 ${
              childCareAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">
                    Open for Enrollment 2025/2026
                  </CardTitle>
                </div>
                <CardDescription className="text-base">
                  The Right Place to Play, Learn & Grow for Your Children
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                  <span className="text-sm text-muted-foreground">Breakfast, Lunch and Dinner</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                  <span className="text-sm text-muted-foreground">Learning by doing</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                  <span className="text-sm text-muted-foreground">Quiet home environment</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                  <span className="text-sm text-muted-foreground">In-school medical nurse</span>
                </div>
              </CardContent>
            </Card>

            <Card className={`bg-primary text-primary-foreground hover:shadow-xl transition-all duration-500 ${
              childCareAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '100ms' }}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  FREE Admission!
                </CardTitle>
                <CardDescription className="text-primary-foreground/90 text-base">
                  Special offer for 2025/2026 enrollment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5" />
                    <span className="font-semibold">Operating Hours</span>
                  </div>
                  <p className="text-sm">Sunday - Friday: 8:00 AM - 5:00 PM</p>
                </div>
                <div className="space-y-3">
                  <Button asChild className="w-full" variant="secondary" size="lg">
                    <Link to="/childcare">
                      Learn More About Child Care
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-primary-foreground/20 hover:bg-primary-foreground/10" size="lg">
                    <a href="tel:9814350277">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section - Clean */}
      <section 
        ref={contactAnim.ref}
        className="py-16 md:py-20 lg:py-24 bg-white dark:bg-background"
      >
        <div className="container mx-auto px-4">
          <div className={`max-w-5xl mx-auto transition-all duration-1000 ${
            contactAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Get in Touch
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                We're here to answer your questions and help you get started
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Visit Card */}
              <Card 
                className={`text-center hover:shadow-xl transition-all duration-500 bg-background ${
                  contactAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">Visit Us</CardTitle>
                  <CardDescription>Come see our school</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">Sayapatri Margha</p>
                  <p className="text-sm font-medium">Dharan-15, Nepal</p>
                </CardContent>
              </Card>

              {/* Call Card */}
              <a 
                href="tel:+977025530302"
                className={`block transition-all duration-500 ${
                  contactAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-500 h-full cursor-pointer bg-primary text-primary-foreground">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                      <Phone className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl mb-2">Call Us Now</CardTitle>
                    <CardDescription className="text-primary-foreground/80">Tap to call directly</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold">
                      +977-025-530302
                    </p>
                    <p className="text-sm text-primary-foreground/70 mt-2">Available during office hours</p>
                  </CardContent>
                </Card>
              </a>

              {/* Hours Card */}
              <Card 
                className={`text-center hover:shadow-xl transition-all duration-500 bg-background ${
                  contactAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">Office Hours</CardTitle>
                  <CardDescription>We're here to help</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">Sunday - Friday</p>
                  <p className="text-sm font-medium">10:00 AM - 4:00 PM</p>
                </CardContent>
              </Card>
            </div>
            
            <div className={`text-center mt-12 transition-all duration-1000 delay-300 ${
              contactAnim.isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  Send us a Message
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
