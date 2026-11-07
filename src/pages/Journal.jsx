import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'

const posts = [
  {
    slug: 'how-to-break-in-vegetable-tanned-leather',
    title: 'How to Break In & Care for Vegetable-Tanned Leather',
    excerpt: 'New vegetable-tanned leather is gloriously stiff. Here is our step-by-step guide to softening your new Evelora bag and encouraging the first coat of patina to emerge in weeks, not years.',
    category: 'Leather Care',
    date: '2024-11-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'five-reasons-full-grain-leather-is-worth-investing-in',
    title: 'Five Reasons Full-Grain Leather Is Worth the Investment',
    excerpt: 'In an era of bonded leather and PU coatings, what actually makes full-grain calfskin the gold standard? Our Florentine leather master explains the surface, the fibre, and the lifetime difference.',
    category: 'Material Education',
    date: '2024-10-20',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'behind-the-scenes-our-florence-atelier',
    title: 'Behind the Seams: A Day in Our Florence Atelier',
    excerpt: 'At 7am the Florentine light floods our workshop through eight-metre high windows. Follow master artisan Stefano Moretti through an eighteen-hour journey to complete a single Céleste Tote.',
    category: 'Atelier Life',
    date: '2024-09-08',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'the-secret-to-the-perfect-crossbody-silhouette',
    title: 'The Geometry of a Perfect Crossbody Silhouette',
    excerpt: 'Why does the Verona sit so perfectly under the arm without slipping? Our design director shares the seventeen-iteration sketch process behind one of our most beloved proportions.',
    category: 'Design Process',
    date: '2024-08-22',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80',
  },
]

export default function Journal() {
  return (
    <div className="min-h-screen bg-[#F6F1E9] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8924A] font-semibold">The Evelora</span>
          <h1 className="section-title font-serif text-[#121212] mt-2 mb-4">
            Atelier <span className="italic text-[#B8924A]">Journal</span>
          </h1>
          <p className="text-xs text-[#666] font-light leading-relaxed">
            Stories of craft, material, patina and design from our workshops in Florence and Porto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/journal/${post.slug}`}
              className="group bg-white border border-[#E8DFD0] rounded-xs overflow-hidden luxury-card shadow-xs flex flex-col"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[#E8DFD0]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-3 mb-3 text-xs text-[#888]">
                    <span className="bg-[#E8DFD0] text-[#8A5229] px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-serif text-xl text-[#121212] font-medium leading-snug mb-3 group-hover:text-[#B8924A] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs text-[#666] leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#B8924A] font-semibold uppercase tracking-wider mt-5">
                  <span>Read Article</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
