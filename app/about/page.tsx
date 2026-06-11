'use client';

import { useState, useEffect } from 'react';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Award, Briefcase, BookOpen } from 'lucide-react';

interface Education {
  institution: string;
  degree: string;
  year: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface InstructorData {
  education: Education[];
  experience: Experience[];
  teachingProfile: {
    yearsTeaching: number;
    studentsImpacted: number;
    philosophy: string;
    approach: string;
    highlights: string[];
  };
}

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<'biography' | 'education' | 'experience' | 'teaching'>('biography');
  const [data, setData] = useState<InstructorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/instructor.json');
        const instructorData = await res.json();
        setData(instructorData);
      } catch (error) {
        console.error('[v0] Error loading instructor data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const sections = [
    { id: 'biography', label: 'Biografía', icon: BookOpen },
    { id: 'education', label: 'Formación', icon: Award },
    { id: 'experience', label: 'Experiencia', icon: Briefcase },
    { id: 'teaching', label: 'Docencia', icon: BookOpen },
  ] as const;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            Acerca de <span className="glow-text">Mí</span>
          </h1>
          <p className="text-muted-foreground text-lg">Conoce mi historia, formación y experiencia</p>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Image */}
          <div className="flex justify-center lg:col-span-1">
            <div className="relative w-full max-w-sm h-96">
              <ImageWithFallback
                src="/images/instructor.png"
                alt="Instructor"
                fill
                className="object-cover rounded-xl"
                fallbackType="instructor"
              />
            </div>
          </div>

          {/* Quick Info */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Anthony Paulo Perez</h2>
            <p className="text-xl text-primary font-semibold mb-6">Diseñador Gráfico Senior</p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Soy un diseñador gráfico senior con más de 8 años de experiencia en la industria creativa. A lo largo de mi carrera, he trabajado en proyectos de branding, diseño web, animación y más. Mi pasión es educar y compartir mis conocimientos con otros diseñadores.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-primary">8+</div>
                <div className="text-sm text-muted-foreground">Años de Experiencia</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">25K+</div>
                <div className="text-sm text-muted-foreground">Estudiantes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Satisfacción</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 sticky top-0 bg-background py-4 z-20">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold smooth-transition ${
                activeSection === id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:border-primary'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {loading ? (
          <div className="h-96 bg-secondary rounded-lg animate-pulse" />
        ) : (
          <div className="space-y-8">
            {/* Biography Section */}
            {activeSection === 'biography' && (
              <div className="space-y-6 animate-in fade-in-50">
                <h3 className="text-2xl font-bold">Mi Historia</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Desde que tengo memoria, siempre he tenido una pasión por el arte y el diseño. Mi viaje profesional comenzó hace 8 años cuando decidí estudiar Diseño Gráfico en la Universidad de Artes Aplicadas. Durante mis años de estudiante, participé en varios proyectos que me dieron experiencia valiosa en el mundo real.
                  </p>
                  <p>
                    Después de graduarme, trabajé en una agencia digital donde tuve la oportunidad de trabajar con clientes internacionales. Esta experiencia me enseñó la importancia de la comunicación visual efectiva y cómo el diseño puede transformar negocios.
                  </p>
                  <p>
                    Hoy en día, combino mi experiencia profesional con mi pasión por la educación. Creo que el diseño es una habilidad que cualquiera puede aprender, y mi misión es hacer que sea accesible para todos. A través de mis cursos, he tenido el privilegio de ayudar a miles de estudiantes a comenzar sus carreras en diseño.
                  </p>
                </div>
              </div>
            )}

            {/* Education Section */}
            {activeSection === 'education' && data && (
              <div className="space-y-6 animate-in fade-in-50">
                <h3 className="text-2xl font-bold">Formación Profesional</h3>
                <div className="space-y-4">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 smooth-transition">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-lg">{edu.degree}</h4>
                        <span className="text-sm text-primary font-semibold">{edu.year}</span>
                      </div>
                      <p className="text-muted-foreground">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && data && (
              <div className="space-y-6 animate-in fade-in-50">
                <h3 className="text-2xl font-bold">Experiencia Laboral</h3>
                <div className="space-y-4">
                  {data.experience.map((exp, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 smooth-transition">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{exp.position}</h4>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{exp.duration}</span>
                      </div>
                      <p className="text-muted-foreground mt-3">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teaching Section */}
            {activeSection === 'teaching' && data && (
              <div className="space-y-6 animate-in fade-in-50">
                <h3 className="text-2xl font-bold">Mi Perfil como Docente</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="text-3xl font-bold text-primary mb-2">{data.teachingProfile.yearsTeaching}+</div>
                    <p className="text-foreground font-semibold">Años Enseñando</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="text-3xl font-bold text-primary mb-2">{data.teachingProfile.studentsImpacted.toLocaleString()}+</div>
                    <p className="text-foreground font-semibold">Estudiantes Impactados</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Mi Filosofía</h4>
                    <p className="text-muted-foreground leading-relaxed">{data.teachingProfile.philosophy}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">Mi Enfoque</h4>
                    <p className="text-muted-foreground leading-relaxed">{data.teachingProfile.approach}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-4">Aspectos Destacados</h4>
                    <ul className="space-y-2">
                      {data.teachingProfile.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Award size={18} className="text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
