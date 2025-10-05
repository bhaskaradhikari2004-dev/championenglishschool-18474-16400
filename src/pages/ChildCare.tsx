import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, Phone, MapPin } from "lucide-react";
import childcareBanner from "@/assets/childcare-banner.png";

export default function ChildCare() {
  const features = [
    "Breakfast, Lunch and Dinner",
    "Learning by doing",
    "Quiet home environment",
    "Exposure to new habits/food",
    "Sensorial Development",
    "In-school medical nurse",
    "Nap time"
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Champion Child Care Centre
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discovering a world of learning and wonder, preparing children for a lifetime of joyful learning and academic success.
          </p>
        </div>

        {/* Banner Image */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={childcareBanner} 
            alt="Champion Child Care Centre Banner" 
            className="w-full h-auto"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* About Section */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                The Right Place to Play, Learn & Grow
              </h2>
              <p className="text-muted-foreground mb-6">
                Our Child Care Centre provides a nurturing environment where children can explore, learn, and develop essential skills for their future academic success. We believe in holistic development through play-based learning and structured activities.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Free Admission</h3>
                    <p className="text-sm text-muted-foreground">
                      We're currently offering free admission for the 2025/2026 enrollment period
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Operating Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Sunday - Friday: 8:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daycare Package Details */}
          <Card className="bg-primary/5">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">
                Daycare Package Details
              </h2>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-primary rounded-full p-1">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrollment Banner */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="py-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Open for Enrollment 2025/2026
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Give your child the best start in their educational journey
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="gap-2">
                <Phone className="h-5 w-5" />
                Call: 9814350277
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Phone className="h-5 w-5" />
                Call: 9842044143
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Location Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Dharan-15, Sagapatri Marga, Sunsari</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
