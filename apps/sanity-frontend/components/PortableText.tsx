'use client'
import { PortableText as PortableTextReact } from '@portabletext/react'
import { urlFor } from '../lib/sanity'

// Custom components for rendering different block types
const components = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) return null

            return (
                <div className="my-6">
                    <img
                        src={urlFor(value).width(800).height(400).fit('crop').url()}
                        alt={value.alt || ''}
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                    {value.caption && (
                        <p className="text-sm text-gray-600 mt-2 text-center italic">
                            {value.caption}
                        </p>
                    )}
                </div>
            )
        },
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-3xl font-bold mb-4 mt-6">{children}</h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-2xl font-bold mb-3 mt-5">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-xl font-semibold mb-2 mt-4">{children}</h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-lg font-semibold mb-2 mt-3">{children}</h4>
        ),
        normal: ({ children }: any) => (
            <p className="mb-4 leading-relaxed">{children}</p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-700">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }: any) => (
            <li className="ml-4">{children}</li>
        ),
        number: ({ children }: any) => (
            <li className="ml-4">{children}</li>
        ),
    },
    marks: {
        strong: ({ children }: any) => (
            <strong className="font-semibold">{children}</strong>
        ),
        em: ({ children }: any) => (
            <em className="italic">{children}</em>
        ),
        link: ({ children, value }: any) => (
            <a
                href={value.href}
                target={value.blank ? '_blank' : '_self'}
                rel={value.blank ? 'noopener noreferrer' : undefined}
                className="text-blue-600 hover:text-blue-800 underline"
            >
                {children}
            </a>
        ),
    },
}

interface PortableTextProps {
    content: any
    className?: string
}

export default function PortableText({ content, className = '' }: PortableTextProps) {
    if (!content) return null

    return (
        <div className={`prose prose-lg max-w-none ${className}`}>
            <PortableTextReact value={content} components={components} />
        </div>
    )
}
