import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Bell, Image, Trophy, Users, Phone, GraduationCap, ArrowRight, Sparkles, MapPin, Clock, Target, Eye, Heart, BookOpen, Award, Lightbulb, Baby } from "lucide-react";
import { WelcomePopup } from "@/components/WelcomePopup";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
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
        .order('display_order', { ascending: true })
        .limit(3);

      if (error) throw error;
      if (data) setLeaders(data);
    } catch (error) {
      console.error('Error fetching leaders:', error);
    }
  };

  return (
    <Layout>
      <WelcomePopup />
      
      {/* Hero Section */}
      <section 
        ref={heroAnim.ref}
        className="relative bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground py-12 md:py-16 lg:py-20 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-[5%] w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full animate-float blur-sm"></div>
          <div className="absolute top-20 right-[10%] w-12 h-12 md:w-20 md:h-20 bg-white/5 rounded-full animate-bounce-gentle animation-delay-200 blur-sm"></div>
          <div className="absolute bottom-20 left-[15%] w-8 h-8 md:w-16 md:h-16 bg-white/10 rounded-full animate-float animation-delay-400 blur-sm"></div>
          <div className="absolute top-1/2 right-[20%] w-6 h-6 md:w-12 md:h-12 bg-white/5 rounded-full animate-pulse animation-delay-600"></div>
          <div className="absolute bottom-10 right-[30%] w-10 h-10 md:w-20 md:h-20 bg-white/10 rounded-full animate-bounce-gentle animation-delay-800 blur-sm"></div>
        </div>
        
        <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ${
          heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex justify-center mb-3 md:mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
              <GraduationCap className="h-10 w-10 md:h-16 md:w-16 relative animate-bounce-gentle drop-shadow-lg" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 md:h-6 md:w-6 animate-pulse text-accent-foreground drop-shadow-lg" />
            </div>
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 transition-all duration-1000 delay-200 tracking-tight ${
            heroAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            Champion English School
          </h1>
          <p className={`text-base sm:text-lg md:text-xl mb-2 md:mb-3 opacity-90 flex items-center justify-center gap-2 transition-all duration-1000 delay-300 ${
            heroAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <MapPin className="h-4 w-4 md:h-5 md:w-5" />
            Sayapatri Margha, Dharan-15, Nepal
          </p>
          <p className={`text-sm sm:text-base md:text-lg mb-5 md:mb-6 opacity-80 max-w-2xl mx-auto font-medium transition-all duration-1000 delay-500 ${
            heroAnim.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            ✨ Unleashing the Champion within everyone ✨
          </p>
          <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 transition-all duration-1000 delay-700 ${
            heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Button asChild size="lg" variant="secondary" className="hover-scale group shadow-lg text-sm md:text-base">
              <Link to="/about">
                Learn More
                <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover-scale shadow-lg text-sm md:text-base backdrop-blur-sm">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section 
        ref={leadershipAnim.ref}
        className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 dark:from-blue-950/30 dark:via-orange-950/30 dark:to-blue-900/30 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-orange-400 rounded-full blur-3xl animate-pulse animation-delay-400"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-2 transition-all duration-1000 ${
            leadershipAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Our Leadership
          </h2>
          <p className={`text-center text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            leadershipAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Meet the dedicated leaders guiding Champion English School toward excellence
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {leaders.length > 0 ? (
              leaders.map((leader, index) => (
                <Card 
                  key={leader.id} 
                  className={`text-center hover-scale hover:shadow-2xl transition-all duration-700 border-2 hover:border-primary/20 overflow-hidden group ${
                    leadershipAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative">
                    {leader.image_url ? (
                      <div className="relative mx-auto mb-4 w-28 h-28 md:w-32 md:h-32">
                        <img
                          src={leader.image_url}
                          alt={leader.name}
                          className="w-full h-full rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    ) : (
                      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                        <Users className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                      </div>
                    )}
                    <CardTitle className="text-base md:text-xl">{leader.name}</CardTitle>
                    <p className="text-primary font-semibold text-sm md:text-base">{leader.position}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs md:text-sm text-muted-foreground italic line-clamp-3">
                      "{leader.message}"
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                {[
                  { name: 'Netra Prasad Subedi', position: 'Director', message: 'Education is about shaping character and building confidence.' },
                  { name: 'Menuka Adhikari (Naju)', position: 'Principal', message: 'Every child is given the platform to shine and achieve their potential.' },
                  { name: 'Abeen Rai', position: 'Vice Principal', message: 'We guide students toward excellence and lifelong learning.' }
                ].map((leader, index) => (
                  <Card 
                    key={leader.name}
                    className={`text-center hover-scale hover:shadow-2xl transition-all duration-700 border-2 hover:border-primary/20 overflow-hidden group ${
                      leadershipAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader className="relative">
                      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                        <Users className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                      </div>
                      <CardTitle className="text-base md:text-xl">{leader.name}</CardTitle>
                      <p className="text-primary font-semibold text-sm md:text-base">{leader.position}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs md:text-sm text-muted-foreground italic">
                        "{leader.message}"
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
          <div className={`text-center mt-5 md:mt-6 transition-all duration-1000 delay-600 ${
            leadershipAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Button asChild size="sm" className="hover-scale group">
              <Link to="/leadership">
                Meet Our Full Leadership Team
                <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutAnim.ref}
        className="py-8 md:py-12 lg:py-16 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden"
      >
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-accent rounded-full blur-3xl animate-pulse animation-delay-400"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-6 md:mb-8 transition-all duration-1000 ${
            aboutAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              About Champion English School
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Where Excellence Meets Character Development
            </p>
          </div>

          {/* Main Hero Image Section */}
          <div className={`mb-8 md:mb-10 transition-all duration-1000 delay-200 ${
            aboutAnim.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={aboutStudents} 
                alt="Champion English School Students"
                className="w-full h-40 sm:h-56 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                  {aboutInfo?.welcome_title || 'Nurturing Future Champions'}
                </h3>
                <p className="text-xs md:text-sm lg:text-base opacity-90 max-w-3xl">
                  {aboutInfo?.welcome_description || 'At Champion English School, we are committed to providing quality education that shapes character, builds confidence, and prepares our students for success in every aspect of life.'}
                </p>
              </div>
            </div>
          </div>

          {/* Feature Cards with Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {[
              { 
                icon: Award, 
                title: 'Academic Excellence', 
                text: 'Focus on academic excellence with experienced faculty',
                image: aboutExcellence,
                delay: 300
              },
              { 
                icon: Users, 
                title: 'Strong Community', 
                text: 'Building a supportive and inclusive learning community',
                image: aboutCommunity,
                delay: 450
              },
              { 
                icon: Lightbulb, 
                title: 'Holistic Development', 
                text: 'Nurturing mind, body, and character for complete growth',
                image: aboutHolistic,
                delay: 600
              }
            ].map((item) => (
              <Card 
                key={item.title}
                className={`group overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-primary/30 ${
                  aboutAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <div className="relative h-32 md:h-40 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <item.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base md:text-lg group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission, Vision, Values Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 transition-all duration-1000 delay-700 ${
            aboutAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {[
              { 
                icon: Target, 
                title: 'Our Mission', 
                text: aboutInfo?.mission || 'Provide holistic education that develops excellence and character.',
                gradient: 'from-blue-500/10 to-blue-600/10'
              },
              { 
                icon: Eye, 
                title: 'Our Vision', 
                text: aboutInfo?.vision || 'Be a leading institution nurturing confident global citizens.',
                gradient: 'from-purple-500/10 to-purple-600/10'
              },
              { 
                icon: Heart, 
                title: 'Our Values', 
                text: aboutInfo?.values || 'Excellence, integrity, respect, and innovation.',
                gradient: 'from-pink-500/10 to-pink-600/10'
              }
            ].map((item, index) => (
              <Card 
                key={item.title} 
                className={`text-center hover-scale hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/30 overflow-hidden group bg-gradient-to-br ${item.gradient}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-3 relative z-10">
                  <div className="mx-auto mb-3 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <item.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                  </div>
                  <CardTitle className="text-base md:text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <div className={`text-center transition-all duration-1000 delay-900 ${
            aboutAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Button asChild size="sm" className="hover-scale group shadow-lg">
              <Link to="/about">
                Discover More About Us
                <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Child Care Center Section */}
      <section 
        ref={childCareAnim.ref}
        className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl animate-pulse animation-delay-400"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-6 md:mb-8 transition-all duration-1000 ${
            childCareAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-block mb-3">
              <div className="bg-orange-500/10 backdrop-blur-sm rounded-full p-3 md:p-4">
                <Baby className="h-8 w-8 md:h-10 md:w-10 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-orange-900 dark:text-orange-100">
              Champion Child Care Centre
            </h2>
            <p className="text-sm md:text-base text-orange-800/80 dark:text-orange-200/80 max-w-2xl mx-auto mb-3">
              Discovering a world of learning and wonder, preparing children for a lifetime of joyful learning and academic success
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Card className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-700 hover:shadow-2xl hover-scale ${
              childCareAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <CardHeader>
                <CardTitle className="text-xl text-orange-900 dark:text-orange-100 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Open for Enrollment 2025/2026
                </CardTitle>
                <CardDescription className="text-orange-800/70 dark:text-orange-200/70">
                  The Right Place to Play, Learn & Grow for Your Children
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                  <span className="text-muted-foreground">Breakfast, Lunch and Dinner</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                  <span className="text-muted-foreground">Learning by doing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                  <span className="text-muted-foreground">Quiet home environment</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                  <span className="text-muted-foreground">In-school medical nurse</span>
                </div>
              </CardContent>
            </Card>

            <Card className={`bg-gradient-to-br from-orange-500 to-amber-600 text-white border-0 hover:shadow-2xl transition-all duration-700 hover-scale ${
              childCareAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  FREE Admission!
                </CardTitle>
                <CardDescription className="text-white/90 text-base">
                  Special offer for 2025/2026 enrollment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5" />
                    <span className="font-semibold">Operating Hours</span>
                  </div>
                  <p className="text-sm text-white/90">Sunday - Friday: 8:00 AM - 5:00 PM</p>
                </div>
                <div className="space-y-2">
                  <Button asChild size="lg" variant="secondary" className="w-full group">
                    <Link to="/childcare">
                      Learn More About Child Care
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30">
                      <a href="tel:9814350277">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section - Compact & Elegant */}
      <section 
        ref={contactAnim.ref}
        className="py-8 md:py-12 bg-muted/30"
      >
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
            contactAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: MapPin, title: 'Visit', text: 'Sayapatri Margha, Dharan-15' },
                { icon: Phone, title: 'Call', text: '+977-025-530302' },
                { icon: Clock, title: 'Hours', text: 'Sun - Fri: 6AM - 5PM' }
              ].map((item, index) => (
                <div 
                  key={item.title}
                  className={`flex items-center gap-3 p-4 rounded-lg bg-card hover:shadow-md transition-all duration-300 ${
                    contactAnim.isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <item.icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={`text-center mt-6 transition-all duration-1000 delay-300 ${
              contactAnim.isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <Button asChild size="sm" variant="outline" className="group">
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
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
