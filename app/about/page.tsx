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
          <p className="text-foreground text-lg">Conoce mi historia, formación y experiencia</p>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Image */}
          <div className="flex justify-center lg:col-span-1">
            <div className="relative w-full max-w-sm h-96">
              <ImageWithFallback
                src="/images/instructor.webp"
                alt="Instructor"
                fill
                className="object-cover object-top rounded-xl"
                fallbackType="instructor"
              />
            </div>
          </div>

          {/* Quick Info */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Anthony Paolo Pérez Requena</h2>
            <p className="text-xl text-primary font-semibold mb-6">Prof. Ray</p>

            <ul className="space-y-3 mb-8 list-disc list-inside marker:text-primary text-foreground">
              <li>
                <span>Comunicador social</span>
              </li>
              <li>
                <span>Diseñador Gráfico</span>
              </li>
              <li>
                <span>Dirección de Arte</span>
              </li>
            </ul>

            <p className="text-foreground leading-relaxed mb-8">
              Soy comunicador social, diseñador gráfico y director de arte con más de 15 años trabajando con grandes empresas. A lo largo de los diversos cursos te compartiré técnicas, herramientas y mi experiencia para que desarrolles proyectos graficos profesionales y creativos.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-foreground">Años de Experiencia</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">1k+</div>
                <div className="text-sm text-foreground">Estudiantes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">200+</div>
                <div className="text-sm text-foreground">Marcas creadas</div>
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
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Soy Anthony Paolo Pérez Requena, Licenciado en Ciencias de la Comunicación, diseñador gráfico y director de arte con más de 15 años de experiencia profesional. Mi formación en comunicación me permitió comprender el poder de los mensajes, y el diseño se convirtió en la herramienta para transformarlos en experiencias visuales de impacto.
                    <br /><br />
He trabajado con diversas empresas y proyectos desarrollando soluciones gráficas, campañas publicitarias e identidades visuales. Hoy, a través de Rayo Studio, comparto mi experiencia y metodología para ayudar a nuevos diseñadores a potenciar su creatividad y alcanzar un nivel profesional.
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
                    <p className="text-foreground leading-relaxed">{data.teachingProfile.philosophy}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">Mi Enfoque</h4>
                    <p className="text-foreground leading-relaxed">{data.teachingProfile.approach}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-4">Aspectos Destacados</h4>
                    <ul className="space-y-2">
                      {data.teachingProfile.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Award size={18} className="text-primary flex-shrink-0" />
                          <span className="text-foreground">{highlight}</span>
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
