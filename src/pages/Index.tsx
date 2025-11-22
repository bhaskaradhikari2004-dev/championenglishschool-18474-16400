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
      
      {/* Hero Section */}
      <section 
        ref={heroAnim.ref}
        className="relative text-primary-foreground overflow-hidden"
      >
        {/* Image container with proper aspect ratio */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] lg:aspect-[21/9]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSchool})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-accent/30"></div>
          </div>
        
          {/* Animated background elements with 3D effect */}
          <div className="absolute inset-0 overflow-hidden transform-3d">
            <div className="absolute top-10 left-[5%] w-12 h-12 md:w-24 md:h-24 bg-white/10 rounded-full animate-float blur-sm"></div>
            <div className="absolute top-20 right-[10%] w-8 h-8 md:w-20 md:h-20 bg-white/5 rounded-full animate-bounce-gentle animation-delay-200 blur-sm"></div>
            <div className="absolute bottom-20 left-[15%] w-6 h-6 md:w-16 md:h-16 bg-white/10 rounded-full animate-float animation-delay-400 blur-sm"></div>
            <div className="absolute top-1/2 right-[20%] w-10 h-10 md:w-20 md:h-20 bg-accent/20 rounded-full animate-pulse animation-delay-600 blur-md"></div>
            <div className="absolute bottom-32 right-[8%] w-8 h-8 md:w-16 md:h-16 bg-white/15 rounded-full animate-float animation-delay-800 blur-sm"></div>
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-shimmer"></div>
          </div>
          
          <div className={`absolute inset-0 flex items-center justify-center text-center px-4 z-10 transition-all duration-1000 transform-3d ${
            heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="w-full max-w-4xl">
          <div className="flex justify-center mb-2 md:mb-3">
            <div className="relative transform-3d">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-white/30 rounded-full blur-2xl animate-pulse animation-delay-400 opacity-50"></div>
              <GraduationCap className="h-8 w-8 md:h-14 md:w-14 relative animate-bounce-gentle drop-shadow-2xl" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 md:h-5 md:w-5 animate-pulse text-accent-foreground drop-shadow-lg" />
              <Sparkles className="absolute -bottom-1 -left-1 h-2.5 w-2.5 md:h-4 md:w-4 animate-pulse animation-delay-600 text-white/90 drop-shadow-lg" />
            </div>
          </div>
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 transition-all duration-1000 delay-200 tracking-tight leading-tight ${
            heroAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            Champion English School
          </h1>
          <p className={`text-sm sm:text-base md:text-lg mb-2 md:mb-3 opacity-90 flex items-center justify-center gap-1.5 transition-all duration-1000 delay-300 ${
            heroAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base">Sayapatri Margha, Dharan-15, Nepal</span>
          </p>
          <p className={`text-xs sm:text-sm md:text-base mb-4 md:mb-5 opacity-80 max-w-2xl mx-auto font-medium transition-all duration-1000 delay-500 ${
            heroAnim.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            ✨ Unleashing the Champion within everyone ✨
          </p>
          <div className={`flex flex-col sm:flex-row gap-2 md:gap-3 justify-center px-4 transition-all duration-1000 delay-700 transform-3d ${
            heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Button asChild className="hover-scale group shadow-2xl h-11 md:h-10 text-sm md:text-base font-semibold relative overflow-hidden bg-gradient-to-r from-primary via-primary to-accent hover:from-accent hover:via-primary hover:to-primary transition-all duration-500 active:scale-95">
              <Link to="/about" className="relative z-10">
                <span className="relative z-10">Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                <span className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/20 border-2 border-white/40 text-white hover:bg-white/30 hover:border-white/60 hover-scale shadow-2xl backdrop-blur-md h-11 md:h-10 text-sm md:text-base font-semibold relative overflow-hidden group active:scale-95">
              <Link to="/contact">
                <span className="relative z-10">Contact Us</span>
                <span className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg"></span>
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
              <Button asChild className="hover-scale group shadow-xl h-11 md:h-10 text-sm md:text-base font-semibold bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-500 active:scale-95">
                <Link to="/leadership">
                  Meet Our Full Leadership Team
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutAnim.ref}
        className="py-6 md:py-10 lg:py-14 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden"
      >
        {/* Animated background patterns with 3D depth */}
        <div className="absolute inset-0 opacity-5 transform-3d">
          <div className="absolute top-20 right-10 w-48 h-48 md:w-64 md:h-64 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-48 h-48 md:w-64 md:h-64 bg-accent rounded-full blur-3xl animate-pulse animation-delay-400"></div>
          <div className="absolute top-1/3 left-1/3 w-56 h-56 md:w-80 md:h-80 bg-blue-500 rounded-full blur-3xl animate-float animation-delay-600"></div>
          {/* Diagonal gradient animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-transparent animate-shimmer"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-5 md:mb-7 transition-all duration-1000 ${
            aboutAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1.5">
              About Champion English School
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto">
              Where Excellence Meets Character Development
            </p>
          </div>

          {/* Main Hero Image Section */}
          <div className={`mb-6 md:mb-8 transition-all duration-1000 delay-200 transform-3d ${
            aboutAnim.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl group">
              <img 
                src={aboutStudents} 
                alt="Champion English School Students"
                className="w-full h-36 sm:h-48 md:h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 text-white">
                <h3 className="text-base md:text-xl lg:text-2xl font-bold mb-1">
                  {aboutInfo?.welcome_title || 'Nurturing Future Champions'}
                </h3>
                <p className="text-xs md:text-sm opacity-90 max-w-3xl line-clamp-2">
                  {aboutInfo?.welcome_description || 'At Champion English School, we are committed to providing quality education that shapes character, builds confidence, and prepares our students for success in every aspect of life.'}
                </p>
              </div>
            </div>
          </div>

          {/* Feature Cards with Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mb-5 md:mb-7">
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
                className={`group overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-primary/30 transform-3d ${
                  aboutAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <div className="relative h-28 md:h-36 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-transparent to-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <item.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm md:text-base group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission, Vision, Values Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mb-5 md:mb-7 transition-all duration-1000 delay-700 ${
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
                <CardHeader className="pb-2 md:pb-3 relative z-10">
                  <div className="mx-auto mb-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <item.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <CardTitle className="text-sm md:text-base">{item.title}</CardTitle>
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
            <Button asChild className="hover-scale group shadow-xl h-11 md:h-9 text-sm md:text-base font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transition-all duration-500 active:scale-95">
              <Link to="/about">
                Discover More About Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Child Care Center Section */}
      <section 
        ref={childCareAnim.ref}
        className="py-6 md:py-10 lg:py-14 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 relative overflow-hidden"
      >
        {/* Decorative elements with 3D depth */}
        <div className="absolute inset-0 opacity-10 transform-3d">
          <div className="absolute top-10 left-10 w-24 h-24 md:w-32 md:h-32 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 md:w-40 md:h-40 bg-amber-400 rounded-full blur-3xl animate-pulse animation-delay-400"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-float animation-delay-600"></div>
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-200/30 to-transparent animate-shimmer"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-5 md:mb-7 transition-all duration-1000 transform-3d ${
            childCareAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-block mb-2 relative">
              <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full animate-pulse"></div>
              <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-sm rounded-full p-2.5 md:p-3 relative transform-3d hover:scale-110 transition-transform duration-500">
                <Baby className="h-7 w-7 md:h-9 md:w-9 text-orange-600 dark:text-orange-400 animate-bounce-gentle" />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1.5 text-orange-900 dark:text-orange-100">
              Champion Child Care Centre
            </h2>
            <p className="text-xs md:text-sm text-orange-800/80 dark:text-orange-200/80 max-w-2xl mx-auto mb-2">
              Discovering a world of learning and wonder, preparing children for a lifetime of joyful learning and academic success
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-3 md:gap-5 mb-5">
            <Card className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-700 hover:shadow-2xl hover-scale transform-3d relative overflow-hidden group ${
              childCareAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader>
                <CardTitle className="text-base md:text-lg text-orange-900 dark:text-orange-100 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  Open for Enrollment 2025/2026
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-orange-800/70 dark:text-orange-200/70">
                  The Right Place to Play, Learn & Grow for Your Children
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Breakfast, Lunch and Dinner</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Learning by doing</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Quiet home environment</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600 flex-shrink-0"></div>
                  <span className="text-muted-foreground">In-school medical nurse</span>
                </div>
              </CardContent>
            </Card>

            <Card className={`bg-gradient-to-br from-orange-500 to-amber-600 text-white border-0 hover:shadow-2xl transition-all duration-700 hover-scale transform-3d relative overflow-hidden group ${
              childCareAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 via-transparent to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  FREE Admission!
                </CardTitle>
                <CardDescription className="text-white/90 text-sm md:text-base">
                  Special offer for 2025/2026 enrollment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold text-sm">Operating Hours</span>
                  </div>
                  <p className="text-xs md:text-sm text-white/90">Sunday - Friday: 8:00 AM - 5:00 PM</p>
                </div>
                <div className="space-y-2 pointer-events-auto relative z-20">
                  <Button asChild className="w-full group h-11 md:h-10 text-sm md:text-base font-semibold active:scale-95 pointer-events-auto shadow-xl hover:shadow-2xl transition-all duration-300 bg-white text-orange-600 hover:bg-white/90">
                    <Link to="/childcare" className="pointer-events-auto">
                      Learn More About Child Care
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full bg-white/30 border-2 border-white/50 text-white hover:bg-white/40 hover:border-white/70 h-11 md:h-10 text-sm md:text-base font-semibold active:scale-95 pointer-events-auto shadow-xl backdrop-blur-md">
                    <a href="tel:9814350277" className="pointer-events-auto">
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

      {/* Contact Section - Modern & Elegant */}
      <section 
        ref={contactAnim.ref}
        className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-blue-950/20 dark:via-gray-900 dark:to-orange-950/20 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl animate-pulse animation-delay-400"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full blur-3xl animate-pulse animation-delay-600"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-5xl mx-auto transition-all duration-1000 transform-3d ${
            contactAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-primary to-orange-600 bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                We're here to answer your questions and help you get started
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
              {/* Visit Card */}
              <Card 
                className={`group relative overflow-hidden border-2 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover-scale ${
                  contactAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer"></div>
                <CardHeader className="text-center pb-3">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-base md:text-lg mb-1">Visit Us</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Come see our school</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm md:text-base font-medium">Sayapatri Margha</p>
                  <p className="text-sm md:text-base font-medium">Dharan-15, Nepal</p>
                </CardContent>
              </Card>

              {/* Call Card - Clickable */}
              <a 
                href="tel:+977025530302"
                className={`block transition-all duration-500 hover-scale ${
                  contactAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <Card className="group relative overflow-hidden border-2 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl h-full cursor-pointer bg-gradient-to-br from-orange-500 to-amber-600 text-white">
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 via-transparent to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  <CardHeader className="text-center pb-3 relative z-10">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:bg-white/30">
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-base md:text-lg mb-1 text-white flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Call Us Now
                      <Sparkles className="h-4 w-4" />
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm text-white/90">Tap to call directly</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center relative z-10">
                    <p className="text-lg md:text-xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                      +977-025-530302
                    </p>
                    <p className="text-xs md:text-sm text-white/80 mt-2">Available during office hours</p>
                  </CardContent>
                </Card>
              </a>

              {/* Hours Card */}
              <Card 
                className={`group relative overflow-hidden border-2 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover-scale ${
                  contactAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer"></div>
                <CardHeader className="text-center pb-3">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-base md:text-lg mb-1">Office Hours</CardTitle>
                  <CardDescription className="text-xs md:text-sm">We're here to help</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm md:text-base font-medium">Sunday - Friday</p>
                  <p className="text-sm md:text-base font-medium">10:00 AM - 4:00 PM</p>
                </CardContent>
              </Card>
            </div>
            
            <div className={`text-center transition-all duration-1000 delay-400 ${
              contactAnim.isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <Button asChild className="group hover:shadow-2xl relative overflow-hidden h-12 md:h-11 px-6 md:px-8 text-base md:text-lg font-semibold bg-gradient-to-r from-blue-600 via-primary to-orange-600 hover:from-orange-600 hover:via-primary hover:to-blue-600 transition-all duration-500 active:scale-95 shadow-xl">
                <Link to="/contact">
                  <span className="relative z-10">Send us a Message</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg"></span>
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
