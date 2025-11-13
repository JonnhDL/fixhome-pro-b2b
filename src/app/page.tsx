import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Hammer, Users, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { format } from 'date-fns';

const heroImage = placeholderImages.find(p => p.id === 'hero');

const featureIcons = {
  "Empresa": Building,
  "Profissional": Hammer,
  "Cliente": Users,
};

const featuredProjects = [
  {
    id: '1',
    title: 'Renovação de Fachada de Edifício Comercial',
    client: 'Urban Properties Inc.',
    budget: 150000,
    deadline: format(new Date().setDate(new Date().getDate() + 30), 'dd/MM/yyyy'),
    status: 'Open',
    imageUrl: placeholderImages.find(p => p.id === 'project1')?.imageUrl || '',
    imageHint: placeholderImages.find(p => p.id === 'project1')?.imageHint || '',
  },
  {
    id: '2',
    title: 'Construção de Moradia Unifamiliar T4',
    client: 'Família Silva',
    budget: 350000,
    deadline: format(new Date().setDate(new Date().getDate() + 60), 'dd/MM/yyyy'),
    status: 'In Review',
    imageUrl: placeholderImages.find(p => p.id === 'project2')?.imageUrl || '',
    imageHint: placeholderImages.find(p => p.id === 'project2')?.imageHint || '',
  },
  {
    id: '3',
    title: 'Instalação de Sistema AVAC em Escritórios',
    client: 'Tech Solutions LDA',
    budget: 75000,
    deadline: format(new Date().setDate(new Date().getDate() + 15), 'dd/MM/yyyy'),
    status: 'Awarded',
    imageUrl: placeholderImages.find(p => p.id === 'project3')?.imageUrl || '',
    imageHint: placeholderImages.find(p => p.id === 'project3')?.imageHint || '',
  },
];

export default async function Home() {
  const dict = await getDictionary('pt');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card">
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover z-0"
                data-ai-hint={heroImage.imageHint}
                priority
             />
          )}
          <div className="container mx-auto px-4 md:px-6 z-10 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 bg-black/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="space-y-2">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                    {dict.home.hero.title}
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
                    {dict.home.hero.subtitle}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/auth/register">
                      {dict.home.hero.cta_register}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/dashboard">
                      {dict.home.hero.cta_explore}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge>{dict.home.how_it_works.badge}</Badge>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                  {dict.home.how_it_works.title}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {dict.home.how_it_works.subtitle}
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {dict.home.how_it_works.steps.map((step, index) => {
                const Icon = featureIcons[step.for as keyof typeof featureIcons];
                return (
                  <div key={index} className="grid gap-4 p-6 rounded-lg bg-card shadow-md transition-transform hover:scale-105">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full p-3">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-headline text-lg font-bold">{step.title}</h3>
                    </div>
                    <ul className="grid gap-2 text-sm text-muted-foreground">
                      {step.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 mt-1 shrink-0 text-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="featured-projects" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                  {dict.home.featured_projects.title}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {dict.home.featured_projects.subtitle}
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden transition-shadow hover:shadow-xl">
                  <CardHeader className="p-0">
                    <Image
                      src={project.imageUrl}
                      alt={`Image for ${project.title}`}
                      width={600}
                      height={400}
                      className="aspect-video w-full object-cover"
                      data-ai-hint={project.imageHint}
                    />
                  </CardHeader>
                  <CardContent className="p-6 space-y-2">
                    <Badge variant={project.status === 'Open' ? 'default' : 'secondary'}>{project.status}</Badge>
                    <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                    <CardDescription>por {project.client}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex justify-between items-center text-sm text-muted-foreground">
                    <span>Prazo: {project.deadline}</span>
                    <Button variant="link" asChild>
                      <Link href={`/dashboard/projects/${project.id}`}>
                        Ver Detalhes <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
