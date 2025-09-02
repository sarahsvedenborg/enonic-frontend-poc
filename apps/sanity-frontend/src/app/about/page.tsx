export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">About</h1>
                <p className="text-gray-600 mt-2">
                    Learn more about this Sanity Frontend application
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    What is Sanity Frontend?
                </h2>
                <p className="text-gray-600 mb-6">
                    This is a Next.js application designed to work seamlessly with Sanity CMS.
                    It provides a modern, responsive frontend that can display content from your
                    Sanity backend with ease.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Key Features
                </h3>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                    <li>Built with Next.js 14 and React 18</li>
                    <li>TypeScript support for type safety</li>
                    <li>Responsive design with custom CSS and PostCSS</li>
                    <li>Ready for Sanity CMS integration</li>
                    <li>Fast development and build times</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Technology Stack
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">⚛️</div>
                        <div className="text-sm font-medium">React</div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">🚀</div>
                        <div className="text-sm font-medium">Next.js</div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">🎨</div>
                        <div className="text-sm font-medium">PostCSS</div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">📝</div>
                        <div className="text-sm font-medium">TypeScript</div>
                    </div>
                </div>

                <p className="text-gray-600">
                    This application serves as a starting point for building content-driven websites
                    that integrate with Sanity CMS. You can customize it to match your specific
                    needs and design requirements.
                </p>
            </div>
        </div>
    )
}
